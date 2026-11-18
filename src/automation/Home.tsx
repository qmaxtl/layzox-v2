import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  ClipboardList,
  Database,
  Headphones,
  Link2,
  MessageCircle,
  Play,
  Settings,
  Users,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import { solutions } from "./data";
import { AuditBanner, Brand, ButtonLink } from "./Shell";
export default function Home() {
  const reduced = useReducedMotion();
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <motion.div
            className="hero-copy"
            initial={reduced ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-pill">
              <i /> AI + Automation + Integration
            </span>
            <h1>
              Turn Repetitive Work <br />
              Into <em>Automated Growth.</em>
            </h1>
            <p>
              We design and implement end-to-end automation systems that save
              time, reduce manual work, and help your business grow — with AI,
              integrations and custom workflows.
            </p>
            <div className="hero-actions">
              <ButtonLink to="/discovery">Automate My Business</ButtonLink>
              <Link to="/audit" className="button secondary">
                <CalendarDays size={18} /> Get a Free Process Audit
              </Link>
            </div>
            <div className="benefits">
              {["Faster operations", "Less manual work", "Connected teams"].map(
                (t) => (
                  <span key={t}>
                    <Check />
                    {t}
                  </span>
                ),
              )}
            </div>
          </motion.div>
          <div className="hero-person">
            <img
              src="/automation-professional.webp"
              alt="Professional working at a laptop in a modern office"
              width="1086"
              height="1448"
              fetchPriority="high"
            />
          </div>
          <div className="hub-area">
            <div className="automation-hub">
              <h2>
                <Brand mark />
                Business Automation Hub
              </h2>
              <div className="hub-steps">
                {[
                  [ClipboardList, "Capture"],
                  [Settings, "Automate"],
                  [ChartNoAxesCombined, "Grow"],
                ].map(([Icon, label], i) => {
                  const I = Icon as typeof ClipboardList;
                  return (
                    <div key={String(label)} className={`hub-step step-${i}`}>
                      <I />
                      <strong>{String(label)}</strong>
                      {i < 2 && <ArrowRight className="hub-arrow" />}
                    </div>
                  );
                })}
              </div>
              <Link className="hub-demo" to="/lab">
                <Play size={21} fill="currentColor" /> Explore interactive demo
              </Link>
            </div>
            <div className="hub-services">
              {[
                [Bot, "AI Agents", "ai-agents"],
                [MessageCircle, "WhatsApp Automation", "whatsapp"],
                [Users, "CRM & Sales", "sales-marketing"],
                [Headphones, "Customer Support", "customer-support"],
                [
                  ChartNoAxesCombined,
                  "Reports & Analytics",
                  "integrations-data",
                ],
              ].map(([Icon, label, slug]) => {
                const I = Icon as typeof Bot;
                return (
                  <Link key={String(slug)} to={`/solutions/${slug}`}>
                    <I />
                    {String(label)}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
        <div className="hero-wave" aria-hidden="true" />
      </section>
      <div className="home-body">
        <section
          className="capability-bar"
          aria-label="Connected business capabilities"
        >
          <strong>One connected business.</strong>
          {[
            [Bot, "AI workflows"],
            [MessageCircle, "Messaging"],
            [Database, "CRM systems"],
            [Link2, "Integrations"],
            [ChartNoAxesCombined, "Analytics"],
          ].map(([Icon, label]) => {
            const I = Icon as typeof Bot;
            return (
              <span key={String(label)}>
                <I />
                {String(label)}
              </span>
            );
          })}
          <small>
            Designed around <br />
            your existing tools
          </small>
        </section>
        <section className="solutions-row">
          <div className="section-intro">
            <span className="eyebrow">Our automation solutions</span>
            <h2>
              Automation systems <br />
              built for real <br />
              business operations.
            </h2>
            <div className="blue-line" />
          </div>
          {solutions.slice(0, 5).map((s, i) => (
            <motion.div key={s.slug} whileHover={reduced ? {} : { y: -5 }}>
              <Link
                className={`solution-card ${i === 0 ? "featured" : ""}`}
                to={`/solutions/${s.slug}`}
              >
                <s.icon size={30} />
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <span className="circle-arrow">
                  <ArrowRight size={17} />
                </span>
              </Link>
            </motion.div>
          ))}
        </section>
        <section className="workflow-preview">
          <div>
            <h2>
              See automation <br />
              in action.
            </h2>
            <p>
              A quick interactive walkthrough of how Layzox can connect your
              business processes.
            </p>
            <ButtonLink to="/lab">Try Interactive Demo</ButtonLink>
          </div>
          <div className="workflow-preview-main">
            <span className="simulation-pill">
              <i /> Sample workflow · Lead to sales
            </span>
            <div className="mini-workflow">
              {[
                [Users, "New lead", "Web form"],
                [Bot, "AI agent", "Qualify & review"],
                [Database, "CRM", "Add to pipeline"],
                [MessageCircle, "Follow-up", "Draft a reply"],
                [ChartNoAxesCombined, "Sales", "Track progress"],
              ].map(([Icon, title, sub], i) => {
                const I = Icon as typeof Bot;
                return (
                  <div key={String(title)} className={i === 1 ? "active" : ""}>
                    <I />
                    <strong>{String(title)}</strong>
                    <small>{String(sub)}</small>
                    {i < 4 && <ArrowRight className="mini-arrow" />}
                  </div>
                );
              })}
            </div>
            <small className="simulation-note">
              Interactive simulation — no messages sent or accounts connected.
            </small>
          </div>
        </section>
        <section className="impact-row">
          <h2>
            Explore your <br />
            automation potential.
          </h2>
          <div>
            <Workflow />
            <strong>
              4<span>Interactive workflow demos</span>
            </strong>
          </div>
          <div>
            <Settings />
            <strong>
              6<span>Automation solution areas</span>
            </strong>
          </div>
          <div>
            <ChartNoAxesCombined />
            <strong>
              Your ROI<span>Calculate an indicative estimate</span>
            </strong>
          </div>
          <Link to="/roi">
            Estimate your savings <ArrowRight size={18} />
          </Link>
        </section>
        <AuditBanner />
      </div>
    </>
  );
}
