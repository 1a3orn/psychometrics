import { TaskDecorated } from "../../shared-automatic/types";

export type MeasureComponent = React.ComponentType<{
  priorRun?: Record<string, number>;
  handleCancel: () => void;
  handleSubmit: (values: Record<string, number>) => void;
}>;

export type Category = "test" | "processing_speed" | "working_memory";

export type MeasureDefinition = TaskDecorated & {
  // Auto-generated from key : /measures/:key
  to: string;

  measureKeys: string[];

  categories: Category[];

  // Description
  description: string;

  numberPerDefault: number;
  Component: MeasureComponent;
};
