import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { demos, solutions } from "./data";
import { AuditBanner } from "./Shell";
import StudioScene from "./StudioScene";
import "./home.css";

export default function Home() {
  return (
    <div className="lx-home">
      <StudioScene />
      <section className="practice-section" aria-labelledby="practice-title">
        <div className="practice-heading"><div><p className="lx-kicker">Automation capabilities</p><h2 id="practice-title">The systems behind<br />the handoff.</h2></div><p>Capture the request, move the right information and give people a clear point to review it.</p></div>
        <div className="practice-index">{solutions.map((s, index) => (
          <details key={s.slug} name="capability" open={index === 0}>
            <summary><s.icon size={23} /><span>{s.name}</span><span className="practice-toggle" aria-hidden="true" /></summary>
            <div className="practice-detail">
              <p>{s.description}</p>
              <ul>{s.tasks.map(task => <li key={task}>{task}</li>)}</ul>
              <Link className="lx-text" to={`/solutions/${s.slug}`}>Explore solution <ArrowUpRight /></Link>
            </div>
          </details>
        ))}</div>
      </section>
      <section className="lx-human">
                  <figure className="lx-portrait">
            <img src="/automation-professional.webp" alt="Professional at a desk with an open laptop" width="1086" height="1448" loading="lazy" />
          </figure>
        <div><p className="lx-kicker">Implementation &amp; human oversight</p><h2>Built around the people doing the work.</h2><p>Start with the way your team handles a request today. In Discovery Studio, choose a process, identify the handoffs and see where a person should review the outcome.</p><Link className="lx-text" to="/discovery">Map your first workflow <ArrowRight /></Link></div>
      </section>
      <section className="practice-section demo-section">
        <div className="practice-heading"><div><p className="lx-kicker">Automation experience lab</p><h2>Inside the workflows.</h2></div><p>Step through a working simulation to see the inputs, decisions and handoffs in each process.</p></div>
        <div className="demo-links">{demos.map((d,i) => <Link to={`/lab?workflow=${i}`} key={d.name}><span>{d.name}</span><small>{d.steps[0]} → {d.steps[d.steps.length-1]}</small><ArrowRight size={18}/></Link>)}</div>
      </section>
      <section className="lx-measure"><div><p className="lx-kicker">ROI calculator</p><h2>What is the manual work costing you?</h2></div><Link className="lx-cta" to="/roi">Estimate your savings <ArrowUpRight /></Link></section>
      <AuditBanner />
    </div>
  );
}
