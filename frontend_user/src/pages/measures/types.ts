import { TaskDecorated } from "../../shared-automatic/types";

export type MeasureComponent = React.ComponentType<{
  priorRun?: Record<string, number>;
  handleCancel: () => void;
  handleSubmit: (values: Record<string, number>) => void;
}>;

export type MeasureDefinition = TaskDecorated & {
  // Auto-generated from key : /measures/:key
  to: string;

  measureKeys: string[];

  // Description
  description: string;

  numberPerDefault: number;
  Component: MeasureComponent;
};
