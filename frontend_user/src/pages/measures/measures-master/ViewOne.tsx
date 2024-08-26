import { UseMeasuresMasterReturn } from "./use-measures-master";
import { MeasureDefinition } from "../types";

export const ViewOne = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  return <props.measure.Component handleCancel={props.handleHome} handleSubmit={props.handleFinishOne} />;
};
