import { createServer, loadEnv } from "vite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
const base = (
  loadEnv("production", process.cwd(), "").VITE_SITE_URL ||
  "https://layzox-v2-fawn.vercel.app"
).replace(/\/$/, "");
const escape = (s) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
try {
  const { render } = await server.ssrLoadModule("/src/prerender.tsx");
  const { solutions } = await server.ssrLoadModule("/src/automation/data.ts");
  const routes = {
    "/": "Business Automation & AI Operations",
    "/solutions": "Automation Solutions",
    "/industries": "Industry Solutions",
    "/use-cases": "Automation Use Cases",
    "/lab": "Automation Experience Lab",
    "/roi": "Automation ROI Calculator",
    "/discovery": "Discovery Studio",
    "/audit": "Free Automation Audit",
    "/contact": "Contact",
    "/consultation": "Project Consultation",
    "/about": "About Layzox",
    "/resources": "Automation Resources",
    "/legal/privacy-policy": "Privacy Notice",
    "/legal/terms": "Website Terms",
  };
  solutions.forEach((s) => (routes[`/solutions/${s.slug}`] = s.name));
  const template = await readFile("dist/index.html", "utf8");
  for (const [path, title] of Object.entries(routes)) {
    const body = await render(path);
    if (!body.includes("<h1")) throw new Error(`Missing page content: ${path}`);
    const description = `${title}. Explore implemented business workflows, AI-assisted operations and connected systems with Layzox.`;
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "LAYZOX",
      url: base,
      description: "Business Automation & AI Operations",
    }).replace(/</g, "\\u003c");
    let html = template
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
      .replace(
        /<title>.*?<\/title>/,
        `<title>${escape(title)} | LAYZOX</title>`,
      )
      .replace(
        /(<meta name="description" content=")[^"]*/,
        `$1${escape(description)}`,
      )
      .replace(/(<link rel="canonical" href=")[^"]*/, `$1${base}${path}`)
      .replace(/(<meta property="og:url" content=")[^"]*/, `$1${base}${path}`)
      .replace(
        /(<meta property="og:title" content=")[^"]*/,
        `$1${escape(title)} | LAYZOX`,
      )
      .replace(
        "</head>",
        `<script type="application/ld+json">${schema}</script></head>`,
      );
    const dir = path === "/" ? "dist" : `dist${path}`;
    await mkdir(dir, { recursive: true });
    await writeFile(`${dir}/index.html`, html);
  }
  await writeFile(
    "dist/404.html",
    template
      .replace(
        '<div id="root"></div>',
        `<div id="root">${await render("/not-found")}</div>`,
      )
      .replace(/<title>.*?<\/title>/, "<title>Page not found | LAYZOX</title>")
      .replace("</head>", '<meta name="robots" content="noindex"/></head>'),
  );
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(
      routes,
    )
      .map((p) => `<url><loc>${base}${p}</loc></url>`)
      .join("")}</urlset>`,
  );
  await writeFile(
    "dist/robots.txt",
    `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`,
  );
  console.log(
    `Prerendered ${Object.keys(routes).length} routes with titles, canonicals and structured data.`,
  );
} finally {
  await server.close();
}
