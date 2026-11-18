import { useState } from "react";
import { calculateRoi, type RoiInput } from "./roi";
import { ButtonLink } from "./Shell";
const fields: {
  key: keyof RoiInput;
  label: string;
  max: number;
  unit: string;
}[] = [
  {
    key: "employees",
    label: "Employees involved",
    max: 100000,
    unit: "people",
  },
  {
    key: "hours",
    label: "Repetitive work per employee / month",
    max: 744,
    unit: "hours",
  },
  {
    key: "hourlyCost",
    label: "Average hourly labour cost",
    max: 1000000,
    unit: "₹ / hour",
  },
  {
    key: "coverage",
    label: "Expected automation coverage",
    max: 100,
    unit: "%",
  },
  {
    key: "implementation",
    label: "One-time implementation cost",
    max: 1000000000,
    unit: "₹",
  },
  {
    key: "maintenance",
    label: "Monthly maintenance cost",
    max: 100000000,
    unit: "₹ / month",
  },
];
const money = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
export default function Roi() {
  const [v, setV] = useState<RoiInput>({
    employees: 10,
    hours: 30,
    hourlyCost: 300,
    coverage: 50,
    implementation: 150000,
    maintenance: 10000,
  });
  const r = calculateRoi(v);
  return (
    <div className="page-wrap">
      <div className="page-heading">
        <span className="eyebrow">Automation ROI calculator</span>
        <h1>
          Make the opportunity <br />
          <em>measurable.</em>
        </h1>
        <p>
          Explore an indicative scenario using your assumptions. This is not a
          quote or a guarantee of savings.
        </p>
      </div>
      <div className="calculator">
        <section className="panel">
          <h2>Your business, your numbers.</h2>
          <div className="form-grid">
            {fields.map((f) => (
              <label key={f.key}>
                {f.label}
                <div className="number-field">
                  <input
                    type="number"
                    min="0"
                    max={f.max}
                    step={f.key === "employees" ? 1 : "any"}
                    value={v[f.key]}
                    onChange={(e) =>
                      setV({
                        ...v,
                        [f.key]: Math.max(
                          0,
                          Math.min(f.max, Number(e.target.value) || 0),
                        ),
                      })
                    }
                  />
                  <span>{f.unit}</span>
                </div>
              </label>
            ))}
          </div>
        </section>
        <section className="roi-results" aria-live="polite">
          <span className="eyebrow">Your illustrative estimate</span>
          <h2>
            {r.hoursSaved.toLocaleString("en-IN", { maximumFractionDigits: 1 })}
            <small>hours saved per month</small>
          </h2>
          <dl>
            <div>
              <dt>Annual labour capacity value</dt>
              <dd>{money(r.annualGross)}</dd>
            </div>
            <div>
              <dt>Net benefit in year one</dt>
              <dd>{money(r.annualNet)}</dd>
            </div>
            <div>
              <dt>Indicative payback</dt>
              <dd>
                {r.payback === null
                  ? "No payback at these inputs"
                  : `${r.payback.toFixed(1)} months`}
              </dd>
            </div>
          </dl>
          <ButtonLink to="/audit" secondary>
            Validate this with an audit
          </ButtonLink>
        </section>
      </div>
      <section className="panel assumptions">
        <h2>What these numbers mean</h2>
        <p>
          Hours saved = employees × repetitive hours per employee per month ×
          coverage. Annual labour capacity value = hours saved × hourly cost ×
          12. First-year net benefit subtracts implementation cost and 12 months
          of maintenance. Payback = implementation cost ÷ (monthly capacity
          value − maintenance).
        </p>
        <p>
          Released time is capacity, not necessarily a reduction in payroll.
          Actual results depend on process suitability, adoption, error rates,
          integration fees and ongoing oversight. Tax, financing and ramp-up
          time are excluded. Costs shown are editable examples, not Layzox
          prices.
        </p>
      </section>
    </div>
  );
}
