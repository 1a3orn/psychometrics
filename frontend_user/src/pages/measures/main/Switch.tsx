import { MeasureDefinition } from "../types";

import { useSwitch } from "./use-switch";

import { View } from "./view";
import { Playing } from "./playing";

export const Switch = ({ measure }: { measure: MeasureDefinition }) => {
  const props = useSwitch(measure);
  switch (props.state.type) {
    case "home":
      return <View {...props} measure={measure} />;
    case "playing":
      return (
        <Playing
          {...props}
          numberToPlay={props.state.numberToPlay}
          measure={measure}
          handleConclude={props.handleConclude}
        />
      );
  }
};
