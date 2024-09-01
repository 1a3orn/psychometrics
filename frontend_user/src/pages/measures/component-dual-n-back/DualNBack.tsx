import React, { useCallback, useState } from "react";
import { useDualNBack } from "./use-dual-n-back";

interface DualNBackGameProps {
  n?: number;
  handleCancel: () => void;
  handleSubmit: (values: Record<string, number>) => void;
}

const getCorrect = (pressed: boolean, isMatch: boolean) => {
  if (pressed) {
    return isMatch ? "text-green-500" : "text-red-500";
  }
  return "text-gray-500";
};

export const DualNBack: React.FC<DualNBackGameProps> = ({ n = 2, handleCancel, handleSubmit }) => {
  const {
    curHasVisibleSquare,
    isGameRunning,
    currentIdx,
    trials,
    userPositionResponses,
    userLetterResponses,
    pressedPosition,
    pressedLetter,
  } = useDualNBack({ n, totalTrials: 10, msDelay: 1600, msVisible: 1300 });

  console.log("render");

  const calculateResults = useCallback(() => {
    const results: Record<string, number> = {
      accuracy_total: 0,
      accuracy_letter: 0,
      accuracy_position: 0,
    };

    for (let i = 0; i < trials.length; i++) {
      const trial = trials[i];
      const poMatch = userPositionResponses[i] === trial.positionMatch;
      const leMatch = userLetterResponses[i] === trial.letterMatch;
      if (poMatch && leMatch) {
        results.accuracy_total++;
        results.accuracy_letter++;
        results.accuracy_position++;
      } else if (poMatch) {
        results.accuracy_position++;
      } else if (leMatch) {
        results.accuracy_letter++;
      }
    }

    return {
      n_back: n,
      accuracy_total: results.accuracy_total / trials.length,
      accuracy_position: results.accuracy_position / trials.length,
      accuracy_letter: results.accuracy_letter / trials.length,
    };
  }, [trials, userPositionResponses, userLetterResponses]);

  const showResults = !isGameRunning;

  if (showResults) {
    const results = calculateResults();
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Game Results</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold">Position</h3>
            <p>N-Back: {results.n_back}</p>
            <p>Correct: {results.accuracy_total}</p>
            <p>Correct Position: {results.accuracy_position}</p>
            <p>Correct Letter: {results.accuracy_letter}</p>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={() => handleSubmit(results)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Submit Results
          </button>
          <button onClick={handleCancel} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div>
        <div className="flex flex-row justify-center">
          <div className="grid grid-cols-3 gap-4 mb-4 w-64 h-64">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((position) => (
              <div
                key={position}
                className={`aspect-square border ${
                  currentIdx >= 0 && trials[currentIdx].position === position && curHasVisibleSquare
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <p className="mb-4">Current letter: {currentIdx >= 0 ? trials[currentIdx].letter : ""}</p>
        <div className="flex items-center flex-row w-full justify-center gap-4">
          <p className={`text-sm ${getCorrect(pressedPosition, currentIdx >= 0 && trials[currentIdx].positionMatch)}`}>
            Press 'A' for position match
          </p>
          <p className={`text-sm ${getCorrect(pressedLetter, currentIdx >= 0 && trials[currentIdx].letterMatch)}`}>
            Press 'L' for letter match
          </p>
        </div>
        <p className="mb-4">
          Progress: {currentIdx + 1} / {trials.length}
        </p>
      </div>
    </div>
  );
};
