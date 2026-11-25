import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import SignalStudio from "./SignalStudio";

export default function StudioScene() {
  const [stage, setStage] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const display = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = track.current, image = scene.current, screen = display.current;
    if (!root || !image || !screen) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function paint() {
      if (!root || !image || !screen) return;
      const sticky = root.firstElementChild as HTMLElement;
      const bounds = root.getBoundingClientRect();
      const travel = Math.max(1, bounds.height - sticky.offsetHeight);
      const progress = Math.max(0, Math.min(1, (70 - bounds.top) / travel));
      const blend = motion.matches ? Number(progress >= .5) : progress * progress * (3 - 2 * progress);
      root.dataset.reading = String(progress >= .65);
      const width = image.offsetWidth, height = image.offsetHeight;
      const fit = Math.min(sticky.clientWidth * .94 / (width * .56), sticky.clientHeight * .92 / (height * .47));
      const zoom = 1 + (fit - 1) * blend;
      const dx = (.5 - .66) * width * zoom * blend;
      const dy = (.5 - .44) * height * zoom * blend;
      image.style.transform = `translate(${dx}px, ${dy}px) scale(${zoom})`;
      screen.style.setProperty("--screen-scale", String(screen.offsetWidth / (window.innerWidth <= 700 && progress >= .65 ? screen.offsetWidth : 650)));
    }
    function schedule() { cancelAnimationFrame(frame); frame = requestAnimationFrame(paint); }
    const observer = new ResizeObserver(schedule);
    observer.observe(root); observer.observe(image);
    window.addEventListener("scroll", schedule, { passive: true });
    motion.addEventListener("change", schedule);
    paint();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); motion.removeEventListener("change", schedule); };
  }, []);

  function enterDemo() {
    const root = track.current;
    if (!root) return;
    const sticky = root.firstElementChild as HTMLElement;
    const top = window.scrollY + root.getBoundingClientRect().bottom - sticky.offsetHeight - 70;
    window.scrollTo({top, behavior: "instant"});
    display.current?.focus({ preventScroll:true });
  }

  return <section className="operations-scene" aria-labelledby="cover-heading">
    <div className="operations-heading">
      <div><p className="lx-kicker">Business automation &amp; AI operations</p>
        <h1 id="cover-heading">One enquiry.<br/><em>Every handoff.</em></h1></div>
      <div><p>Follow a WhatsApp request from the first message to a quotation your team can approve.</p>
        <div className="lx-actions"><button className="lx-cta" onClick={enterDemo}>Enter the workflow <ArrowDown size={16}/></button>
        <Link className="lx-text" to="/audit">Free process audit <ArrowUpRight/></Link></div></div>
    </div>
    <div className="scene-track" ref={track}>
      <div className="scene-sticky">
        <div className="scene-image" ref={scene}>
          <img src="/operations-studio.webp" width="1500" height="1000" fetchPriority="high" alt="An operations designer working at a laptop beside the workflow demonstration monitor"/>
          <div className="scene-display" ref={display} tabIndex={-1} aria-label="Sample enquiry to approval workflow">
            <SignalStudio stage={stage} setStage={setStage}/>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
