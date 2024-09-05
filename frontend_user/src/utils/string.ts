export const reverseString = (x: string) => {
  let xx = "";
  for (let i = x.length - 1; i >= 0; i--) {
    xx = xx + x[i];
  }
  return xx;
};
