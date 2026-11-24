# Handoff
Repository qmaxtl/layzox-v2. Working branch feat/automation-platform. Read AGENTS.md, MASTER_PLAN.md, PROGRESS.md and TEST_RESULTS.md.

Active app: src/automation + src/App.tsx. Backend: api/leads.ts, api/notify-leads.ts. Database schema: docs/LEAD_DATABASE.sql. Runtime: Node 24 / npm. Commands: npm ci; npm run lint; npm run typecheck; npm test; npm run build.

The implemented site follows the approved navy/blue/white reference, with real components and interactive demos. Sources from the earlier procurement app remain for recovery, but are outside the active import graph. Do not reconnect demo CRM/auth or fake-success forms.

Current code includes 20 prerendered routes, four workflow simulations, discovery, ROI, form validation, durable-storage interface and an optional notification worker. It is not a completed production launch. Use the release gates in PROGRESS.md.

Before work, fetch origin and inspect branches/PRs to avoid duplicating another session. Main has not been modified by this implementation. Use git log for exact checkpoint IDs; update this file on the next substantive milestone.

Integrated concurrent feature/automation-platform-v1 commits through 75b6fec. Its earlier Hero.tsx remains preserved; published implementation checkpoint is 0e8705b. Documentation conflicts were reconciled using the more complete current state.

Review: https://github.com/qmaxtl/layzox-v2/pull/1 (draft). Preview deployment built successfully. Runtime smoke test found an emitted TypeScript import extension in the lead API; compiler rewrite enabled to emit JavaScript imports. Fix verified at 7fc7505: both API endpoints return expected 405 for GET; homepage returns 200. GitHub Actions failed before any job steps; cause not established.

## Owner review — 24 November 2026

Resume from the head of feat/automation-platform in PR #1. The responsive and integration-contract evidence is in TEST_RESULTS.md. Do not treat a READY preview as authorisation to release.

1. Resolve the GitHub account billing lock and rerun the Quality workflow.
2. Select the intended preview Supabase environment, apply docs/LEAD_DATABASE.sql as its administrator and configure the four server-only lead variables listed in .env.example. SITE_URL must match the actual test origin.
3. Use an approved test enquiry to verify persistence and retry deduplication. For email, configure the approved provider, mailbox and protected worker trigger, then verify arrival. The worker's submitted count and database status record provider acceptance only. A partial batch returns 503 and unacknowledged claims become eligible again after the lease.
4. Approve the privacy contact, retention terms, legal text and canonical domain. Then request a separate production release.

Review the revised homepage using the heading “Give your team more time for human work.” The original full portrait lives at public/automation-professional.webp. Keep the intrinsic aspect ratio and the separate photo column at desktop widths. Mobile places the image below the introduction.
