import { TaskDecorated } from "./types";

import { addValidation } from "./tasks-validate";

export const TASKS: TaskDecorated[] = [
  {
    key: "test",
    title: "Test",
    measures: [{ key: "test", title: "Test" }],
  },
  {
    key: "reaction_time",
    title: "Reaction Time (Simple)",
    measures: [{ key: "reaction_time", title: "Reaction Time" }],
  },
  {
    key: "reaction_time_4_choice",
    title: "Reaction Time (4 Choice)",
    measures: [
      { key: "reaction_time", title: "Reaction Time" },
      { key: "accuracy", title: "Accuracy" },
    ],
  },
  {
    key: "corsi_block_tapping",
    title: "Corsi Block Tapping",
    measures: [{ key: "highest_sequence", title: "Highest Sequence" }],
  },
  {
    key: "reverse_digit_span_audio",
    title: "Reverse Digit Span Audio",
    measures: [{ key: "span", title: "Span" }],
  },
  {
    key: "dual_n_back",
    title: "Dual N-Back",
    measures: [
      { key: "n_back", title: "N Back" },
      { key: "accuracy_total", title: "Accuracy Total" },
      { key: "accuracy_letter", title: "Accuracy Letter" },
      { key: "accuracy_position", title: "Accuracy Position" },
    ],
  },
].map(addValidation);

export const TASK_KEYS = TASKS.map((task) => task.key);
