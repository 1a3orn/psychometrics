import { MeasureDefinition } from "./types";

import { Test } from "./component-test";
import { Unfinished } from "./component-unfinished";

export const ALL_MEASURES: MeasureDefinition[] = [
  {
    key: "test",
    title: "Test",
    description: "This is a test measure, it is used to test the measure component.",
    numberPerDefault: 3,
    measures: ["test"],
    Component: Test,
  },
  {
    key: "reaction-time",
    title: "Reaction Time",
    description: "This is a reaction time measure, it is used to measure the reaction time of the user.",
    numberPerDefault: 5,
    measures: ["reaction-time"],
    Component: Unfinished,
  },
  {
    key: "choosing-reaction-time",
    title: "Chosing Reaction Time",
    description: "This is a choosing reaction time measure, it is used to measure the reaction time of the user.",
    numberPerDefault: 5,
    measures: ["reaction-time", "accuracy"],
    Component: Unfinished,
  },
].map((measure) => ({
  ...measure,
  to: `/measures/${measure.key}`,
}));
