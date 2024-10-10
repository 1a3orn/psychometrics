import { MeasureDefinition } from "../../types";

import { ReviewResults } from "./ReviewResults";
import { usePlayDone } from "./use-play-done";

type MeasurePlayProps = {
  measure: MeasureDefinition;
  iterations: number;
};

export const PlayDone = (props: MeasurePlayProps) => {
  const { toUpload, handleConclude, handleToggleSelection } = usePlayDone({
    measure: props.measure,
    iterations: props.iterations,
  });
  return (
    <ReviewResults
      name={props.measure.title}
      results={toUpload}
      handleToggleSelection={handleToggleSelection}
      handleConclude={handleConclude}
    />
  );
};
