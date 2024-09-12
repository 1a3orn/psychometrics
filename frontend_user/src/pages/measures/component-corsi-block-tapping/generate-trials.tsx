import { NAVBAR_HEIGHT } from "../../../components";

import { ACCEPTANCE_BAR_HEIGHT, MARGIN } from "./constants";
import { Trial } from "./types";
const generateRandomX = (screenWidth: number, blockWidth: number) =>
  Math.floor(Math.random() * (screenWidth - blockWidth - MARGIN * 2));

const generateRandomY = (screenHeight: number, blockHeight: number) =>
  Math.floor(Math.random() * (screenHeight - blockHeight - NAVBAR_HEIGHT - ACCEPTANCE_BAR_HEIGHT - MARGIN * 2));

export const generateOneTrial = ({ taps, blockNumber }: { taps: number; blockNumber: number }) => {
  // First, determine the current width and height of the screen,
  // so we know what range within which to generate the blocks
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  const blockWidth = Math.min(screenWidth / 10, screenHeight / 10);
  const blockHeight = blockWidth;

  const generateRandomBlock = () => ({
    x: generateRandomX(screenWidth, blockWidth),
    y: generateRandomY(screenHeight, blockHeight),
    width: blockWidth,
    height: blockHeight,
  });

  // Next, we needc to generate the blocks locations,
  // which should be random, but not overlap with each other
  // and not be too close to the edges of the screen
  const blocks = Array.from({ length: blockNumber }, () => generateRandomBlock());

  // There might be overlap, so if we have overlap we should remove-and-replace
  // blocks until we have a valid configuration
  const checkOverlap = (block1: { x: number; y: number }, block2: { x: number; y: number }) => {
    // X, Y are the upper-left corner of the block
    const xOverlap = block1.x < block2.x + blockWidth + MARGIN && block1.x + blockWidth + MARGIN > block2.x;
    const yOverlap = block1.y < block2.y + blockHeight + MARGIN && block1.y + blockHeight + MARGIN > block2.y;
    return xOverlap && yOverlap;
  };

  let totalAttempts = 0;
  for (let i = 0; i < blocks.length; i++) {
    let attempts = 0;
    const maxAttempts = 120;

    while (attempts < maxAttempts) {
      let hasOverlap = false;

      for (let j = 0; j < i; j++) {
        if (checkOverlap(blocks[i], blocks[j])) {
          hasOverlap = true;
          break;
        }
      }

      if (!hasOverlap) {
        break;
      }

      blocks[i] = generateRandomBlock();
      attempts++;
    }

    if (attempts === maxAttempts) {
      console.warn(`Could not find non-overlapping position for block ${i} after ${maxAttempts} attempts.`);
    }
    totalAttempts += attempts;
  }
  console.log(blockNumber, totalAttempts);

  // Next, we need to generate the sequence of taps
  // which should be random, but not too long or too short
  const sequenceTaps = Array.from({ length: taps }, () => Math.floor(Math.random() * blockNumber));
  // Return the trial
  return {
    blockLocations: blocks,
    sequenceIndices: sequenceTaps,
  };
};

export const generateTrials = ({ maxTrials }: { maxTrials: number }) => {
  const trials: Trial[] = [];
  for (let i = 0; i < maxTrials; i++) {
    const taps = i;
    const blockNumber = Math.max(11, taps + Math.floor(Math.random() * 4));
    trials.push(generateOneTrial({ taps, blockNumber }));
  }

  return trials;
};
