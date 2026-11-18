# Handoff
Repository qmaxtl/layzox-v2. Working branch feat/automation-platform. Read AGENTS.md, MASTER_PLAN.md, PROGRESS.md and TEST_RESULTS.md.

Active app: src/automation + src/App.tsx. Backend: api/leads.ts, api/notify-leads.ts. Database schema: docs/LEAD_DATABASE.sql. Runtime: Node 24 / npm. Commands: npm ci; npm run lint; npm run typecheck; npm test; npm run build.

The implemented site follows the approved navy/blue/white reference, with real components and interactive demos. Sources from the earlier procurement app remain for recovery, but are outside the active import graph. Do not reconnect demo CRM/auth or fake-success forms.

Current code includes 20 prerendered routes, four workflow simulations, discovery, ROI, form validation, durable-storage interface and an optional notification worker. It is not a completed production launch. Use the release gates in PROGRESS.md.

Before work, fetch origin and inspect branches/PRs to avoid duplicating another session. Main has not been modified by this implementation. Use git log for exact checkpoint IDs; update this file on the next substantive milestone.

Integrated concurrent feature/automation-platform-v1 commits through 75b6fec. Its earlier Hero.tsx remains preserved; active implementation checkpoint is 19e3981. Documentation conflicts were reconciled using the more complete current state.
