import React from "react";

import { MeasureComponent } from "../types";

export const Unfinished: MeasureComponent = ({ handleCancel, handleSubmit }) => {
  const handleSubmitInner = () => {
    handleSubmit({
      test: Math.floor(Math.random() * 10),
    });
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      Test
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmitInner}>Submit</button>
    </div>
  );
};
