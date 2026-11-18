# LAYZOX — Business Automation & AI Operations
Responsive business automation website with an interactive experience lab, discovery studio, ROI calculator and server-validated enquiry interface.

## Run
Node 24 and npm. `npm ci`, `npm run dev` (5173), `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run preview` (4173).

Active code: `src/automation`, `src/App.tsx`, `api/leads.ts`. Older procurement scaffolding is retained as reference, outside the active dependency graph. Do not reconnect its demo forms or authentication.

## Configuration
Copy `.env.example` to `.env.local` for local work. Keep secrets server-side. Configure `SITE_URL` to match the exact deployed origin, and `VITE_SITE_URL` for canonical URLs. Update robots/sitemap when the production domain changes. Run `docs/LEAD_DATABASE.sql` in an authorised Supabase database before enabling the form. Missing backend configuration fails closed and never reports a saved lead.

## Verification and release
`npm test` covers ROI edge cases, lead validation and API failure paths. GitHub Actions runs lint, typecheck, tests, build and a production dependency audit. Preview hosting uses Vercel's existing Vite project configuration. Do not merge or promote to production until browser QA, integration setup, business/legal review and owner approval are complete.

Read `AGENTS.md`, `docs/PROGRESS.md` and `docs/HANDOFF.md` to continue. See `docs/TEST_RESULTS.md` for actual evidence and limitations.
