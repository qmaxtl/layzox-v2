import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { demos, solutions } from "./data";
import { AuditBanner } from "./Shell";
import "./home.css";

export default function Home() {
  const [selected, setSelected] = useState(0);
  const demo = demos[selected];
  return (
    <div className="lx-home">
      <section className="lx-cover" aria-labelledby="cover-heading">
        <div className="lx-spread">
          <div className="lx-intro">
            <p className="lx-kicker">Business automation &amp; AI operations</p>
            <h1 id="cover-heading">Give your team<br />more time for<br /><em>human work.</em></h1>
            <p className="lx-lede">From the first customer enquiry to the final approval, we connect your tools and automate the handoffs that slow people down.</p>
            <div className="lx-actions">
              <Link className="lx-cta" to="/audit">Get a free process audit <ArrowUpRight /></Link>
              <Link className="lx-text" to="/discovery">Explore Discovery Studio <ArrowRight /></Link>
            </div>
          </div>
          <figure className="lx-portrait">
            <img src="/automation-professional.webp" alt="Professional at a desk with an open laptop" width="1086" height="1448" fetchPriority="high" />
          </figure>
        </div>
      </section>
      <section className="lx-story lx-block" aria-labelledby="story-heading">
        <div>
          <p className="lx-kicker">Automation experience lab</p>
          <h2 id="story-heading">Follow the work.</h2>
          <p className="lx-body">Pick a business process and follow a sample request through the systems and people involved.</p>
          <div className="lx-choices" role="group" aria-label="Choose a sample workflow">
            {demos.map((item, i) => <button type="button" key={item.name} aria-pressed={selected === i} onClick={() => setSelected(i)}>{item.name}<ArrowRight size={17}/></button>)}
          </div>
        </div>
        <div className="lx-case" aria-live="polite">
          <p className="lx-kicker">Workflow simulation</p>
          <h3>{demo.name}</h3>
          <p>{demo.sample}</p>
          <ol key={demo.name}>{demo.steps.map((step, i) => <li key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}</li>)}</ol>
          <Link className="lx-text" to={`/lab?workflow=${selected}`}>Run this simulation <ArrowRight /></Link>
        </div>
      </section>
      <section className="lx-services">
        <div className="lx-block">
          <div><p className="lx-kicker">Our services</p><h2>Where automation<br />fits your business.</h2><p className="lx-body">Explore the daily work each solution handles, from validating an invoice to routing a customer request.</p></div>
          <div className="lx-list">{solutions.map(s => <details key={s.slug} name="lx-solution"><summary><s.icon size={23}/>{s.name}<ChevronDown size={18}/></summary><div><p>{s.description}</p><ul>{s.tasks.map(task => <li key={task}>{task}</li>)}</ul><Link className="lx-text" to={`/solutions/${s.slug}`}>Explore solution <ArrowRight /></Link></div></details>)}</div>
        </div>
      </section>
      <section className="lx-measure"><div><p className="lx-kicker">ROI calculator</p><h2>What is the manual work costing you?</h2></div><Link className="lx-cta" to="/roi">Estimate your savings <ArrowUpRight /></Link></section>
      <AuditBanner />
    </div>
  );
}
