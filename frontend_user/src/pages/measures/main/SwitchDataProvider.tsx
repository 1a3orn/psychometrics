import React from "react";

import { MeasureDefinition } from "../types";

import {
  useSwitchOnState,
  UseMeasuresStateReturn,
} from "./use-switch-on-state";

export const SwitchDataContext = React.createContext<UseMeasuresStateReturn>(
  {} as UseMeasuresStateReturn
);

export const SwitchDataProvider = ({
  children,
  measure,
}: {
  children: React.ReactNode;
  measure: MeasureDefinition;
}) => {
  const data = useSwitchOnState(measure);
  return (
    <SwitchDataContext.Provider value={data}>
      {children}
    </SwitchDataContext.Provider>
  );
};
