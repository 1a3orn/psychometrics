import React from "react";

import { MeasureComponent } from "../types";

export const Unfinished: MeasureComponent = ({ handleCancel, handleSubmit }) => {
  const handleSubmitInner = () => {
    handleSubmit([
      {
        key: "test",
        value: Math.floor(Math.random() * 10),
        displayLabel: "Test",
        displayValue: Math.floor(Math.random() * 10).toString(),
      },
    ]);
  };

  return (
    <div style={{ backgroundColor: "red" }}>
      Test
      <button onClick={handleCancel}>Cancel</button>
      <button onClick={handleSubmitInner}>Submit</button>
    </div>
  );
};
