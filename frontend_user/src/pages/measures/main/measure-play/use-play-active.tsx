import { useCallback, useState, useMemo, useContext } from "react";

import {
  MeasureDefinition,
  SubmitValues,
  measuresPrettyToMeasures,
} from "../../types";
import { MeasuresMasterDataContext } from "../MainDataProvider";
import { SwitchDataContext } from "../SwitchDataProvider";
import { Run } from "./types";
import { PlaySwitchContext } from "./PlaySwitchProvider";

export type RunWithExtra = Omit<Run, "measures"> & {
  measuresPretty: SubmitValues;
  selected: boolean;
};

export const usePlayActive = (props: {
  measure: MeasureDefinition;
  iterations: number;
}) => {
  const { handleSetDone } = useContext(PlaySwitchContext);

  const [accumRes, setAccumRes] = useState<Array<RunWithExtra>>([]);

  const [iteration, setIteration] = useState(0);
  const [iterationStartedAt, setIterationStartedAt] = useState(
    new Date().toISOString()
  );

  const lastRun = useMemo(() => {
    return iteration >= props.iterations - 1;
  }, [props.iterations, iteration]);

  const { runs } = useContext(MeasuresMasterDataContext);
  const { setMeasureView } = useContext(SwitchDataContext);

  const priorRun = useMemo(() => {
    if (accumRes.length === 0) {
      if (runs && runs.length > 0) {
        return runs[runs.length - 1].measures;
      } else {
        return undefined;
      }
    } else {
      return measuresPrettyToMeasures(
        accumRes[accumRes.length - 1].measuresPretty
      );
    }
  }, [runs, accumRes]);

  const handleAdvance = useCallback(
    (measuresPretty: SubmitValues) => {
      const curAccumRes = [...accumRes];
      curAccumRes.push({
        key: props.measure.key,
        measuresPretty,
        startedAt: iterationStartedAt,
        endedAt: new Date().toISOString(),
        metadata: {},
        selected: true,
      });
      setAccumRes(curAccumRes);
      if (iteration >= props.iterations - 1) {
        handleSetDone(curAccumRes);
      } else {
        setIteration(iteration + 1);
        setIterationStartedAt(new Date().toISOString());
      }
    },
    [
      iteration,
      props.iterations,
      iterationStartedAt,
      handleSetDone,
      accumRes,
      props.measure.key,
    ]
  );

  return {
    iteration,
    lastRun,
    accumRes,
    priorRun,
    handleHome: () => setMeasureView(),
    handleAdvance,
  };
};
