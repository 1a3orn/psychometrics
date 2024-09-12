import { MeasureComponent } from "../types";
import { useReactionTime4Choice } from "./use-reaction-time-4-choice";
export const ReactionTime4Choice: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const { stage, choice, correct, reactionTime } = useReactionTime4Choice();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
      {stage === "waiting" && (
        <div className="flex items-center justify-center bg-green-500 text-white text-4xl font-bold p-8 rounded-lg w-full h-full">
          <span>Wait for it....</span>
        </div>
      )}
      {stage === "click" && (
        <div className="bg-red-600 text-white text-6xl font-bold p-16 rounded-lg cursor-pointer w-full h-full flex items-center justify-center">
          <span>{choice}</span>
        </div>
      )}
      {stage === "result" && reactionTime !== null && (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Your Reaction Time</h2>
          <p className="text-5xl font-bold text-blue-600 mb-8">{reactionTime} ms</p>
          <h2 className="text-2xl font-bold mb-4">Correct</h2>
          <p className="text-4xl mb-8">{correct ? "Yes" : "No"}</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Forget result
            </button>
            <button
              onClick={() =>
                handleSubmit({
                  reaction_time: reactionTime,
                  accuracy: correct ? 1 : 0,
                })
              }
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
