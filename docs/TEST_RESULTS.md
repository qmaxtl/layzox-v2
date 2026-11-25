# Verification — 18 November 2026

- Final local checks: ESLint, TypeScript, 12 tests and production build all pass.
- `npm test`: 12 passing tests. ROI monthly/annual units, payback, zero/invalid inputs; required lead fields/consent/honeypot; method/origin/content-type rejection; missing configuration; mocked durable success, rate limiting and provider failures; notification authorisation and acknowledgement.
- `npm run build`: produces the Vite bundle plus 20 prerendered routes with full content, route titles, canonicals, sitemap and Organization structured data.
- Production dependency audit: zero reported vulnerabilities at the earlier implementation checkpoint. Final audit recorded in commit/PR checks.
- Browser desktop: homepage rendered and visually compared to approved composition. Four demos each reached completion with five steps, disabled Step at the end, and reset correctly. Play advances the active example.
- Browser ROI: default estimate 150 hours/month, ₹540,000 annual capacity value, ₹270,000 first-year net benefit, 4.3-month payback. Zero coverage updates to no payback.
- Browser discovery: industry and tasks produce a proposal and prefill the audit form. Empty form reports required-field/consent errors. Local submission fails visibly rather than claiming delivery.
- Responsive browser harness: 390 px and 768 px iframes (content widths 375 and 753 px with scrollbars); no horizontal overflow. Mobile menu opens and Escape closes it. These are responsive browser checks, not physical-device testing.
- Screenshots: docs/screenshots/layzox-home-desktop.jpg, layzox-home-mobile.jpg, layzox-home-tablet.jpg.

## Not yet verified
Actual Supabase migrations/RLS/rate-limit concurrency, real provider delivery, production Vercel routing/security headers, full assistive-technology audit and Lighthouse under mobile throttling. No Lighthouse score is claimed. Browser inspection used development preview; server handler tests use mocked services. No real customer accounts or messages were connected/sent.

## Preview smoke checks
Vercel preview build passed. Homepage, /roi, /lab, /audit and /solutions returned HTTP 200 with expected titles and configured security headers. An unknown route returned 404. Fixed server import extension resolution; at checkpoint 7fc7505, GET /api/leads and /api/notify-leads return expected JSON 405 instead of invocation failure. No live lead was submitted. GitHub Actions failed before any job steps; cause remains unconfirmed.

Release hardening: database migration executed on an isolated PostgreSQL engine (PGlite). Three identical submission IDs produced one row, five distinct enquiries were accepted, the sixth was limited, and a second worker claim returned no already-claimed rows. Submission retries reuse a UUID for an unchanged body. Vercel now runs lint and tests before building. Production database, approved contact/retention details and notification delivery still require verification. New local Chromium launch was blocked by the environment socket restriction, so no updated browser audit score is claimed.

Visitor experience verification: tested the built homepage in headless Chromium at 390, 768 and 1440 CSS pixels, with document width matching each viewport. All 17 distinct internal anchor destinations in the 20 static pages resolved. Browser test with an unavailable lead endpoint verified the local enquiry draft download. Hero copy now renders visibly before JavaScript starts. Corrected the brand link accessible name identified by axe on the desktop homepage.

## 24 November 2026 — release candidate

- Node 24.22.3, npm 11.19.1. Clean npm ci, ESLint, TypeScript, all 12 Node tests and the production build passed. Full and production-only npm audits reported zero vulnerabilities after the lockfile update. The build prerendered 20 routes.
- Chromium 153 headless, reduced motion enabled. All 20 production-build routes loaded at 390×844, 768×1024 and 1440×900. Each had a visible main heading, correct canonical path and page title, no document-width overflow, broken inline images or uncaught page errors. All observed internal link destinations existed. Screenshots: [responsive home](screenshots/2026-11-24-responsive.jpg).
- axe WCAG A/AA sweep on all 20 desktop pages and mobile home, lab and contact. The initial sweep found insufficient contrast on the inactive Discovery steps. The final sweep reported zero violations under the selected rules. This is automated coverage, not an accessibility certification.
- Chromium exercised all four workflows step-by-step through completion and reset, timed play/pause, default and zero-capacity ROI, Discovery choices and text handoff, local enquiry draft download, required-field errors on all three enquiry variants, desktop dropdown Escape focus and mobile menu Escape.
- The browser loaded the actual distribution files through Playwright request routing. The form availability endpoint was controlled for available/unavailable cases. No live submission or delivery was used as test evidence.
- Isolated PGlite: executed schema twice; anon/authenticated roles could neither read enquiries nor claim notifications. Service-role tests verified identical request replay, different payload rejection, five accepted requests, sixth limited and non-repeating outbox claims.
- GitHub Actions check annotation for job 135037390972 explicitly reports an account billing lock. No job-step log exists. No repository-side workflow skip was introduced.

Vercel built application commit 386d064 successfully. [Tested preview](https://layzox-v2-6sq8sujow-amit-kumar-guptas-projects-9297d4e0.vercel.app). All 20 page URLs, sitemap.xml and robots.txt returned HTTP 200 with the four configured security headers. An unknown URL returned 404 and both API endpoints rejected GET with 405. GitHub run 45335795440 again recorded the billing lock before any steps executed.

## Homepage design revision

Chromium verified the photo retained its natural aspect ratio, the copy and photo bounds did not intersect, and nine points across the lower photo remained unobscured after scrolling the image into view at 320, 390, 650, 651, 768, 1024, 1440 and 1920 CSS pixels. Checked all four homepage workflow selections opened their corresponding Lab simulation and all six service disclosures contained valid detail links. [Desktop and mobile visual comparison](screenshots/homepage-portrait-review.jpg).

Work in sync revision: Chromium tests checked the three hero states and replay at 320, 390, 650, 651, 768, 1024, 1440 and 1920 CSS pixels, zero horizontal overflow and the unobscured laptop area. Desktop and mobile [screenshots](screenshots/work-in-sync.jpg) were reviewed. Node tests, lint, typecheck and the 20-route build passed.

## Enquiry-to-approval redesign

Lint, typecheck, all 12 Node tests and the 20-route production build passed. Chromium exercised the complete demo at nine widths from 320 to 1920 CSS pixels. Tested invalid quantities, 18 participants yielding ₹45,000 in the quote and approval, explicit approval, replay restoring 12, direct stage selection, horizontal overflow and unobstructed portrait. [Four desktop scenes](screenshots/enquiry-journey.jpg).

Optical homepage revision: lint, typecheck, all 12 tests and the 20-route build passed. Chromium exercised the hero anchor, all six service disclosures, participant editing, ₹45,000 quotation for 18 participants, review, approval and replay at 320, 390, 680, 768, 1024 and 1440 CSS pixels. No horizontal page overflow or uncaught page errors in those checks. Automated WCAG A/AA checks on the homepage reported zero findings at 390 and 1440 px. [Desktop and mobile](screenshots/optical-homepage.jpg).

Workstation revision: tested Enter the workflow, editable CRM quantity, quotation total for 18 participants, approval, replay, visible action hit targets and page width at 320, 390, 680, 768 and 1440 CSS pixels with reduced motion. Visually checked wide and focused views. [Desktop comparison](screenshots/workstation-scroll.jpg).
