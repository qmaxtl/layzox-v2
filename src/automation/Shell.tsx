import { useEffect, useRef, useState, useId, type ReactNode } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, Menu, X, CalendarDays } from "lucide-react";
import { solutions } from "./data";
import "./enterprise.css";
export function Brand({ mark = false }: { mark?: boolean }) {
  const id = useId();
  return (
    <span className="brand">
      <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-blue`} x2="1" y2="1">
            <stop stopColor="#91e3ff" />
            <stop offset="1" stopColor="#008bff" />
          </linearGradient>
          <linearGradient id={`${id}-lime`}>
            <stop stopColor="#00cbd7" />
            <stop offset="1" stopColor="#d3f700" />
          </linearGradient>
        </defs>
        <path
          d="M7 39 24 7Q26 3 31 3H39L20 36Q18 40 13 40H7Z"
          fill={`url(#${id}-blue)`}
        />
        <path
          d="m7 40 16-12-4 8h24l-8 9H8Q4 45 7 40Z"
          fill={`url(#${id}-lime)`}
        />
        <path d="m7 40 16-12-4 8-6 8H8Q4 45 7 40Z" fill="#005cff" />
      </svg>
      {!mark && (
        <span>
          <strong>LAYZOX</strong>
          <small>Technology For A Brighter Tomorrow</small>
        </span>
      )}
    </span>
  );
}
export function ButtonLink({
  to,
  children,
  secondary = false,
}: {
  to: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
export function AuditBanner() {
  return (
    <section className="audit-banner">
      <Brand mark />
      <div>
        <h2>Not sure where to start?</h2>
        <p>
          Get a free automation audit. We’ll map your process,
          <br className="desktop-only" /> identify opportunities, and plan your
          next step.
        </p>
      </div>
      <ul>
        {[
          "Process analysis",
          "Automation opportunities",
          "ROI estimation",
          "Implementation roadmap",
        ].map((t) => (
          <li key={t}>
            <span>✓</span>
            {t}
          </li>
        ))}
      </ul>
      <ButtonLink to="/audit" secondary>
        <CalendarDays size={20} /> Get Free Automation Audit
      </ButtonLink>
    </section>
  );
}
export function Shell() {
  const [menu, setMenu] = useState(false),
    [drop, setDrop] = useState<string | null>(null);
  const location = useLocation(),
    header = useRef<HTMLElement>(null),
    menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setMenu(false);
    setDrop(null);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!header.current?.contains(e.target as Node)) setDrop(null);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  const groups: { [key: string]: { name: string; path: string }[] } = {
    Solutions: [{ name: "All solutions", path: "/solutions" }, ...solutions.map((s) => ({
      name: s.name,
      path: `/solutions/${s.slug}`,
    }))],
    Studio: [
      { name: "Discovery studio", path: "/discovery" },
      { name: "Automation lab", path: "/lab" },
    ],
    Resources: [
      { name: "Automation ROI calculator", path: "/roi" },
      { name: "Automation experience lab", path: "/lab" },
      { name: "Planning resources", path: "/resources" },
    ],
    Company: [
      { name: "About Layzox", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
  };
  return (
    <>
      <a className="skip" href="#main-content">
        Skip to content
      </a>
      <header
        ref={header}
        className="site-header"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (drop) {
              header.current?.querySelector<HTMLButtonElement>(`[aria-controls="nav-${drop}"]`)?.focus();
              setDrop(null);
            } else if (menu) {
              setMenu(false);
              menuButton.current?.focus();
            }
          }
        }}
      >
        <Link to="/">
          <Brand />
        </Link>
        <button
          ref={menuButton}
          className="mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          aria-controls="primary-nav"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
        <nav
          id="primary-nav"
          className={menu ? "open" : ""}
          aria-label="Primary navigation"
        >
          {[
            "Solutions",
            "Studio",
            "Industries",
            "Use Cases",
            "Resources",
            "Company",
          ].map((name) =>
            groups[name] ? (
              <div className="nav-group" key={name}>
                <button
                  aria-expanded={drop === name}
                  aria-controls={drop === name ? `nav-${name}` : undefined}
                  onClick={() => setDrop(drop === name ? null : name)}
                >
                  {name}
                  <ChevronDown size={14} />
                </button>
                {drop === name && (
                  <div id={`nav-${name}`} className="mega-menu">
                    <div className="mega-intro"><span className="eyebrow">Explore {name}</span><strong>{name === "Solutions" ? "Engineering connected operations." : name === "Studio" ? "Experience automation in action." : name === "Resources" ? "Plan your next step." : "Meet Layzox."}</strong></div><div className="mega-links">
                    {groups[name].map((x) => (
                      <Link
                        key={x.path}
                        to={x.path}
                        onClick={() => {
                          setDrop(null);
                          setMenu(false);
                        }}
                      >
                        {x.name}
                        <ArrowRight size={15} />
                      </Link>
                    ))}</div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={name}
                to={name === "Industries" ? "/industries" : "/use-cases"}
              >
                {name}
              </Link>
            ),
          )}
        </nav>
        <Link className="button header-cta" to="/audit">Free automation audit <ArrowRight size={16}/></Link>
      </header>
      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>
      <footer className="site-footer enterprise-footer">
        <div className="enterprise-footer-lead"><p className="eyebrow">Engineering better business</p><h2>Make work flow.</h2><Link className="button" to="/audit">Discuss your project <ArrowRight size={18}/></Link></div>
        <div className="enterprise-footer-grid">
          <div><Link to="/"><Brand /></Link><p>AI and business automation engineering, built around your operations.</p></div>
          {Object.entries(groups).map(([name,items])=><div key={name}><h3>{name}</h3>{items.map(item=><Link key={item.path} to={item.path}>{item.name}</Link>)}</div>)}
        </div>
        <div className="enterprise-footer-bottom"><span>© {new Date().getFullYear()} Layzox India Private Limited</span><Link to="/legal/privacy-policy">Privacy policy</Link><Link to="/legal/terms">Terms</Link></div>
      </footer>
    </>
  );
}
