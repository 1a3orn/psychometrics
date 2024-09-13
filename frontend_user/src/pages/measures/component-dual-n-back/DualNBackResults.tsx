import { useMemo, useCallback } from "react";

import { MeasureEndingScreen } from "../../../components";

import { Trial } from "./generate-trials";
import { getNFromPriorRun } from "./get-n-from-prior-run";

export const DualNBackResults: React.FC<{
  nBack: number;
  trials: Trial[];
  userPositionResponses: boolean[];
  userLetterResponses: boolean[];
  handleSubmit: (values: Record<string, number>) => void;
  handleCancel: () => void;
}> = ({ nBack, trials, userPositionResponses, userLetterResponses, handleSubmit, handleCancel }) => {
  const results = useMemo(() => {
    let accPo = 0;
    let accLe = 0;

    for (let i = 0; i < trials.length; i++) {
      const trial = trials[i];
      if (userPositionResponses[i] === trial.positionMatch) accPo++;
      if (userLetterResponses[i] === trial.letterMatch) accLe++;
    }

    return {
      n_back: nBack,
      accuracy_letter: accLe / trials.length,
      accuracy_position: accPo / trials.length,
      accuracy_total: (accLe + accPo) / (trials.length * 2),
    };
  }, [nBack, trials, userPositionResponses, userLetterResponses]);

  const handleSubmitInner = useCallback(() => {
    handleSubmit(results);
  }, [handleSubmit, results]);

  return (
    <MeasureEndingScreen
      results={[
        { name: "N Back", value: nBack },
        { name: "Next N Back", value: getNFromPriorRun(results) },
        { name: "Accuracy Letter", value: results.accuracy_letter },
        { name: "Accuracy Position", value: results.accuracy_position },
        { name: "Accuracy Total", value: results.accuracy_total },
      ]}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitInner}
    />
  );
};
