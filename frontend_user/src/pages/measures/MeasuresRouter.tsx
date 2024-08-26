import React from "react";
import { Route, Routes } from "react-router-dom";

import { ALL_MEASURES } from "./measures";

import { MeasuresMaster } from "./measures-master";

export const MeasuresRouter = () => {
  console.log("MeasuresRouter");

  return (
    <Routes>
      {ALL_MEASURES.map((measure) => (
        <Route key={measure.key} path={`/${measure.key}`} element={<MeasuresMaster measure={measure} />} />
      ))}
    </Routes>
  );
};
