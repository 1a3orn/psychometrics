import { UseMeasuresMasterReturn } from "./use-measures-master";
import { MeasureDefinition } from "../types";

import { PageContent, BasicCard } from "../../../components";

export const ViewOne = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  return <props.measure.Component handleCancel={props.handleHome} handleSubmit={props.handleFinishOne} />;
};
