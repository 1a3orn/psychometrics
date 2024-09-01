import { MeasureDefinition } from "./types";

import { Test } from "./component-test";
import { ReactionTime } from "./component-reaction-time";
import { Unfinished } from "./component-unfinished";
import { DualNBack } from "./component-dual-n-back";
import { TASKS } from "../../shared-automatic";

export const ALL_MEASURES: MeasureDefinition[] = [
  {
    matchKey: "test",
    description: "This is a test measure, it is used to test the measure component.",
    numberPerDefault: 3,
    Component: Test,
  },
  {
    matchKey: "reaction_time",
    description: "This is a reaction time measure, it is used to measure the reaction time of the user.",
    numberPerDefault: 5,
    Component: ReactionTime,
  },
  {
    matchKey: "choosing_reaction_time",
    description: "This is a choosing reaction time measure, it is used to measure the reaction time of the user.",
    numberPerDefault: 5,
    Component: Unfinished,
  },
  {
    matchKey: "dual_n_back",
    description: "This is a dual N-Back measure, it is used to measure the dual N-Back of the user.",
    numberPerDefault: 1,
    Component: DualNBack,
  },
].map((measure) => {
  const matchingTask = TASKS.find((task) => task.key === measure.matchKey);
  if (!matchingTask) {
    throw new Error(`Task ${measure.matchKey} not found`);
  }

  return {
    ...measure,
    ...matchingTask,
    measureKeys: matchingTask.measures.map((measure) => measure.key),
    to: `/measures/${measure.matchKey}`,
  };
});
