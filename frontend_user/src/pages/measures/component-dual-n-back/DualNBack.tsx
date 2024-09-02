import { MeasureComponent } from "../types";

import { useDualNBack } from "./use-dual-n-back";
import { DualNBackPlay } from "./DualNBackPlay";
import { DualNBackResults } from "./DualNBackResults";

const BASE_TRIALS = 20;
const MS_DELAY = 1600;
const MS_VISIBLE = 1300;

export const DualNBack: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const {
    isGameRunning,
    nBack,
    trials,
    currentIdx,
    curHasVisibleSquare,
    userPositionResponses,
    userLetterResponses,
    pressedPosition,
    pressedLetter,
  } = useDualNBack({ priorRun, baseTrials: BASE_TRIALS, msDelay: MS_DELAY, msVisible: MS_VISIBLE });

  if (isGameRunning) {
    return (
      <DualNBackPlay
        nBack={nBack}
        trials={trials}
        currentIdx={currentIdx}
        curHasVisibleSquare={curHasVisibleSquare}
        pressedPosition={pressedPosition}
        pressedLetter={pressedLetter}
      />
    );
  } else {
    return (
      <DualNBackResults
        nBack={nBack}
        trials={trials}
        userLetterResponses={userLetterResponses}
        userPositionResponses={userPositionResponses}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    );
  }
};
