import { MeasureDefinition } from "../../types";

import { usePlayActive } from "./use-play-active";
import { useContext } from "react";
import { SwitchDataContext } from "../SwitchDataProvider";

type MeasurePlayProps = {
  measure: MeasureDefinition;
  iterations: number;
};

export const PlayActive = (props: MeasurePlayProps) => {
  const { iteration, lastRun, priorRun, handleAdvance } = usePlayActive({
    measure: props.measure,
    iterations: props.iterations,
  });
  const { setMeasureView } = useContext(SwitchDataContext);
  return (
    <props.measure.Component
      key={iteration}
      priorRun={priorRun}
      handleCancel={() => setMeasureView()}
      handleSubmit={handleAdvance}
      currentIndex={iteration + 1}
      totalCount={props.iterations}
      lastRun={lastRun}
    />
  );
};
