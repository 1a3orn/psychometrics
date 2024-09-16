import { MeasureDefinition } from "./types";

import { Test } from "./component-test";
import { ReactionTime } from "./component-reaction-time";
import { CorsiBlockTapping } from "./component-corsi-block-tapping";
import { ReactionTime4Choice } from "./component-reaction-time-4-choice";
import { DualNBack } from "./component-dual-n-back";
import { ReverseDigitSpan } from "./component-reverse-digit-span";
import { OddManOut } from "./component-odd-man-out";
import { TASKS } from "../../shared-automatic";
import { Category } from "./types";

export const ALL_MEASURES: MeasureDefinition[] = [
  {
    matchKey: "test",
    description: "This is a test measure, it is used to test the measure component.",
    shortDescription: "A test measure",
    categories: ["test"] as Category[],
    numberPerDefault: 3,
    Component: Test,
  },
  {
    matchKey: "reaction_time_odd_man_out",
    description: "This is a odd man out measure, it is used to measure the odd man out of the user.",
    shortDescription: "How well you can discern one of four stimuli",
    categories: ["processing_speed"] as Category[],
    numberPerDefault: 1,
    Component: OddManOut,
  },
  {
    matchKey: "reaction_time",
    description: "This is a reaction time measure, it is used to measure the reaction time of the user.",
    shortDescription: "How fast you respond to a stimulus",
    categories: ["processing_speed"] as Category[],
    numberPerDefault: 5,
    Component: ReactionTime,
  },
  {
    matchKey: "reaction_time_4_choice",
    description: "This is a choosing reaction time measure, it is used to measure the reaction time of the user.",
    shortDescription: "How fast you discern one of four stimuli",
    categories: ["processing_speed"] as Category[],
    numberPerDefault: 8,
    Component: ReactionTime4Choice,
  },
  {
    matchKey: "reverse_digit_span_audio",
    description: "asdasd",
    shortDescription: "How well you can repeat a sequence of digits backwards",
    categories: ["working_memory"] as Category[],
    numberPerDefault: 2,
    Component: ReverseDigitSpan,
  },
  {
    matchKey: "corsi_block_tapping",
    description: "This is a Corsi Block Tapping measure.",
    shortDescription: "How well you can remember a sequence of blocks",
    categories: ["working_memory"] as Category[],
    numberPerDefault: 1,
    Component: CorsiBlockTapping,
  },
  {
    matchKey: "dual_n_back",
    description: "This is a dual N-Back measure, it is used to measure the dual N-Back of the user.",
    shortDescription: "How well you can track multiple stimuli",
    categories: ["working_memory"] as Category[],
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
