import { Task, TaskDecorated } from "./types";

import { addValidation } from "./tasks-validate";

export const TASKS: TaskDecorated[] = [
  {
    key: "test",
    title: "Test",
    measures: [{ key: "test", title: "Test" }],
  },
  {
    key: "reaction_time",
    title: "Reaction Time",
    measures: [{ key: "reaction_time", title: "Reaction Time" }],
  },
  {
    key: "choosing_reaction_time",
    title: "Choosing Reaction Time",
    measures: [
      { key: "reaction_time", title: "Reaction Time" },
      { key: "accuracy", title: "Accuracy" },
    ],
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
