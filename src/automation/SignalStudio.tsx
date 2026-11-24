import { useState } from "react";
import { ArrowRight, Check, CheckCheck, ClipboardList, FileText, Inbox, Layers, MessageCircle, RotateCcw, ShieldCheck } from "lucide-react";

const stages = [
  { title: "Enquiry", app: "WhatsApp inbox", icon: MessageCircle },
  { title: "CRM", app: "Sales workspace", icon: Layers },
  { title: "Quotation", app: "Quotation desk", icon: FileText },
  { title: "Approval", app: "Approval queue", icon: ShieldCheck },
];
const unitPrice = 2500;
const currency = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function SignalStudio({ stage, setStage }: { stage: number; setStage: (value: number) => void }) {
  const [people, setPeople] = useState("12");
  const [approved, setApproved] = useState(false);
  const valid = /^\d+$/.test(people) && +people >= 1 && +people <= 100;
  const count = valid ? +people : 12;
  const current = stages[stage];
  const Icon = current.icon;
  function restart() {
    setPeople("12");
    setApproved(false);
    setStage(0);
  }
  function navigate(next: number) {
    if (stage === 1 && !valid) return;
    setStage(next);
  }
  const action = ["Create CRM record", "Prepare quotation", "Send for review", approved ? "Replay simulation" : "Approve sample quote"][stage];
  function advance() {
    if (stage < 3) navigate(stage + 1);
    else if (approved) restart();
    else setApproved(true);
  }

  return <section className="desk" aria-label="Interactive enquiry demonstration">
    <div className="desk-caption"><span><i /> Interactive walkthrough</span><span>Sample data</span></div>
    <div className="desk-window">
      <div className="desk-bar"><span className="desk-app"><Icon size={17} />{current.app}</span><span className="desk-ref">LZ / 012</span></div>
      <div className="desk-page" key={stage} aria-live="polite">
        {stage === 0 && <>
          <div className="desk-person"><span className="desk-avatar">AM</span><div><strong>Asha Mehta</strong><small>Sample conversation</small></div></div>
          <div className="desk-inbox"><span className="desk-time">Today · 09:41</span><div className="desk-bubble">Hi! Could you share a quotation for a team workshop for 12 people?<small>09:41</small></div><div className="desk-response">Enquiry captured <CheckCheck size={14}/></div></div>
        </>}
        {stage === 1 && <>
          <div className="desk-doc-label"><Inbox size={16}/> Enquiry record</div><h2>Asha Mehta</h2>
          <dl className="desk-fields"><div><dt>Source</dt><dd>WhatsApp</dd></div><div><dt>Request</dt><dd>Team workshop</dd></div><div><dt>Assigned to</dt><dd>Sales desk</dd></div></dl>
          <label className="desk-count">Participants <input type="number" min="1" max="100" value={people} onChange={e => {setPeople(e.target.value); setApproved(false);}} aria-invalid={!valid}/></label>
          {!valid && <small role="alert">Enter 1 to 100 participants.</small>}
        </>}
        {stage === 2 && <>
          <div className="desk-doc-label"><FileText size={16}/> Sample quotation · Q-012</div><h2>Team workshop</h2><p className="desk-sub">Prepared for Asha Mehta</p>
          <div className="desk-line"><span>{count} participants × {currency(unitPrice)}</span><strong>{currency(count * unitPrice)}</strong></div>
          <div className="desk-total"><span>Sample total</span><strong>{currency(count * unitPrice)}</strong></div>
        </>}
        {stage === 3 && <>
          <div className="desk-doc-label"><ClipboardList size={16}/> Review request · Q-012</div><h2>{approved ? "Quotation approved" : "Ready for review"}</h2>
          <dl className="desk-fields"><div><dt>Recipient</dt><dd>Asha Mehta</dd></div><div><dt>Workshop</dt><dd>{count} participants</dd></div><div><dt>Quote total</dt><dd>{currency(count * unitPrice)}</dd></div></dl>
          <p className={'desk-status' + (approved ? ' complete' : '')}>{approved ? <><Check size={16}/> Approved in this simulation. Nothing was sent.</> : <><ShieldCheck size={16}/> Waiting for your approval.</>}</p>
        </>}
      </div>
      <div className="desk-toolbar"><small>Step {stage + 1} of 4</small><button type="button" disabled={!valid} onClick={advance}>{action}{stage === 3 && approved ? <RotateCcw size={15}/> : <ArrowRight size={15}/>}</button></div>
    </div>
    <nav className="desk-steps" aria-label="Explore workflow stages">{stages.map((s,i) => <button type="button" key={s.title} disabled={stage === 1 && !valid && i !== stage} onClick={() => navigate(i)} aria-current={stage === i ? "step" : undefined}><span>{String(i+1).padStart(2,"0")}</span>{s.title}</button>)}</nav>
  </section>;
}
