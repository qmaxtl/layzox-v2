import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import SignalStudio from "./SignalStudio";
import CinematicCanvas from "./CinematicCanvas";
import "./presentation.css";
import "./cinematic.css";

const chapters = [
  ["Capture the request", "A customer asks for a workshop quotation on WhatsApp."],
  ["Give sales the context", "Check the enquiry, assign an owner and adjust the participant count."],
  ["Prepare the quotation", "The workshop quantity and unit price flow into the draft."],
  ["Keep approval human", "Review the recipient and total before approving the sample."],
];

export default function StudioScene() {
  const track = useRef<HTMLElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [reading, setReading] = useState(false);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    const root = track.current;
    if (!root) return;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function render() {
      if (!root) return;
      const sticky = root.firstElementChild as HTMLElement;
      const top = parseFloat(getComputedStyle(sticky).top) || 0;
      const distance = root.offsetHeight - sticky.offsetHeight;
      const progress = Math.max(0, Math.min(1, (top - root.getBoundingClientRect().top) / Math.max(1, distance)));
      setProgress(progress);
      const p = Math.min(1, progress / .78);
      const eased = p * p * (3 - 2 * p);
      const cinematic = !media.matches && window.innerWidth >= 900 && window.innerHeight >= 500;
      root.style.setProperty("--takeover", String(cinematic ? Math.max(0, Math.min(1, (progress - .65) / .23)) : 1));
      root.style.setProperty("--scene-opacity", String(cinematic ? 1 - Math.max(0, Math.min(1, (progress - .72) / .18)) : 1));
      root.style.setProperty("--camera", String(cinematic ? 1 + eased * 2.45 : 1));
      root.style.setProperty("--intro-opacity", String(Math.max(0,1-progress*(cinematic ? 7 : 2.5))));
      setReading(progress > (cinematic ? .72 : .59));
    }
    function queue() { cancelAnimationFrame(frame); frame = requestAnimationFrame(render); }
    const ro = new ResizeObserver(queue);
    ro.observe(root);
    window.addEventListener("scroll", queue, { passive:true });
    media.addEventListener("change", queue);
    render();
    return () => { cancelAnimationFrame(frame); ro.disconnect(); window.removeEventListener("scroll",queue); media.removeEventListener("change",queue); };
  }, []);

  useEffect(() => {
    if (!reading || !playing || stage === 3 || invalid) return;
    const timer = window.setTimeout(() => {
      setStage(stage + 1);
      if (stage === 2) setPlaying(false);
    }, 4600);
    return () => clearTimeout(timer);
  }, [reading, playing, stage, invalid]);

  function openWalkthrough() {
    const root = track.current;
    if (!root) return;
    const sticky = root.firstElementChild as HTMLElement;
    const top = scrollY + root.getBoundingClientRect().bottom - sticky.offsetHeight - parseFloat(getComputedStyle(sticky).top);
    window.scrollTo({ top, behavior:"instant" });
    setReading(true);
    requestAnimationFrame(() => panel.current?.focus({ preventScroll:true }));
  }
  function select(next: number) { setPlaying(false); setStage(next); }
  return <section className="film-track" ref={track} aria-labelledby="cover-heading">
    <div className="film-sticky" data-reading={reading}>
      <div className="film-photo"><img src="/layzox-office.webp" alt="" fetchPriority="high" /></div>
      <div className="cinematic-layer"><CinematicCanvas progress={progress}/></div>
      <div className="film-shade"/>
      <div className="film-intro" inert={reading}>
        <p className="lx-kicker">Layzox India Private Limited</p>
        <h1 id="cover-heading">Business automation.<br/><em>Engineered for scale.</em></h1>
        <p>Connect sales, support and operations with AI workflows built around the tools your people already use.</p>
        <div className="film-actions"><button type="button" onClick={openWalkthrough}>Watch a workflow <ArrowDown size={16}/></button><Link to="/audit">Free automation audit <ArrowUpRight size={16}/></Link></div>
      </div>
      <div className="film-console" ref={panel} tabIndex={-1} inert={!reading}>
        <div className="film-chapters">
          <p className="lx-kicker">Interactive walkthrough</p><h2>Enquiry to approval.</h2>
          <div className="film-index">{chapters.map(([title,desc],i)=><button type="button" key={title} disabled={invalid && i !== stage} aria-current={i===stage?"step":undefined} onClick={()=>select(i)}><span>{String(i+1).padStart(2,"0")}</span><div><strong>{title}</strong>{stage===i && <small>{desc}</small>}</div></button>)}</div>
          <button type="button" className="film-play" disabled={invalid} onClick={()=>{if(stage===3)setStage(0);setPlaying(!playing);}}>{playing?<Pause size={15}/>:<Play size={15}/>} {playing?"Pause tour":"Play guided tour"}</button>
        </div>
        <div onInput={()=>setPlaying(false)}><SignalStudio stage={stage} setStage={select} onValidityChange={setInvalid}/></div>
      </div>
    </div>
  </section>;
}
