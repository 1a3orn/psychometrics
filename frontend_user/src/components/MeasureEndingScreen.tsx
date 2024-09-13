import React, { useEffect, useRef, useCallback } from "react";
import { round } from "../utils";

export const MeasureEndingScreen = ({
  results,
  handleCancel,
  handleSubmit,
}: {
  results: {
    name: string;
    value: number;
  }[];
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
      <h2 className="text-3xl font-bold mb-4">Results</h2>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        {roundedResults.map((result, index) => (
          <div
            key={result.name}
            className={`flex items-center justify-between p-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
          >
            <h3 className="text-xl font-bold">{result.name}:</h3>
            <p className="text-xl font-bold text-blue-600 ml-2">{result.value}</p>
          </div>
        ))}
        <form onSubmit={handleSubmitInner}>
          <div className="flex justify-center space-x-4 gap-4 mt-4">
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Forget result
            </button>
            <button
              type="submit"
              ref={saveButtonRef}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
