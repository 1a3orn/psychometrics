import { Result } from "./types";

import { TASKS } from "./tasks-list";

export const validateAny = (data: {
  key: string;
  measures: any;
}): Result<{ key: string; measures: Record<string, number> }> => {
  // Find the task that matches the key
  const task = TASKS.find((task) => task.key === data.key);
  if (!task) {
    return { success: false, error: "Task not found" };
  }

  // Validate the measures
  const result = task.validate(data.measures);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true, value: { key: data.key, measures: result.value } };
};
