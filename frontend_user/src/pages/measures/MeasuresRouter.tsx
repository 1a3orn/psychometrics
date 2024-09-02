import React from "react";
import { Route, Routes } from "react-router-dom";

import { ALL_MEASURES } from "./measures";

import { Main } from "./main";

export const MeasuresRouter = () => {
  return (
    <Routes>
      {ALL_MEASURES.map((measure) => (
        <Route key={measure.key} path={`/${measure.key}`} element={<Main measure={measure} />} />
      ))}
    </Routes>
  );
};
