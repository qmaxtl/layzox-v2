# Decisions
- Retain Vite instead of migrating to Next.js: the repository's active scripts and application use Vite.
- Use real responsive components rather than a screenshot as the page.
- Do not publish unsupported customer proof or achieved savings from the mockup.
- Keep legacy source for recovery, but do not expose simulated authentication as real security.
- Durable rate limiting/storage are prerequisites for accepting enquiry submissions. Missing configuration returns 503.
- Avoid adding GSAP/Lottie without justified choreography/assets. Use existing Motion, CSS and React Flow.
- Feature branch + reviewed PR; no direct production promotion.

- Pin TypeScript 6.0 for compatibility with the installed TypeScript-ESLint parser; checks pass. npm is the authoritative lockfile and install path.
