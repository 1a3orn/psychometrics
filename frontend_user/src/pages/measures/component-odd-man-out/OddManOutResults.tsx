import React, { useMemo, useCallback } from "react";
import { MeasureEndingScreen } from "../../../components";
import { Trial, UserResponse } from "./use-odd-man-out";
import { SubmitValues } from "../types";

export const OddManOutResults: React.FC<{
  trials: Trial[];
  userResponses: UserResponse[];
  handleSubmit: (values: SubmitValues) => void;
  handleCancel: () => void;
}> = ({ trials, userResponses, handleSubmit, handleCancel }) => {
  const results = useMemo(() => {
    let correctResponses = 0;
    for (let i = 0; i < trials.length; i++) {
      if (userResponses[i].response === trials[i].correctAnswer) {
        correctResponses++;
      }
    }
    const accuracy = correctResponses / trials.length;
    const averageReactionTime =
      userResponses.reduce((sum, response) => sum + response.reactionTime, 0) / userResponses.length;
    return [
      { key: "accuracy", value: accuracy, displayLabel: "Accuracy", displayValue: accuracy.toFixed(2) },
      {
        key: "reaction_time",
        value: averageReactionTime,
        displayLabel: "Average Reaction Time",
        displayValue: averageReactionTime.toFixed(2),
      },
    ];
  }, [trials, userResponses]);

  const handleSubmitInner = useCallback(() => {
    handleSubmit(results);
  }, [handleSubmit, results]);

  return (
    <MeasureEndingScreen
      results={[{ name: "Accuracy", value: results[0].value }]}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitInner}
    />
  );
};
