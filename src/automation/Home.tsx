import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { demos, solutions } from "./data";
import { AuditBanner } from "./Shell";
import StudioScene from "./StudioScene";
import "./home.css";

export default function Home() {
  const [selected, setSelected] = useState(0);
  const example = demos[selected];
  return (
    <div className="lx-home">
      <StudioScene />
      <section className="enterprise-intro"><p className="lx-kicker">Built for the way business works</p><h2>Complex operations.<br/>Clearer systems.</h2><p>We design and engineer connected software that helps teams move from fragmented tasks to reliable, measurable workflows.</p><Link className="lx-text" to="/about">Our approach <ArrowUpRight /></Link></section>
      <section className="practice-section" aria-labelledby="practice-title">
        <div className="practice-heading"><div><p className="lx-kicker">Automation capabilities</p><h2 id="practice-title">Engineering for<br />every handoff.</h2></div><p>Capture the request, move the right information and give people a clear point to review it.</p></div>
        <div className="practice-index enterprise-capabilities">{solutions.map((s, index) => (
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
        <div><p className="lx-kicker">Implementation approach</p><h2>From a manual task to a working system.</h2><ol className="build-method"><li><strong>Map the handoffs</strong><span>Identify the trigger, the owner and the information each person needs.</span></li><li><strong>Connect the tools</strong><span>Build the routing rules, integrations and exception handling.</span></li><li><strong>Review with your team</strong><span>Test the workflow against real operating scenarios before rollout.</span></li></ol><Link className="lx-text" to="/discovery">Map your first workflow <ArrowRight /></Link></div>
      </section>
      <section className="industry-lab">
        <div className="industry-inner"><div className="industry-heading"><p className="lx-kicker">Experience lab</p><h2>Where does work<br/>slow down?</h2><p>Select a team to follow a sample request through its decisions and handoffs.</p></div>
          <div className="lab-switch" role="group" aria-label="Choose team workflow">
            {["Sales","Customer support","Operations","Messaging"].map((label,i)=><button type="button" key={label} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{label}</button>)}
          </div>
          <div className="industry-example" key={example.name} aria-live="polite"><div><p className="lx-kicker">Illustrative workflow</p><h3>{example.name}</h3><p>{example.sample}</p><Link className="lx-text" to={`/lab?workflow=${selected}`}>Run simulation <ArrowUpRight/></Link></div>
            <ol>{example.steps.map(step=><li key={step}>{step}</li>)}</ol></div>
        </div>
      </section>
      <section className="lx-measure"><div><p className="lx-kicker">ROI calculator</p><h2>What is the manual work costing you?</h2></div><Link className="lx-cta" to="/roi">Estimate your savings <ArrowUpRight /></Link></section>
      <AuditBanner />
    </div>
  );
}
