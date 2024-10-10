import { useCallback, useState, useContext } from "react";

import { MeasureDefinition, SubmitValues } from "../../types";
import { MeasuresMasterDataContext } from "../MainDataProvider";
import { schemaRun } from "../../../../shared-automatic/schemas";
import { useAuthAwareDataProvider } from "../../../../contexts";
import { SwitchDataContext } from "../SwitchDataProvider";
import { Run } from "./types";
import { PlaySwitchContext } from "./PlaySwitchProvider";

export type RunWithExtra = Omit<Run, "measures"> & {
  measuresPretty: SubmitValues;
  selected: boolean;
};

export const usePlayDone = (props: {
  measure: MeasureDefinition;
  iterations: number;
}) => {
  const { state } = useContext(PlaySwitchContext);

  if (state.state !== "done") {
    throw new Error("usePlayDone can only be used when state is done");
  }

  const [toUpload, setToUpload] = useState<RunWithExtra[]>(state.testResults);

  const { refresh } = useContext(MeasuresMasterDataContext);
  const { fncs } = useAuthAwareDataProvider();
  const { setMeasureView } = useContext(SwitchDataContext);

  const handleToggleSelection = useCallback(
    (index: number) => {
      const toUploadNew = [...toUpload];
      toUploadNew[index].selected = !toUploadNew[index].selected;
      setToUpload(toUploadNew);
    },
    [toUpload]
  );

  const handleConclude = useCallback(async () => {
    const measures = toUpload
      .filter((r) => r.selected)
      .map((r) => ({
        ...r,
        measures: Object.fromEntries(
          r.measuresPretty.map((m) => [m.key, m.value])
        ),
      }));
    const validated = schemaRun.array().parse(measures);
    await fncs.postRuns(validated);
    setMeasureView();
    await refresh();
  }, [refresh, fncs, setMeasureView, toUpload]);

  return {
    toUpload,
    handleHome: () => setMeasureView(),
    handleConclude,
    handleToggleSelection,
  };
};
