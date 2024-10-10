import React, { useMemo } from "react";
import { CenteredCard, Button } from "../../../../components";
import { RunWithExtra } from "./use-play-active";
import { ReviewResultsRow } from "./ReviewResultsRow";

interface FinishedViewProps {
  name: string;
  results: RunWithExtra[];
  handleToggleSelection: (index: number) => void;
  handleConclude: () => void;
}

export const ReviewResults: React.FC<FinishedViewProps> = ({
  name,
  results,
  handleToggleSelection,
  handleConclude,
}) => {
  const numSelected = useMemo(
    () => results.filter((r) => r.selected).length,
    [results]
  );
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <CenteredCard title={`Finished ${name}`}>
        <div className="text-2xl font-bold text-teal-600 mb-6">
          Measurement Complete
        </div>
        <div className="space-y-2 gap-0.5">
          {results.map((r, index) => (
            <ReviewResultsRow
              key={index}
              result={r}
              index={index}
              handleToggleSelection={handleToggleSelection}
            />
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleConclude}
            className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Save {numSelected} selected
          </Button>
        </div>
      </CenteredCard>
    </div>
  );
};
