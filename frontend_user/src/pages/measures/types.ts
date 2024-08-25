export type MeasureKeys = `reaction-time` | `choosing-reaction-time`;

export type MeasureComponent = React.ComponentType<{
  handleCancel: () => void;
  handleSubmit: (values: Record<string, number>) => void;
}>;

export type MeasureDefinition = {
  // Needs to match up with db
  key: string;

  // Auto-generated from key : /measures/:key
  to: string;

  // Title and description are used in the UI
  title: string;
  description: string;

  // Number / key of measurements to take
  measures: string[];

  numberPerDefault: number;
  Component: MeasureComponent;
};
