import { useMemo } from "react";
import { Trial } from "./generate-trials";

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
  }, [trials, userPositionResponses, userLetterResponses]);

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
};
