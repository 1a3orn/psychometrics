import { MeasureDefinition } from "../types";

import { PageMain, PageMainLoading, Navbar } from "../../../components";
import { isMany, isOne } from "./use-measures-state";
import { useMeasuresMaster, UseMeasuresMasterReturn } from "./use-measures-master";
import { View } from "./View";

export const MeasuresMaster = ({ measure }: { measure: MeasureDefinition }) => {
  const props = useMeasuresMaster(measure);
  if (props.state.type === "loading") return <PageMainLoading />;
  return (
    <PageMain>
      <Navbar title={measure.title} />
      <SwitchOnState {...props} measure={measure} />
    </PageMain>
  );
};

export const SwitchOnState = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  switch (props.state.type) {
    case "loading":
      return null;
    case "home":
      return <View {...props} />;
    case "one":
      return <ViewOne {...props} />;
    case "many":
      return <ViewMany {...props} />;
  }
};

export const ViewMany = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
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

export const ViewOne = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
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
