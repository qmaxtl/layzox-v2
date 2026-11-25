import { createHmac, randomUUID } from "node:crypto";
import { leadSchema } from "../src/automation/lead-schema.ts";
import type { IncomingMessage, ServerResponse } from "node:http";
type Request = IncomingMessage & { body?: unknown };
// Vercel parses JSON before invoking the function. No lead data is logged.
export default async function handler(req: Request, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  const reply = (status: number, body: object) => {
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };
  const config = {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY,
    salt: process.env.RATE_LIMIT_SALT,
    origin: process.env.SITE_URL,
  };
  if (req.method === "HEAD") {
    res.statusCode = Object.values(config).every(Boolean) ? 200 : 503;
    return res.end();
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "HEAD, POST");
    return reply(405, { error: "Method not allowed." });
  }
  if (!config.url || !config.key || !config.salt || !config.origin)
    return reply(503, {
      error:
        "Enquiry submission is temporarily unavailable. Your request has not been submitted. Please try again later.",
    });
  let expectedOrigin: string;
  try { const site = new URL(config.origin); if(site.protocol !== "https:") throw new Error(); expectedOrigin = site.origin; } catch { return reply(503, { error: "Enquiry service unavailable." }); }
  if (req.headers.origin !== expectedOrigin)
    return reply(403, { error: "Request origin not allowed." });
  if (req.headers["content-type"]?.split(";")[0].trim().toLowerCase() !== "application/json")
    return reply(415, { error: "Use JSON." });
  if (Number(req.headers["content-length"] || 0) > 16000)
    return reply(413, { error: "Request is too large." });
  let body = req.body;
  if (typeof body === "string") {
    if (Buffer.byteLength(body) > 16000)
      return reply(413, { error: "Request is too large." });
    try {
      body = JSON.parse(body);
    } catch {
      return reply(400, { error: "Invalid JSON." });
    }
  }
  if (Buffer.byteLength(JSON.stringify(body ?? {})) > 16000)
    return reply(413, { error: "Request is too large." });
  const key = req.headers["idempotency-key"];
  if (key !== undefined && (typeof key !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(key)))
    return reply(400, { error: "Invalid enquiry reference." });
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success)
    return reply(400, {
      error: "Check the required fields and consent, then try again.",
    });
  try {
    const base = new URL(config.url);
    if (base.protocol !== "https:" || base.username || base.password || base.search || base.hash)
      throw new Error("Invalid backend configuration");
    const ip = String(
      req.headers["x-vercel-forwarded-for"] ||
        req.socket?.remoteAddress ||
        "unknown",
    )
      .split(",")[0]
      .trim();
    const bucket = createHmac("sha256", config.salt).update(ip).digest("hex");
    const result = await fetch(
      new URL("/rest/v1/rpc/submit_automation_lead", base),
      {
        method: "POST",
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          p_bucket: bucket,
          p_request_id: key ?? randomUUID(),
          p_payload: parsed.data,
        }),
        redirect: "error",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!result.ok) throw new Error("Storage unavailable");
    const stored = (await result.json()) as {
      accepted?: boolean;
      limited?: boolean;
    };
    if (stored.limited) {
      res.setHeader("Retry-After", "3600");
      return reply(429, {
        error: "Too many requests. Please try again in an hour.",
      });
    }
    if (stored.accepted !== true) throw new Error("Storage not confirmed");
    // Notification failures never undo a saved enquiry; database outbox remains pending.
    return reply(201, { accepted: true });
  } catch {
    return reply(503, {
      error: "We could not save your request. Please try again later.",
    });
  }
}
