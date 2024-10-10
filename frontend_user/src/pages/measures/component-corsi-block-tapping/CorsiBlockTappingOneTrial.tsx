import { NAVBAR_HEIGHT } from "../../../components";
import { Trial } from "./types";

import { MARGIN, ACCEPTANCE_BAR_HEIGHT } from "./constants";

import { useCorsiBlockTappingOneTrial } from "./use-corsi-block-tapping-one-trial";

export const CorsiBlockTappingOneTrial = ({
  trial,

  viewHeight,
  onSuccess,
  onFailure,
}: {
  trial: Trial;
  viewHeight: number;
  onSuccess: () => void;
  onFailure: () => void;
}) => {
  const { highlightedSqIdx, phase, handleClickedSquare, handleFinishClick } = useCorsiBlockTappingOneTrial({
    trial,
    onSuccess,
    onFailure,
  });
  return (
    <div>
      <div
        style={{
          top: NAVBAR_HEIGHT,
          height: viewHeight,
          left: MARGIN + "px",
          right: MARGIN + "px",
          position: "absolute",
        }}
      >
        {trial.blockLocations.map((block, index) => (
          <div
            key={index}
            onMouseDown={() => handleClickedSquare(index)}
            style={{
              position: "absolute",
              left: block.x,
              top: block.y,
              width: block.width,
              height: block.height,
              backgroundColor: highlightedSqIdx === index ? "red" : "blue",
              borderRadius: "2px",
            }}
          />
        ))}
      </div>
      <div
        className="flex justify-center items-center"
        style={{
          position: "absolute",
          bottom: MARGIN + "px",
          left: MARGIN + "px",
          right: MARGIN + "px",
          height: ACCEPTANCE_BAR_HEIGHT + "px",
        }}
      >
        {phase === "playing" && <div>Playing...</div>}
        {phase === "waiting" && (
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleFinishClick}>
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
