import React from "react";
import { useNavigate } from "react-router-dom";
import { LastRun } from "./LastRun";

import { MeasureWithLatestRun } from "../UserMainDataProvider";
import { CardClickable, PillCategory } from "../../../components";

interface TaskCardProps {
  measure: MeasureWithLatestRun;
}

export const TaskCard: React.FC<TaskCardProps> = ({ measure }) => {
  const navigate = useNavigate();
  return (
    <CardClickable
      onClick={() => {
        navigate(measure.to);
      }}
    >
      <div className="p-4 flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-teal-700 mb-2">{measure.title}</h3>
        {/* Pills for the categories */}
        <div className="flex flex-wrap gap-2">
          {measure.categories.map((category) => (
            <PillCategory key={category} category={category} />
          ))}
        </div>
        <LastRun lastRun={measure.latestRun?.date || null} />
      </div>
    </CardClickable>
  );
};
