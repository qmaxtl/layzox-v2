import { timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
// Optional server-to-server outbox worker. Disabled until explicitly configured.
export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  const reply = (status: number, body: object) => {
    res.statusCode = status;
    res.end(JSON.stringify(body));
  };
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return reply(405, { error: "Method not allowed." });
  }
  const secret = process.env.NOTIFICATION_WORKER_SECRET;
  const provided = Buffer.from(req.headers.authorization || "");
  const expected = Buffer.from(`Bearer ${secret || ""}`);
  if (
    !secret ||
    provided.length !== expected.length ||
    !timingSafeEqual(provided, expected)
  )
    return reply(401, { error: "Unauthorised." });
  const {
    SUPABASE_URL: url,
    SUPABASE_SERVICE_ROLE_KEY: key,
    RESEND_API_KEY: emailKey,
    LEAD_NOTIFICATION_FROM: from,
    LEAD_NOTIFICATION_TO: to,
  } = process.env;
  if (
    process.env.ENABLE_LEAD_NOTIFICATIONS !== "true" ||
    !url ||
    !key ||
    !emailKey ||
    !from ||
    !to
  )
    return reply(503, { error: "Notifications are not enabled." });
  const headers = {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
  };
  try {
    const claimed = await fetch(
      new URL("/rest/v1/rpc/claim_automation_notifications", url),
      {
        method: "POST",
        headers,
        body: "{}",
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!claimed.ok) throw new Error("Claim failed");
    const rows = (await claimed.json()) as { id: string }[];
    let delivered = 0;
    for (const row of rows) {
      if (!/^[0-9a-f-]{36}$/i.test(row.id)) continue;
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${emailKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `layzox-lead-${row.id}`,
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject: "New Layzox automation enquiry",
          text: `A new enquiry has been saved. Reference: ${row.id}. Review the record in your authorised lead database. No customer information is included in this notification.`,
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!sent.ok) continue;
      const updated = await fetch(
        new URL(`/rest/v1/automation_leads?id=eq.${row.id}`, url),
        {
          method: "PATCH",
          headers,
          body: JSON.stringify({ notification_status: "delivered" }),
          signal: AbortSignal.timeout(8000),
        },
      );
      if (updated.ok) delivered++;
    }
    return reply(200, { claimed: rows.length, delivered });
  } catch {
    return reply(503, {
      error:
        "Notification processing unavailable. Pending records are retained.",
    });
  }
}
