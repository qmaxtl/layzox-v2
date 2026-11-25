import { useEffect, useRef } from "react";

const clamp = (n:number) => Math.max(0, Math.min(1,n));
const smooth = (n:number) => { const t=clamp(n); return t*t*(3-2*t); };
type Point = [number,number];
// Normalized screen corners for the original 1672 × 941 office plate.
const corners: Point[] = [[.577,.438],[.855,.417],[.848,.773],[.558,.755]];
export default function CinematicCanvas({progress}:{progress:number}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const image=useRef<HTMLImageElement|null>(null);
  const latest=useRef(progress);
  const drawRef=useRef<()=>void>(()=>{});
  useEffect(()=>{
    const el=canvas.current;
    if(!el)return;
    const ctx=el.getContext("2d");
    if(!ctx)return;
    const media=matchMedia("(prefers-reduced-motion: reduce)");
    const img=new Image();
    image.current=img;
    let raf=0;
    function draw(){
      if(!el||!ctx||!img.complete||!img.naturalWidth)return;
      const w=el.clientWidth,h=el.clientHeight;
      if(!w||!h)return;
      const dpr=Math.min(devicePixelRatio||1,2);
      if(el.width!==Math.round(w*dpr)||el.height!==Math.round(h*dpr)){el.width=Math.round(w*dpr);el.height=Math.round(h*dpr);}
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const active=!media.matches&&w>=900&&h>=435;
      const p=active?smooth(latest.current/.78):0;
      const iw=img.naturalWidth,ih=img.naturalHeight;
      const cover=Math.max(w/iw,h/ih);
      const target=Math.max(w/(iw*.29),h/(ih*.34));
      const scale=cover+(target-cover)*p;
      const x=(w-iw*cover)/2*(1-p)+(w/2-iw*.71*scale)*p;
      const y=(h-ih*cover)/2*(1-p)+(h/2-ih*.595*scale)*p;
      ctx.fillStyle="#0b1020";ctx.fillRect(0,0,w,h);
      ctx.drawImage(img,x,y,iw*scale,ih*scale);
      const points=corners.map(([u,v])=>[x+u*iw*scale,y+v*ih*scale]);
      ctx.save();ctx.beginPath();points.forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.closePath();ctx.clip();
      const xs=points.map(a=>a[0]),ys=points.map(a=>a[1]);
      const l=Math.min(...xs),t=Math.min(...ys),sw=Math.max(...xs)-l,sh=Math.max(...ys)-t;
      ctx.fillStyle="#f6f5f1";ctx.fillRect(l,t,sw,sh);
      ctx.fillStyle="#132842";ctx.fillRect(l,t,sw,sh*.16);
      ctx.fillStyle="#fff";ctx.font="600 "+Math.max(9,sw*.038)+"px system-ui";ctx.fillText("LAYZOX / Workflow preview",l+sw*.06,t+sh*.10);
      ctx.fillStyle="#182d45";ctx.font="600 "+Math.max(10,sw*.065)+"px system-ui";ctx.fillText("Enquiry to approval",l+sw*.08,t+sh*.31);
      for(let i=0;i<3;i++){ctx.fillStyle="#dce5ed";ctx.fillRect(l+sw*.08,t+sh*(.40+i*.15),sw*.84,sh*.10);ctx.fillStyle="#2458a4";ctx.fillRect(l+sw*.10,t+sh*(.425+i*.15),sw*(.32+i*.12),sh*.05);}
      ctx.restore();
    }
    function queue(){cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);}
    drawRef.current=queue;img.onload=queue;img.src="/layzox-office.webp";
    const ro=new ResizeObserver(queue);ro.observe(el);media.addEventListener("change",queue);
    return()=>{cancelAnimationFrame(raf);ro.disconnect();media.removeEventListener("change",queue);img.onload=null;drawRef.current=()=>{};};
  },[]);
  useEffect(()=>{latest.current=progress;drawRef.current();},[progress]);
  return <canvas ref={canvas} className="cinematic-canvas" aria-hidden="true"/>;
}
