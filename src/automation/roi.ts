export type RoiInput = {
  employees: number;
  hours: number;
  hourlyCost: number;
  coverage: number;
  implementation: number;
  maintenance: number;
};
export function calculateRoi(v: RoiInput) {
  if (
    Object.values(v).some((n) => !Number.isFinite(n) || n < 0) ||
    v.coverage > 100 ||
    v.hours > 744 ||
    v.employees > 100000
  )
    throw new Error(
      "Enter valid non-negative values within the displayed limits.",
    );
  const hoursSaved = (v.employees * v.hours * v.coverage) / 100,
    monthlyGross = hoursSaved * v.hourlyCost,
    monthlyNet = monthlyGross - v.maintenance;
  return {
    hoursSaved,
    monthlyGross,
    annualGross: monthlyGross * 12,
    annualNet: monthlyNet * 12 - v.implementation,
    monthlyNet,
    payback: monthlyNet > 0 ? v.implementation / monthlyNet : null,
  };
}
