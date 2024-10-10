import { TaskDecorated } from "../../shared-automatic";

export type SubmitValue = {
  key: string;
  value: number;
  displayLabel: string;
  displayValue: string;
};
export type SubmitValues = Array<SubmitValue>;

export const measuresPrettyToMeasures = (msr: SubmitValues) => {
  return Object.fromEntries(msr.map((m) => [m.key, m.value]));
};

export type MeasureComponent = React.ComponentType<{
  currentIndex: number;
  totalCount: number;
  priorRun?: Record<string, number>;
  handleCancel: () => void;
  handleSubmit: (values: SubmitValues) => void;
  lastRun: boolean;
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
