# Handoff — Layzox V2

Repository: qmaxtl/layzox-v2
Main branch: main (unchanged)
Backup branch: backup/pre-automation-pivot-2026-11-18
Development branch: feature/automation-platform-v1

## Goal
Convert existing Vite/React/TypeScript/Tailwind procurement website into premium business automation consultancy with interactive workflow demonstrations, discovery experience, ROI estimates and real lead intake. Preserve approved human-crafted navy, blue and white style. Do not create a DIY app builder.

## Resume
1. Fetch latest remote branches; check PRs and branch history.
2. Read AGENTS.md and docs/PROGRESS.md.
3. Inspect src/pages/Home.tsx, src/components/home/*, src/App.tsx, src/lib/site.ts, src/lib/data/services.ts.
4. Continue converting homepage and services without touching main.
5. Run typecheck/build and browser tests; record evidence.
6. Commit/push and update docs/PROGRESS.md and this file.

## Caution
Existing CRM login is insecure demo auth and forms simulate submission. Do not imply these work in production. No test runs yet. Existing project has a different business model; some old sections will remain until migration is complete.
