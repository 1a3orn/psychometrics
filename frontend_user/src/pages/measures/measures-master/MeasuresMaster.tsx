import { MeasureDefinition } from "../types";

import { PageMain, Navbar } from "../../../components";
import { useMeasuresMaster, UseMeasuresMasterReturn } from "./use-measures-master";
import { View } from "./View";
import { ViewOne } from "./ViewOne";
import { ViewMany } from "./ViewMany";

export const MeasuresMaster = ({ measure }: { measure: MeasureDefinition }) => {
  const props = useMeasuresMaster(measure);
  return (
    <PageMain>
      <Navbar title={measure.title} />
      <SwitchOnState {...props} measure={measure} />
    </PageMain>
  );
};

export const SwitchOnState = (props: UseMeasuresMasterReturn & { measure: MeasureDefinition }) => {
  switch (props.state.type) {
    case "loading":
      return <div>Loading...</div>;
    case "home":
      return <View {...props} />;
    case "one":
      return <ViewOne {...props} />;
    case "many":
      return <ViewMany {...props} />;
  }
};
