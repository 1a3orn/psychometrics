export const getNFromPriorRun = (priorRun?: Array<{ key: string; number: number }>) => {
  if (!priorRun) return 2;

  if (typeof priorRun !== "object") return 2;

  // Get n_back and accuracy_total
  const n_back = priorRun.find((item) => item.key === "n_back");
  const accuracy_total = priorRun.find((item) => item.key === "accuracy_total");

  if (!n_back || !accuracy_total) return 2;

  if (accuracy_total.number >= 0.9) return n_back.number + 1;
  if (accuracy_total.number <= 0.7) return n_back.number - 1;

  return n_back.number;
};
