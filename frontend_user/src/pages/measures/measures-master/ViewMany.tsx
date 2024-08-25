import { UseMeasuresMasterReturn } from "./use-measures-master";
import { MeasureDefinition } from "../types";

export const ViewMany = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  return <props.measure.Component handleCancel={props.handleHome} handleSubmit={props.handleNextMany} />;
};
