import { Pill } from "./Pill";
import { Category } from "../pages/measures";

interface PillCategoryProps {
  category: Category;
}

export const textFromCategory = (category: Category) => {
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

const getColorFromCategory = (category: Category) => {
  if (category === "test") {
    return "bg-teal-500";
  }
  if (category === "processing_speed") {
    return "bg-blue-500";
  }
  return "bg-gray-500";
};

export const PillCategory: React.FC<PillCategoryProps> = ({ category }) => {
  return <Pill className={getColorFromCategory(category)}>{textFromCategory(category)}</Pill>;
};
