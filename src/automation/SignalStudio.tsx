import { useEffect, useRef, useState } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";

const phases = [
  { title: "Capture", detail: "A website enquiry arrives with a name, company and request." },
  { title: "Qualify", detail: "The workflow checks required fields and proposes a sales owner for review." },
  { title: "Route", detail: "The reviewed enquiry reaches the CRM with an owner and a follow-up task." },
];

// A continuous folded metal ribbon. Each quad gets its reflection from its
// surface normal, so the highlights follow the geometry as the view rotates.
function surface(u: number, v: number) {
  const twist = 1.5 * u;
  const radius = 0.86 + 0.31 * v * Math.cos(twist) + 0.12 * Math.cos(3 * u);
  return [radius * Math.cos(u), radius * Math.sin(u), 0.36 * Math.sin(3 * u) + 0.36 * v * Math.sin(twist)];
}
const segments = 128, strips = 16;
const vertices = Array.from({ length: (segments + 1) * (strips + 1) }, (_, i) =>
  surface(Math.floor(i / (strips + 1)) / segments * Math.PI * 2, (i % (strips + 1)) / strips * 2 - 1));
function draw(canvas: HTMLCanvasElement, yaw: number, phase: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const width = canvas.width, height = canvas.height;
  if (!width || !height) return;
  ctx.clearRect(0, 0, width, height);
  const scale = Math.min(width * 0.36, height * 0.43);
  const ca = Math.cos(yaw), sa = Math.sin(yaw), tilt = -0.5;
  const points = vertices.map(([x, y, z]) => {
    const a = x * ca + z * sa, b = z * ca - x * sa;
    const yy = y * Math.cos(tilt) - b * Math.sin(tilt), zz = y * Math.sin(tilt) + b * Math.cos(tilt);
    const perspective = 4.7 / (4.7 - zz);
    return { x: width / 2 + a * scale * perspective, y: height / 2 - yy * scale * perspective, z: zz, a, b: yy };
  });
  const faces = [];
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < strips; j++) {
      const n = i * (strips + 1) + j, a = points[n], b = points[n + strips + 1], c = points[n + strips + 2], d = points[n + 1];
      const ux = b.a - a.a, uy = b.b - a.b, uz = b.z - a.z;
      const vx = d.a - a.a, vy = d.b - a.b, vz = d.z - a.z;
      const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const len = Math.hypot(nx, ny, nz) || 1;
      const normal = (nx * .45 - ny * .43 + nz * .78) / len;
      const shine = Math.pow(Math.abs(Math.cos(normal * 5.6 + .24)), 14);
      const rim = Math.pow(Math.abs(normal), 3);
      const seam = j === 0 || j === strips - 1;
      const hue = 230 - 40 * rim + phase * 3;
      const light = seam ? 67 + 23 * shine : 17 + 21 * rim + 54 * shine;
      faces.push({ a, b, c, d, z: a.z + b.z + c.z + d.z, color: `hsl(${hue},${seam ? 92 : 80}%,${light}%)` });
    }
  }
  faces.sort((a,b) => a.z - b.z);
  ctx.lineWidth = .8;
  for (const f of faces) {
    ctx.fillStyle = ctx.strokeStyle = f.color;
    ctx.beginPath(); ctx.moveTo(f.a.x,f.a.y); ctx.lineTo(f.b.x,f.b.y);
    ctx.lineTo(f.c.x,f.c.y); ctx.lineTo(f.d.x,f.d.y); ctx.closePath(); ctx.fill(); ctx.stroke();
  }
  canvas.dataset.painted = "true";
}

export default function SignalStudio() {
  const [phase, setPhase] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  const angle = useRef(.38);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    function size() {
      if (!el) return;
      const bounds = el.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      el.width = Math.round(bounds.width * ratio);
      el.height = Math.round(bounds.height * ratio);
      draw(el, angle.current, phase);
    }
    const observer = new ResizeObserver(size);
    observer.observe(el);
    size();
    const from = angle.current, to = .38 + phase * .75;
    const start = performance.now();
    function animate(now: number) {
      const t = reduced.matches ? 1 : Math.min(1, (now - start) / 660);
      angle.current = from + (to - from) * (1 - (1-t)**3);
      draw(el!, angle.current, phase);
      if (t < 1) frame = requestAnimationFrame(animate);
    }
    if (from !== to) frame = requestAnimationFrame(animate);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [phase]);
  return <section className="signal-studio" aria-label="Interactive lead workflow">
    <div className="signal-art" aria-hidden="true"><canvas ref={canvas} /><img src="/workflow-ribbon.webp" alt="" width="640" height="444" /></div>
    <div className="signal-console">
      <div className="signal-meter" aria-hidden="true">{phases.map((p,i)=><i key={p.title} className={i <= phase ? "lit" : ""}/>)}</div>
      <div className="signal-readout" aria-live="polite"><span>Lead simulation · {phase + 1} / 3</span><h2>{phases[phase].title}</h2><p>{phases[phase].detail}</p></div>
      <button type="button" onClick={() => setPhase((phase + 1) % phases.length)}>{phase === 2 ? <>Replay <RotateCcw size={15}/></> : <>Next step <ArrowRight size={16}/></>}</button>
    </div>
  </section>;
}
