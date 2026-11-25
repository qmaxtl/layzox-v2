import { useEffect, useRef } from "react";

const clamp = (n:number) => Math.max(0, Math.min(1,n));
const smooth = (n:number) => { const t=clamp(n); return t*t*(3-2*t); };
type Point = [number,number];
// Normalized screen corners for the original 1672 × 941 office plate.
const corners: Point[] = [[.577,.438],[.855,.417],[.848,.773],[.558,.755]];
export default function CinematicCanvas({progress}:{progress:number}) {
  const canvas=useRef<HTMLCanvasElement>(null);
  const latest=useRef(progress);
  const drawRef=useRef<()=>void>(()=>{});
  useEffect(()=>{
    const el=canvas.current;
    if(!el)return;
    const ctx=el.getContext("2d");
    if(!ctx)return;
    const media=matchMedia("(prefers-reduced-motion: reduce)");
    const img=new Image();
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
      const x=(w-iw*cover)*.65*(1-p)+(w/2-iw*.71*scale)*p;
      const y=(h-ih*cover)/2*(1-p)+(h/2-ih*.595*scale)*p;
      ctx.fillStyle="#0b1020";ctx.fillRect(0,0,w,h);
      ctx.drawImage(img,x,y,iw*scale,ih*scale);
      const points=corners.map(([u,v])=>[x+u*iw*scale,y+v*ih*scale]);
      ctx.save();ctx.beginPath();points.forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.closePath();ctx.clip();
      // Map the interface onto the screen plane using a subdivided bilinear mesh.
      const [a,b,c,d]=points;
      const map=(u:number,v:number)=>[
        (1-v)*((1-u)*a[0]+u*b[0])+v*((1-u)*d[0]+u*c[0]),
        (1-v)*((1-u)*a[1]+u*b[1])+v*((1-u)*d[1]+u*c[1])
      ];
      const sw=800,sh=500;
      const surface=document.createElement("canvas");
      surface.width=sw;surface.height=sh;
      const ui=surface.getContext("2d");
      if(ui){
        ui.fillStyle="#f6f5f1";ui.fillRect(0,0,sw,sh);
        ui.fillStyle="#132842";ui.fillRect(0,0,sw,80);
        ui.fillStyle="#fff";ui.font="600 26px system-ui";ui.fillText("LAYZOX / Workflow preview",48,50);
        ui.fillStyle="#182d45";ui.font="600 48px system-ui";ui.fillText("Enquiry to approval",64,155);
        for(let i=0;i<3;i++){ui.fillStyle="#dce5ed";ui.fillRect(64,200+i*75,672,50);ui.fillStyle="#2458a4";ui.fillRect(80,212+i*75,sw*(.32+i*.12),25);}
        const strips=24;
        for(let i=0;i<strips;i++){
          const u=i/strips,next=(i+1)/strips;
          const q=map(u,0),r=map(next,0),s=map(u,1);
          const slice=sw/strips;
          ctx.save();
          ctx.transform((r[0]-q[0])/slice,(r[1]-q[1])/slice,(s[0]-q[0])/sh,(s[1]-q[1])/sh,q[0],q[1]);
          ctx.drawImage(surface,i*slice,0,slice,sh,0,0,slice+.8,sh);
          ctx.restore();
        }
      }
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
