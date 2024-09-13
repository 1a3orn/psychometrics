import { MeasureComponent } from "../types";
import { useReactionTime } from "./use-reaction-time";
import { MeasureEndingScreen } from "../../../components";

export const ReactionTime: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const { state, handleClick, handleSubmitInner } = useReactionTime({ handleSubmit });

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
      {state.stage === "waiting" && (
        <div className="flex items-center justify-center bg-green-500 text-white text-4xl font-bold p-8 rounded-lg w-full h-full">
          <span>Wait for it....</span>
        </div>
      )}
      {state.stage === "click" && (
        <div
          className="bg-red-600 text-white text-6xl font-bold p-16 rounded-lg cursor-pointer w-full h-full flex items-center justify-center"
          onMouseDown={handleClick}
        >
          <span>Click!</span>
        </div>
      )}
      {state.stage === "result" && (
        <MeasureEndingScreen
          results={[{ name: "Reaction Time", value: state.reactionTime }]}
          handleCancel={handleCancel}
          handleSubmit={handleSubmitInner}
        />
      )}
    </div>
  );
};
