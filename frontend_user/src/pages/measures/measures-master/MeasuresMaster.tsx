import { MeasureDefinition } from "../types";

import { PageMain, Navbar } from "../../../components";
import { isMany } from "./use-measures-state";
import { useMeasuresMaster, UseMeasuresMasterReturn } from "./use-measures-master";
import { View } from "./View";

export const MeasuresMaster = ({ measure }: { measure: MeasureDefinition }) => {
  const props = useMeasuresMaster(measure);
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
      return <div>Loading...</div>;
    case "home":
      return <View {...props} />;
    case "one":
      return <ViewOne {...props} />;
    case "many":
      return <ViewMany {...props} />;
  }
};

export const ViewMany = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  const state = props.state;
  if (!isMany(state)) return null;
  // Flush the state after every iteration, just to be safe
  const key = props.measure.key + state.iteration + "-many";
  return <props.measure.Component key={key} handleCancel={props.handleHome} handleSubmit={props.handleNextMany} />;
};

export const ViewOne = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  return <props.measure.Component handleCancel={props.handleHome} handleSubmit={props.handleFinishOne} />;
};
