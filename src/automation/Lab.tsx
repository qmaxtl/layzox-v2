import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactFlow, Background, Controls, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  CheckCircle2,
} from "lucide-react";
import { demos } from "./data";
export default function Lab() {
  const [params, setParams] = useSearchParams();
  const initial = Number(params.get("workflow"));
  const [demo, setDemo] = useState(Number.isInteger(initial) && demos[initial] ? initial : 0),
    [step, setStep] = useState(-1),
    [playing, setPlaying] = useState(false);
  const d = demos[demo];
  useEffect(() => {
    const next = Number(params.get("workflow"));
    if (Number.isInteger(next) && demos[next]) { setDemo(next); setStep(-1); setPlaying(false); }
  }, [params]);
  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => {
      setStep(Math.min(step + 1, 4));
      if (step >= 3) setPlaying(false);
    }, 1700);
    return () => clearTimeout(id);
  }, [playing, step]);
  const reset = () => {
    setPlaying(false);
    setStep(-1);
  };
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">Automation experience lab</span>
        <h1>
          See the work flow. <br />
          <em>Then imagine yours.</em>
        </h1>
        <p>
          Explore seven realistic examples, one step at a time. These are
          simulations, with sample data. No external systems are connected.
        </p>
      </div>
      <div className="tabs" role="group" aria-label="Choose simulation">
        {demos.map((x, i) => (
          <button
            key={x.name}
            aria-pressed={i === demo}
            onClick={() => {
              setDemo(i);
              setParams({workflow:String(i)}, {replace:true});
              reset();
            }}
          >
            {x.name}
          </button>
        ))}
      </div>
      <section className="lab-panel">
        <div className="lab-toolbar">
          <span className="simulation-pill">SIMULATION · {d.name}</span>
          <div className="controls">
            <button
              onClick={() => {
                if (step === 4) setStep(-1);
                setPlaying(!playing);
              }}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}{" "}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              disabled={step === 4}
              onClick={() => {
                setPlaying(false);
                setStep((s) => Math.min(s + 1, 4));
              }}
            >
              <SkipForward size={16} /> Step
            </button>
            <button onClick={reset}>
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>
        <p className="sample-data">{d.sample}</p>
        <div className="flow-canvas" aria-label="Sample workflow diagram">
          <ReactFlow
            key={demo}
            nodes={d.steps.map((label, i) => ({
              id: String(i),
              position: { x: i * 220, y: 30 },
              data: { label: `${i < step || step === 4 ? "✓ " : ""}${label}` },
              className: `flow-node ${i === step && step !== 4 ? "current" : ""} ${i < step ? "done" : ""}`,
              draggable: false,
            }))}
            edges={d.steps
              .slice(1)
              .map((_, i) => ({
                id: `${i}-${i + 1}`,
                source: String(i),
                target: String(i + 1),
                animated: playing && i === step,
                markerEnd: { type: MarkerType.ArrowClosed },
                style: {
                  stroke: i < step ? "#08a789" : "#5593e9",
                  strokeWidth: 2,
                },
              }))}
            fitView
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            zoomOnScroll={false}
            preventScrolling={false}
            minZoom={0.2}
          >
            <Background gap={22} />
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
        <ol className="step-list">
          {d.steps.map((s, i) => (
            <li key={s} className={i === step ? "current" : ""}>
              <span>{i < step ? <CheckCircle2 size={18} /> : i + 1}</span>
              <strong>{s}</strong>
              <small>{d.details[i]}</small>
            </li>
          ))}
        </ol>
        <div className="live-output" role="status" aria-live="polite">
          <strong>
            {step < 0
              ? "Ready when you are"
              : step === 4
                ? "Final step · simulation complete"
                : `Step ${step + 1} of 5`}
          </strong>
          <p>
            {step < 0
              ? "Press Play or Step to follow the sample through the workflow."
              : d.details[step]}
          </p>
        </div>
      </section>
    </div>
  );
}
