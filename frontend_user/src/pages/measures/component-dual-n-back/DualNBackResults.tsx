import { useMemo, useCallback } from "react";

import { MeasureEndingScreen } from "../../../components";

import { Trial } from "./generate-trials";
import { getNFromPriorRun } from "./get-n-from-prior-run";
import { SubmitValues, measuresPrettyToMeasures } from "../types";

export const DualNBackResults: React.FC<{
  nBack: number;
  trials: Trial[];
  userPositionResponses: boolean[];
  userLetterResponses: boolean[];
  handleSubmit: (values: SubmitValues) => void;
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

    return [
      {
        key: "n_back",
        value: nBack,
        displayLabel: "N Back",
        displayValue: nBack.toString(),
      },
      {
        key: "accuracy_letter",
        value: accLe / trials.length,
        displayLabel: "Accuracy per Letter",
        displayValue: (accLe / trials.length).toFixed(2),
      },
      {
        key: "accuracy_position",
        value: accPo / trials.length,
        displayLabel: "Accuracy per Position",
        displayValue: (accPo / trials.length).toFixed(2),
      },
      {
        key: "accuracy_total",
        value: (accLe + accPo) / (trials.length * 2),
        displayLabel: "Accuracy Total",
        displayValue: ((accLe + accPo) / (trials.length * 2)).toFixed(2),
      },
    ];
  }, [nBack, trials, userPositionResponses, userLetterResponses]);

  const handleSubmitInner = useCallback(() => {
    handleSubmit(results);
  }, [handleSubmit, results]);

  return (
    <MeasureEndingScreen
      results={[
        { name: "N Back", value: nBack },
        { name: "Next N Back", value: getNFromPriorRun(measuresPrettyToMeasures(results)) },
        { name: "Accuracy Letter", value: results.find((r) => r.key === "accuracy_letter")?.value ?? 0 },
        { name: "Accuracy Position", value: results.find((r) => r.key === "accuracy_position")?.value ?? 0 },
        { name: "Accuracy Total", value: results.find((r) => r.key === "accuracy_total")?.value ?? 0 },
      ]}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitInner}
    />
  );
};
