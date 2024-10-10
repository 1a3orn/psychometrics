import { useContext } from "react";

import { MeasureDefinition } from "../types";
import { SwitchDataContext, SwitchDataProvider } from "./SwitchDataProvider";

import { MeasureView } from "./measure-view";
import { MeasurePlay } from "./measure-play";

export const Switch = ({ measure }: { measure: MeasureDefinition }) => (
  <SwitchDataProvider measure={measure}>
    <InnerSwitch measure={measure} />
  </SwitchDataProvider>
);

const InnerSwitch = ({ measure }: { measure: MeasureDefinition }) => {
  const props = useContext(SwitchDataContext);
  switch (props.state.type) {
    case "view":
      return <MeasureView measure={measure} />;
    case "play":
      return (
        <MeasurePlay measure={measure} iterations={props.state.iterations} />
      );
  }
};
