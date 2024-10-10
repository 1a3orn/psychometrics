import { MeasureDefinition } from "../../types";

import { useContext } from "react";
import { PlaySwitchProvider, PlaySwitchContext } from "./PlaySwitchProvider";

import { PlayActive } from "./PlayActive";
import { PlayDone } from "./PlayDone";

type MeasurePlayProps = {
  measure: MeasureDefinition;
  iterations: number;
};

export const MeasurePlay = (props: MeasurePlayProps) => (
  <PlaySwitchProvider {...props}>
    <MeasurePlayInner {...props} />
  </PlaySwitchProvider>
);

export const MeasurePlayInner = (props: MeasurePlayProps) => {
  const { state } = useContext(PlaySwitchContext);
  switch (state.state) {
    case "play":
      return <PlayActive {...props} />;
    case "done":
      return <PlayDone {...props} />;
  }
};
