import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Workflow, Bot, Database, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  { icon: MessageSquareText, title: "New enquiry", detail: "Captured automatically" },
  { icon: Bot, title: "Intelligent routing", detail: "Qualified and assigned" },
  { icon: Database, title: "Systems updated", detail: "CRM stays in sync" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#101f38] text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(58,122,218,0.24),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-[90rem] gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-12 lg:pb-28 lg:pt-40">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase text-blue-200">
            <Workflow className="h-4 w-4" aria-hidden="true" /> Business Automation & AI Operations
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.06] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Less busywork.<br /><span className="text-[#93baff]">More business.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-slate-300">
            We design and implement automation that connects your tools, reduces repetitive work, and gives your team more time for what matters.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/talk-to-expert" className="inline-flex items-center gap-2 rounded-xl bg-[#377cf4] px-6 py-3.5 font-semibold text-white transition hover:bg-[#2565d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              Request an Automation Audit <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10">
              Explore Solutions
            </Link>
          </div>
          <p className="mt-7 flex items-center gap-2 text-sm text-slate-300"><CheckCircle2 className="h-4 w-4 text-blue-300" /> Built around your business, not another app to manage.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 25 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.75 }} className="relative">
          <div className="rounded-3xl border border-white/15 bg-white/[0.07] p-5 shadow-2xl backdrop-blur-md sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-3 border-b border-white/10 pb-5">
              <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">Automation in action</p><h2 className="mt-1 font-display text-xl font-semibold">From enquiry to action</h2></div>
              <span className="rounded-full bg-blue-300/10 px-3 py-1 text-xs text-blue-200">Illustrative flow</span>
            </div>
            <ol className="space-y-3">
              {steps.map(({ icon: Icon, title, detail }, index) => (
                <li key={title} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-blue-200"><Icon className="h-5 w-5" /></span>
                  <div className="flex-1"><p className="font-semibold">{title}</p><p className="text-sm text-slate-300">{detail}</p></div>
                  <span className="font-mono text-xs text-blue-200">0{index + 1}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-xs leading-relaxed text-slate-400">Example workflow only. Live integrations are scoped and implemented for each client.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
