import { Result, Task, TaskDecorated } from "./types";

export const addValidation = (task: Task): TaskDecorated => {
  const measures = task.measures;

  const validateObject = (value: any): Result<Record<string, number>> => {
    if (value === null || value === undefined) {
      return { success: false, error: "No value provided" };
    }

    if (typeof value !== "object") {
      return { success: false, error: "Invalid value" };
    }

    for (const measure of measures) {
      if (!(measure.key in value)) {
        return { success: false, error: `Missing measure: ${measure.key}` };
      }
    }

    // Check if all the measures are numbers
    for (const measure of measures) {
      if (typeof value[measure.key] !== "number") {
        return { success: false, error: `Invalid measure: ${measure.key}` };
      }
    }

    // Return the measures
    const result: Record<string, number> = {};
    for (const measure of measures) {
      if (measure.key in value) {
        result[measure.key] = value[measure.key];
      }
    }

    return { success: true, value: result };
  };

  const validateArray = (value: any): Result<Array<{ key: string; number: number }>> => {
    if (!Array.isArray(value)) {
      return { success: false, error: "Invalid value" };
    }

    // Make sure each element in the array has a key and value
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      if (typeof item !== "object" || item === null) {
        return { success: false, error: "Invalid item -- not an object" };
      }
      const measuresKeys = measures.map((measure) => measure.key);
      if (!measuresKeys.includes(item.key)) {
        return { success: false, error: `Invalid item -- not in measures: ${item.key}` };
      }
      if (typeof item.key !== "string") {
        return { success: false, error: `Invalid item -- not a string: ${item.key}` };
      }
      if (typeof item.number !== "number") {
        return { success: false, error: `Invalid item -- not a number: ${item.key}` };
      }
    }

    // Each item in measures should be present in the array
    for (const measure of measures) {
      if (!value.some((item: { key: string }) => item.key === measure.key)) {
        return { success: false, error: `Missing measure: ${measure.key}` };
      }
    }

    // Check for duplicate measures
    const measureKeys = value.map((item: { key: string }) => item.key);
    const uniqueMeasureKeys = new Set(measureKeys);
    if (measureKeys.length !== uniqueMeasureKeys.size) {
      return { success: false, error: "Duplicate measures found" };
    }

    return { success: true, value };
  };

  return { ...task, validateObject, validateArray };
};
