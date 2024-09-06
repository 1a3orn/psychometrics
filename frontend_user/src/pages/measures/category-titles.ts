import { Category } from "./types";

export const testFromCategory = (category: Category) => {
  if (category === "test") {
    return "Test";
  }
  if (category === "processing_speed") {
    return "Processing Speed";
  }
  if (category === "working_memory") {
    return "Working Memory";
  }
  return "Unknown";
};
