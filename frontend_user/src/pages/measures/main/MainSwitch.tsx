import { MeasureDefinition } from "../types";

import { isMany, isOne } from "./use-main-state";
import { UseMainReturn, useMain } from "./use-main";
import { View } from "./View";

export const SwitchOnState = ({ measure }: { measure: MeasureDefinition }) => {
  const props = useMain(measure);
  switch (props.state.type) {
    case "home":
      return <View {...props} measure={measure} />;
    case "one":
      return <ViewOne {...props} measure={measure} />;
    case "many":
      return <ViewMany {...props} measure={measure} />;
  }
};

export const ViewMany = (props: UseMainReturn & { measure: MeasureDefinition }) => {
  if (!isMany(props.state)) return null;
  return (
    <props.measure.Component
      // Flush the state after every iteration, just to be safe
      key={props.measure.key + props.state.iteration + "-many"}
      priorRun={props.priorRun}
      handleCancel={props.handleHome}
      handleSubmit={props.handleNextMany}
    />
  );
};

export const ViewOne = (props: UseMainReturn & { measure: MeasureDefinition }) => {
  if (!isOne(props.state)) return null;
  return (
    <props.measure.Component
      key="single-run"
      priorRun={props.priorRun}
      handleCancel={props.handleHome}
      handleSubmit={props.handleFinishOne}
    />
  );
};
