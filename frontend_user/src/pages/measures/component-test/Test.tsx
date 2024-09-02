import React, { useState } from "react";

import { MeasureComponent } from "../types";

export const Test: MeasureComponent = ({ priorRun, handleCancel, handleSubmit }) => {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 10);
    setRandomNumber(newRandomNumber);
  };

  const handleSaveResult = () => {
    if (randomNumber !== null) {
      handleSubmit({
        test: randomNumber,
      });
      setRandomNumber(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Test</h1>
        <div className="flex flex-col gap-4">
          {randomNumber === null ? (
            <button
              onClick={generateRandomNumber}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            >
              Generate Random Number
            </button>
          ) : (
            <>
              <p className="text-center text-xl mb-4">Random Number: {randomNumber}</p>
              <button
                onClick={handleSaveResult}
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
              >
                Save Result
              </button>
            </>
          )}
          <button
            onClick={handleCancel}
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
