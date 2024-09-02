import { MeasureDefinition } from "../types";

import { PageMain, Navbar } from "../../../components";
import { MainDataProvider } from "./MainDataProvider";

import { SwitchOnState } from "./MainSwitch";

export const Main = ({ measure }: { measure: MeasureDefinition }) => {
  return (
    <MainDataProvider measure={measure}>
      <PageMain>
        <Navbar title={measure.title} />
        <SwitchOnState measure={measure} />
      </PageMain>
    </MainDataProvider>
  );
};
