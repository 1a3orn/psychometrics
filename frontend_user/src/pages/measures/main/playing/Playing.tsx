import { UseSwitchReturn } from "../use-switch";
import { MeasureDefinition } from "../../types";

import { usePlaying } from "./use-playing";
import { ReviewResults } from "./ReviewResults";

export const Playing = (
  props: UseSwitchReturn & {
    measure: MeasureDefinition;
    numberToPlay: number;
    handleConclude: (measures: []) => void;
    handleHome: () => void;
  }
) => {
  const { state, accumRes, priorRun, handleAdvance, handleConclude, handleToggleSelection } = usePlaying(props);

  if (state.type === "playing") {
    return (
      <props.measure.Component
        key={state.iteration}
        priorRun={priorRun}
        handleCancel={props.handleHome}
        handleSubmit={handleAdvance}
      />
    );
  } else {
    return (
      <ReviewResults
        name={props.measure.title}
        accumRes={accumRes}
        handleToggleSelection={handleToggleSelection}
        handleConclude={handleConclude}
      />
    );
  }
};
