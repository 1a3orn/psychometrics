import { MeasureDefinition } from "../types";

import { PageMain, Navbar } from "../../../components";
import { MainDataProvider } from "./MainDataProvider";

import { Switch } from "./Switch";

export const Main = ({ measure }: { measure: MeasureDefinition }) => {
  return (
    <MainDataProvider measure={measure}>
      <PageMain>
        <Navbar title={measure.title} />
        <Switch measure={measure} />
      </PageMain>
    </MainDataProvider>
  );
};
