import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { Shell } from "./automation/Shell";
import Home from "./automation/Home";
import { solutions } from "./automation/data";
const Lab = lazy(() => import("./automation/Lab"));
const Roi = lazy(() => import("./automation/Roi"));
const Discovery = lazy(() => import("./automation/Discovery"));
const LeadForm = lazy(() => import("./automation/LeadForm"));
const Solutions = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.Solutions })),
);
const Industries = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.Industries })),
);
const UseCases = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.UseCases })),
);
const About = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.About })),
);
const Resources = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.Resources })),
);
const Legal = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.Legal })),
);
const NotFound = lazy(() =>
  import("./automation/Pages").then((m) => ({ default: m.NotFound })),
);
function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Business Automation & AI Operations",
      "/solutions": "Automation Solutions",
      "/industries": "Industry Solutions",
      "/use-cases": "Automation Use Cases",
      "/lab": "Automation Experience Lab",
      "/roi": "Automation ROI Calculator",
      "/discovery": "Discovery Studio",
      "/audit": "Free Automation Audit",
      "/about": "About Layzox",
      "/contact": "Contact",
      "/consultation": "Project Consultation",
      "/resources": "Automation Resources",
      "/legal/privacy-policy": "Privacy Notice",
      "/legal/terms": "Website Terms",
    };
    const title =
      titles[pathname] ||
      solutions.find((s) => pathname === `/solutions/${s.slug}`)?.name ||
      "Page not found";
    document.title = `${title} | LAYZOX`;
    const base =
      import.meta.env.VITE_SITE_URL || "https://layzox-v2-fawn.vercel.app";
    const url = base.replace(/\/$/, "") + pathname;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", url);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        `${title}. Explore implemented business workflows, AI-assisted operations and connected systems with Layzox.`,
      );
  }, [pathname]);
  return null;
}
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Metadata />
      <Suspense
        fallback={
          <div className="loading" role="status">
            Loading Layzox…
          </div>
        }
      >
        <Routes>
          <Route element={<Shell />}>
            <Route index element={<Home />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="solutions/:slug" element={<Solutions />} />
            <Route path="industries" element={<Industries />} />
            <Route path="use-cases" element={<UseCases />} />
            <Route path="lab" element={<Lab />} />
            <Route path="roi" element={<Roi />} />
            <Route path="discovery" element={<Discovery />} />
            <Route path="audit" element={<LeadForm key="audit" />} />
            <Route path="contact" element={<LeadForm key="contact" />} />
            <Route path="consultation" element={<LeadForm key="consultation" />} />
            <Route path="about" element={<About />} />
            <Route path="resources" element={<Resources />} />
            <Route path="legal/privacy-policy" element={<Legal />} />
            <Route path="legal/terms" element={<Legal />} />
            {Object.entries({
              services: "/solutions",
              "how-it-works": "/lab",
              "why-layzox": "/about",
              "for-businesses": "/discovery",
              "post-requirement": "/audit",
              "request-quote": "/audit",
              "talk-to-expert": "/consultation",
            }).map(([old, to]) => (
              <Route
                key={old}
                path={old}
                element={<Navigate to={to} replace />}
              />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </MotionConfig>
  );
}
