export const generateNumberString = (length: number) => {
  return Array(length)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))
    .join(" ");
};
