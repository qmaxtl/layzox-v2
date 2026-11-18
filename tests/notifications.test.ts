import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/notify-leads.ts";
async function call(auth = "Bearer test") {
  let status = 0;
  let output = "";
  await handler(
    { method: "POST", headers: { authorization: auth } } as never,
    {
      setHeader() {},
      set statusCode(s: number) {
        status = s;
      },
      end(s: string) {
        output = s;
      },
    } as never,
  );
  return { status, body: JSON.parse(output) };
}
test("notification worker requires authorisation and explicit enablement", async () => {
  process.env.NOTIFICATION_WORKER_SECRET = "test";
  assert.equal((await call("Bearer wrong")).status, 401);
  assert.equal((await call()).status, 503);
  delete process.env.NOTIFICATION_WORKER_SECRET;
});
test("outbox confirms delivery only after provider acknowledgement", async () => {
  Object.assign(process.env, {
    NOTIFICATION_WORKER_SECRET: "test",
    ENABLE_LEAD_NOTIFICATIONS: "true",
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "test",
    RESEND_API_KEY: "test",
    LEAD_NOTIFICATION_FROM: "qa@example.com",
    LEAD_NOTIFICATION_TO: "qa@example.com",
  });
  const original = globalThis.fetch;
  let calls = 0;
  try {
    globalThis.fetch = async () => {
      calls++;
      return calls === 1
        ? new Response(
            JSON.stringify([{ id: "12345678-1234-1234-1234-123456789012" }]),
          )
        : new Response("{}", { status: 200 });
    };
    assert.deepEqual(await call(), {
      status: 200,
      body: { claimed: 1, delivered: 1 },
    });
    assert.equal(calls, 3);
  } finally {
    globalThis.fetch = original;
    for (const key of [
      "NOTIFICATION_WORKER_SECRET",
      "ENABLE_LEAD_NOTIFICATIONS",
      "SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "RESEND_API_KEY",
      "LEAD_NOTIFICATION_FROM",
      "LEAD_NOTIFICATION_TO",
    ])
      delete process.env[key];
  }
});
