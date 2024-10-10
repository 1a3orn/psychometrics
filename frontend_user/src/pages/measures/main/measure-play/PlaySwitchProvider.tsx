import { createContext } from "react";

import { MeasureDefinition } from "../../types";
import { usePlaySwitch, PlaySwitchContextType } from "./use-play-switch";

export const PlaySwitchContext = createContext<PlaySwitchContextType>(
  {} as PlaySwitchContextType
);

export const PlaySwitchProvider = (props: {
  measure: MeasureDefinition;
  iterations: number;
  children: React.ReactNode;
}) => {
  const values = usePlaySwitch({
    measure: props.measure,
    iterations: props.iterations,
  });
  return (
    <PlaySwitchContext.Provider value={values}>
      {props.children}
    </PlaySwitchContext.Provider>
  );
};
