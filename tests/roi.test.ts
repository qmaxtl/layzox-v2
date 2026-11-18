import test from "node:test";
import assert from "node:assert/strict";
import { calculateRoi } from "../src/automation/roi.ts";
const base = {
  employees: 10,
  hours: 30,
  hourlyCost: 300,
  coverage: 50,
  implementation: 150000,
  maintenance: 10000,
};
test("monthly inputs, first-year cost and payback use consistent units", () => {
  const r = calculateRoi(base);
  assert.equal(r.hoursSaved, 150);
  assert.equal(r.annualGross, 540000);
  assert.equal(r.annualNet, 270000);
  assert.equal(r.payback, 150000 / 35000);
});
test("zero coverage cannot claim payback", () => {
  const r = calculateRoi({ ...base, coverage: 0 });
  assert.equal(r.hoursSaved, 0);
  assert.equal(r.payback, null);
  assert.equal(r.annualNet, -270000);
});
test("maintenance exceeding capacity value gives no payback", () =>
  assert.equal(calculateRoi({ ...base, maintenance: 50000 }).payback, null));
test("zero implementation cost is immediate when monthly benefit is positive", () =>
  assert.equal(calculateRoi({ ...base, implementation: 0 }).payback, 0));
test("invalid and impossible inputs are rejected", () => {
  for (const patch of [
    { coverage: 101 },
    { hours: -1 },
    { employees: Infinity },
    { hours: 745 },
    { hourlyCost: NaN },
  ])
    assert.throws(() => calculateRoi({ ...base, ...patch }));
});
