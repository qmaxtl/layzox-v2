import test from "node:test";
import assert from "node:assert/strict";
import { leadSchema } from "../src/automation/lead-schema.ts";
import handler from "../api/leads.ts";
const valid = {
  name: "Asha",
  company: "Northstar",
  email: "asha@example.com",
  industry: "Retail",
  message: "Please help us automate lead routing.",
  consent: true,
  website: "",
  source: "audit",
};
test("valid lead accepted by schema; fields trimmed", () =>
  assert.equal(leadSchema.parse({ ...valid, name: " Asha " }).name, "Asha"));
test("missing consent, honeypot, malformed email and short brief are rejected", () => {
  for (const patch of [
    { consent: false },
    { website: "bot" },
    { email: "invalid" },
    { message: "x" },
    { message: "x".repeat(3001) },
  ])
    assert.equal(leadSchema.safeParse({ ...valid, ...patch }).success, false);
});
async function call(
  method: string,
  body: unknown = valid,
  headers: Record<string, string> = {},
) {
  let status = 0,
    output = "";
  const res = {
    setHeader() {},
    set statusCode(s: number) {
      status = s;
    },
    end(s: string) {
      output = s;
    },
  };
  await handler(
    {
      method,
      body,
      headers: {
        "content-type": "application/json",
        origin: "https://example.com",
        ...headers,
      },
      socket: { remoteAddress: "127.0.0.1" },
    } as never,
    res as never,
  );
  return { status, body: JSON.parse(output) };
}
test("rejects unsupported method", async () =>
  assert.equal((await call("GET")).status, 405));
test("fails closed without configuration", async () => {
  delete process.env.SUPABASE_URL;
  assert.equal((await call("POST")).status, 503);
});
test("configured handler: origin, validation, durable success, rate limit and backend failure", async () => {
  Object.assign(process.env, {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "test",
    RATE_LIMIT_SALT: "test",
    SITE_URL: "https://example.com",
  });
  const original = globalThis.fetch;
  try {
    assert.equal(
      (await call("POST", valid, { origin: "https://evil.example" })).status,
      403,
    );
    assert.equal(
      (await call("POST", { ...valid, consent: false })).status,
      400,
    );
    assert.equal(
      (await call("POST", valid, { "content-type": "text/plain" })).status,
      415,
    );
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ accepted: true }), { status: 200 });
    assert.deepEqual(await call("POST"), {
      status: 201,
      body: { accepted: true },
    });
    globalThis.fetch = async () =>
      new Response(JSON.stringify({ limited: true }), { status: 200 });
    assert.equal((await call("POST")).status, 429);
    globalThis.fetch = async () => new Response("{}", { status: 500 });
    assert.equal((await call("POST")).status, 503);
    globalThis.fetch = async () => new Response("{}", { status: 200 });
    assert.equal((await call("POST")).status, 503);
  } finally {
    globalThis.fetch = original;
    for (const key of [
      "SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "RATE_LIMIT_SALT",
      "SITE_URL",
    ])
      delete process.env[key];
  }
});
