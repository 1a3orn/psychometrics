const PLACES = 2;

export const round = (num: number): string => {
  const rounded = Number(num.toFixed(PLACES));
  return rounded.toFixed(PLACES);
};
