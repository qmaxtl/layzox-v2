import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { industries, tasks } from "./data";
export default function Discovery() {
  const [stage, setStage] = useState(0),
    [industry, setIndustry] = useState(industries[0]),
    [selected, setSelected] = useState<string[]>([]),
    [challenge, setChallenge] = useState("");
  return (
    <div className="page-wrap discovery">
      <div className="page-heading">
        <span className="eyebrow">Automation discovery studio</span>
        <h1>
          Your process. <br />
          <em>A clearer next step.</em>
        </h1>
        <p>
          Find opportunities worth exploring. You describe the work; Layzox
          designs and implements the solution with your team.
        </p>
      </div>
      <ol className="wizard-progress">
        {["Your business", "Repetitive work", "Your opportunity"].map(
          (s, i) => (
            <li key={s} className={stage === i ? "current" : ""}>
              {i + 1}. {s}
            </li>
          ),
        )}
      </ol>
      <section className="panel">
        {stage === 0 ? (
          <>
            <h2>Which industry are you in?</h2>
            <div className="choice-grid">
              {industries.map((x) => (
                <button
                  key={x}
                  aria-pressed={industry === x}
                  onClick={() => setIndustry(x)}
                >
                  {x}
                  {industry === x && <Check size={18} />}
                </button>
              ))}
            </div>
            <button className="button" onClick={() => setStage(1)}>
              Continue <ArrowRight size={18} />
            </button>
          </>
        ) : stage === 1 ? (
          <>
            <h2>What slows your team down?</h2>
            <div className="choice-grid">
              {tasks.map((x) => (
                <button
                  key={x}
                  aria-pressed={selected.includes(x)}
                  onClick={() =>
                    setSelected(
                      selected.includes(x)
                        ? selected.filter((y) => y !== x)
                        : [...selected, x],
                    )
                  }
                >
                  {x}
                  {selected.includes(x) && <Check size={18} />}
                </button>
              ))}
            </div>
            <label>
              Describe a challenge (optional)
              <textarea
                value={challenge}
                maxLength={1000}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="For example: We copy website enquiries into our CRM every morning."
              />
            </label>
            <div className="controls">
              <button onClick={() => setStage(0)}>Back</button>
              <button
                className="button"
                disabled={!selected.length}
                onClick={() => setStage(2)}
              >
                Explore opportunities <ArrowRight size={18} />
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="eyebrow">Initial opportunity · {industry}</span>
            <h2>
              Connect the repetitive work. <br />
              Keep people in control.
            </h2>
            <ul className="opportunity-list">
              {selected.map((x) => (
                <li key={x}>
                  <Check size={20} />
                  <div>
                    <strong>{x}</strong>
                    <p>
                      Capture → validate → apply business rules → review
                      exceptions → update your systems.
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            {challenge && <blockquote>{challenge}</blockquote>}
            <p>
              Potential improvements include less duplicate entry, clearer
              ownership and faster handoffs. We need your volumes and process
              timings before estimating savings.
            </p>
            <div className="controls">
              <button onClick={() => setStage(1)}>Back</button>
              <Link
                className="button"
                to="/audit"
                state={{
                  industry,
                  message: `Industry: ${industry}. Opportunities: ${selected.join(", ")}. ${challenge}`,
                }}
              >
                Discuss this workflow <ArrowRight size={18} />
              </Link>
              <Link className="text-link" to="/roi">
                Estimate potential ROI
              </Link>
            </div>
            <small>
              This is a high-level proposal, not a deployed application or final
              solution design.
            </small>
          </>
        )}
      </section>
    </div>
  );
}
