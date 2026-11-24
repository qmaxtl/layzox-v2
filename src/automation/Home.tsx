import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { demos, solutions } from "./data";
import { AuditBanner } from "./Shell";
import SignalStudio from "./SignalStudio";
import "./home.css";

const chapters = [
  { first: "From enquiry", last: "to approved.", copy: "See a WhatsApp request become an assigned lead and a ready-to-review quotation. We build these connections around the tools your team already uses." },
  { first: "One enquiry.", last: "One owner.", copy: "The request arrives in Sales with the workshop and group size already filled in. Adjust the participant count to see it carry through to the quote." },
  { first: "A quote with", last: "the details.", copy: "The quotation uses the participant count from the CRM. Check the line item and total, then send the draft to a person for review." },
  { first: "The final call", last: "is yours.", copy: "Review the recipient, group size and amount together. Your approval changes the status of this sample quotation." },
];

export default function Home() {
  const [stage, setStage] = useState(0);
  const chapter = chapters[stage];
  return (
    <div className="lx-home">
      <section className="lx-cover" data-stage={stage} aria-labelledby="cover-heading">
        <div className="lx-spread">
          <div className="lx-intro">
            <p className="lx-kicker">Business automation &amp; AI operations</p>
            <h1 id="cover-heading">{chapter.first}<br /> <em>{chapter.last}</em></h1>
            <p className="lx-lede">{chapter.copy}</p>
            <div className="lx-actions">
              <Link className="lx-cta" to="/audit">Get a free process audit <ArrowUpRight /></Link>
              <Link className="lx-text" to="/discovery">Explore Discovery Studio <ArrowRight /></Link>
            </div>
          </div>
          <SignalStudio stage={stage} setStage={setStage} />
        </div>
      </section>
      <section className="practice-section" aria-labelledby="practice-title">
        <div className="practice-heading"><div><p className="lx-kicker">Automation capabilities</p><h2 id="practice-title">The systems behind<br />the handoff.</h2></div><p>Capture the request, move the right information and give people a clear point to review it.</p></div>
        <div className="practice-grid">{solutions.map(s => <Link key={s.slug} to={`/solutions/${s.slug}`}><s.icon className="practice-icon" size={26}/><h3>{s.name}</h3><p>{s.tasks[0]}</p><ArrowUpRight className="practice-arrow" size={19}/></Link>)}</div>
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
