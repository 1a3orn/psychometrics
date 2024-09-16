import { MeasureComponent } from "../types";
import { useOddManOut } from "./use-odd-man-out";
import { OddManOutPlay } from "./OddManOutPlay";
import { OddManOutResults } from "./OddManOutResults";

const TOTAL_TRIALS = 20;

export const OddManOut: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const { isGameRunning, currentTrial, trialNumber, userResponses, trials, handleUserResponse } = useOddManOut({
    totalTrials: TOTAL_TRIALS,
  });

  if (isGameRunning) {
    return (
      <OddManOutPlay
        trial={currentTrial}
        trialNumber={trialNumber}
        totalTrials={TOTAL_TRIALS}
        handleUserResponse={handleUserResponse}
      />
    );
  } else {
    return (
      <OddManOutResults
        trials={trials}
        userResponses={userResponses}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    );
  }
};
