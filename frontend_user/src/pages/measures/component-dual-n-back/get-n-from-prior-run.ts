export const getNFromPriorRun = (priorRun?: Record<string, number>) => {
  if (!priorRun) return 2;

  if (typeof priorRun !== "object") return 2;

  // Get n_back and accuracy_total
  const n_back = priorRun.n_back;
  const accuracy_total = priorRun.accuracy_total;

  if (!n_back || !accuracy_total) return 2;

  if (accuracy_total >= 0.9) return n_back + 1;
  if (accuracy_total <= 0.75) return n_back - 1;

  return n_back;
};
