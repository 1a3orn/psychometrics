import { MeasureComponent } from "../types";
import { useCorsiBlockTapping } from "./use-corsi-block-tapping";
import { CorsiBlockTappingOneTrial } from "./CorsiBlockTappingOneTrial";
import { MeasureEndingScreen } from "../../../components";

export const CorsiBlockTapping: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const {
    trials,
    currentTrialIndex,
    viewHeight,
    phase,
    results,
    handleCompletedTrialSuccessfully,
    handleCompletedTrialUnsuccessfully,
    handleSubmitInner,
  } = useCorsiBlockTapping({ handleSubmit });

  return (
    <div>
      {/* Space for the blocks */}
      {phase === "running" ? (
        <CorsiBlockTappingOneTrial
          key={currentTrialIndex}
          trial={trials[currentTrialIndex]}
          viewHeight={viewHeight}
          onSuccess={handleCompletedTrialSuccessfully}
          onFailure={handleCompletedTrialUnsuccessfully}
        />
      ) : (
        <MeasureEndingScreen results={results} handleCancel={handleCancel} handleSubmit={handleSubmitInner} />
      )}
    </div>
  );
};
