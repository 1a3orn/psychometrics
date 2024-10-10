import React from "react";
import { GreyLink } from "../../../../components";
import { RunWithExtra } from "./use-playing";

interface ReviewResultRowProps {
  result: RunWithExtra;
  index: number;
  handleToggleSelection: (index: number) => void;
}

export const ReviewResultsRow: React.FC<ReviewResultRowProps> = ({ result, index, handleToggleSelection }) => {
  const textColor = result.selected ? "text-gray-600" : "text-gray-400";
  return (
    <div className={`${textColor} w-full`}>
      <div className="flex flex-row justify-between gap-4 w-full">
        <div className="flex flex-row gap-4">
          <span className="text-sm mr-2">{index + 1}.</span>
          {result.measuresPretty.map((m, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <span className="font-medium">{m.displayLabel}:</span>
              <span className="font-semibold">{m.displayValue}</span>
            </div>
          ))}
        </div>
        <GreyLink
          handleClick={() => handleToggleSelection(index)}
          className={`text-sm ml-auto ${textColor}`}
          text={result.selected ? "Unselect" : "Select"}
        />
      </div>
    </div>
  );
};
