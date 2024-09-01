type Position = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type Letter = string;

export interface Trial {
  index: number;
  position: Position;
  letter: Letter;
  positionMatch: boolean;
  letterMatch: boolean;
}

const getRand =
  <T>(arr: T[]) =>
  () =>
    arr[Math.floor(Math.random() * arr.length)];
const LETTERS = "ABCDEFGHIJKLNOPQRSTUVWXYZ".toLowerCase().split("");
const POSITIONS: Position[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

/**
 * Generates a list of trials for the Dual N-Back game.
 *
 * @param {number} n - The N value for the game.
 * @param {number} totalTrials - The total number of trials to generate.
 * @param {number} percentagePositive - The percentage of trials that should be positive.
 * @returns {Trial[]} An array of Trial objects.
 */

const arrLen = (length: number) => new Array(length).fill(0);

const genRandWithPercent = (length: number, percent: number): boolean[] => {
  const arr = new Array(length).fill(false);
  const numTrue = Math.floor(length * percent);
  for (let i = 0; i < numTrue; i++) {
    arr[i] = true;
  }
  // Shuffle the array
  arr.sort(() => Math.random() - 0.5);
  // Shuffle the array again
  arr.sort(() => Math.random() - 0.5);
  return arr;
};

export const generateTrials = (data: { n: number; totalTrials: number; percentagePositive: number }) => {
  const { n, totalTrials, percentagePositive } = data;

  const positions: Position[] = arrLen(totalTrials).map(getRand(POSITIONS));
  const letters: Letter[] = arrLen(totalTrials).map(getRand(LETTERS));

  // Set the position and letter matches for the trials
  const positionMatches: boolean[] = genRandWithPercent(totalTrials, percentagePositive);
  const letterMatches: boolean[] = genRandWithPercent(totalTrials, percentagePositive);

  // positionmatches < n are always false
  for (let i = 0; i < n; i++) {
    positionMatches[i] = false;
    letterMatches[i] = false;
  }

  // Fill the positions and letters with a non-matching pattern if
  // the current trial is not a match, otherwise fill with the same pattern
  for (let i = n; i < totalTrials; i++) {
    // If the current trial is not a match, fill with a non-matching pattern
    if (!positionMatches[i]) {
      while (positions[i - n] === positions[i]) {
        positions[i] = getRand(POSITIONS)();
      }

      // If the current trial is a match, fill with the same pattern
    } else {
      positions[i] = positions[i - n];
    }

    // If the current trial is not a match, fill with a non-matching pattern
    if (!letterMatches[i]) {
      while (letters[i - n] === letters[i]) {
        letters[i] = getRand(LETTERS)();
      }

      // If the current trial is a match, fill with the same pattern
    } else {
      letters[i] = letters[i - n];
    }
  }

  // Construct the trials from the position and letter matches
  const trials: Trial[] = [];
  for (let i = 0; i < totalTrials; i++) {
    trials.push({
      index: i,
      position: positions[i],
      letter: letters[i],
      positionMatch: positionMatches[i],
      letterMatch: letterMatches[i],
    });
  }

  return trials;
};
