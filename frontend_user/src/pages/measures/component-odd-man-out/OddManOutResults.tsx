import React, { useMemo, useCallback } from "react";
import { MeasureEndingScreen } from "../../../components";
import { Trial, UserResponse } from "./use-odd-man-out";

export const OddManOutResults: React.FC<{
  trials: Trial[];
  userResponses: UserResponse[];
  handleSubmit: (values: Record<string, number>) => void;
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
    return { accuracy, reaction_time: averageReactionTime };
  }, [trials, userResponses]);

  const handleSubmitInner = useCallback(() => {
    handleSubmit(results);
  }, [handleSubmit, results]);

  return (
    <MeasureEndingScreen
      results={[{ name: "Accuracy", value: results.accuracy }]}
      handleCancel={handleCancel}
      handleSubmit={handleSubmitInner}
    />
  );
};
