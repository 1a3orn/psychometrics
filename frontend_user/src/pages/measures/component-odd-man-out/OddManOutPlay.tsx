import React from "react";
import { Trial } from "./use-odd-man-out";

export const OddManOutPlay: React.FC<{
  trial: Trial;
  trialNumber: number;
  totalTrials: number;
  handleUserResponse: (response: "left" | "right") => void;
}> = ({ trial, trialNumber, totalTrials, handleUserResponse }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h2 className="text-2xl font-bold mb-8">Odd Man Out</h2>
    <div className="flex justify-between w-3/4 mb-8 absolute bg-red-500 h-20 mb-20">
      {trial.objects.map((object, index) => (
        <div
          key={index}
          style={{ left: `calc(${object}% - 40px)`, position: "absolute", width: "80px" }}
          className="w-16 h-16 bg-blue-500 rounded-full text-white font-bold flex items-center justify-center"
        >
          {object}
        </div>
      ))}
    </div>
    <div className="text-4xl font-bold mt-20">{trial.correctAnswer}</div>
    <div className="flex justify-center space-x-8">
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleUserResponse("left")}>
        A (Left)
      </button>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleUserResponse("right")}>
        L (Right)
      </button>
    </div>
    <p className="mt-8">
      Progress: {trialNumber} / {totalTrials}
    </p>
  </div>
);
