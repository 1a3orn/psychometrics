import React, { useEffect, useRef, useCallback } from "react";
import { round } from "../utils";

import { CenteredCard } from "./CenteredCard";
import { Button } from "./Button";
import { GreyLink } from "./LinkOptions";

export const MeasureEndingScreen = ({
  results,
  currentIndex,
  totalCount,
  handleCancel,
  handleSubmit,
}: {
  results: {
    name: string;
    value: number;
  }[];
  currentIndex?: number;
  totalCount?: number;
  handleCancel: () => void;
  handleSubmit: () => void;
}) => {
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Use a small delay to ensure the button is rendered
    const timer = setTimeout(() => {
      if (saveButtonRef.current) {
        saveButtonRef.current.focus();
      }
    }, 0);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  const handleSubmitInner = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit]
  );

  const roundedResults = results.map((result) => ({
    name: result.name,
    value: round(result.value),
  }));

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen text-center">
      <CenteredCard title="Results">
        {roundedResults.map((result, index) => (
          <div
            key={result.name}
            className={`flex items-center justify-between p-2 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-bold">{result.name}:</h3>
            <p className="text-xl font-bold text-teal-600 ml-2">
              {result.value}
            </p>
          </div>
        ))}
        <form onSubmit={handleSubmitInner}>
          <div className="flex flex-col justify-center space-x-4 gap-4 mt-4">
            <Button type="submit" onClick={handleSubmit} ref={saveButtonRef}>
              Continue ({currentIndex} of {totalCount})
            </Button>
            <GreyLink handleClick={handleCancel} text="Forget All Results" />
          </div>
        </form>
      </CenteredCard>
    </div>
  );
};
