import { useCallback, useState, useMemo } from "react";

import { Run, UseSwitchReturn } from "../use-switch";
import { MeasureDefinition, SubmitValues, measuresPrettyToMeasures } from "../../types";

type StatePlaying = { type: "playing"; startedAt: string; iteration: number };
type StateFinished = { type: "finished"; iteration: number };

export type RunWithExtra = Omit<Run, "measures"> & {
  measuresPretty: SubmitValues;
  selected: boolean;
};

export const usePlaying = (props: UseSwitchReturn & { measure: MeasureDefinition; numberToPlay: number }) => {
  // 1. Store results of the run
  const [accumRes, setAccumRes] = useState<Array<RunWithExtra>>([]);

  // 2. Current state of the run
  const [state, setMode] = useState<StatePlaying | StateFinished>({
    type: "playing",
    startedAt: new Date().toISOString(),
    iteration: 0,
  });

  // 3. Allow selection / unselection of accumulated results
  const handleToggleSelection = useCallback(
    (index: number) => {
      const newAccumRes = [...accumRes];
      newAccumRes[index].selected = !newAccumRes[index].selected;
      setAccumRes(newAccumRes);
    },
    [accumRes]
  );

  const priorRun = useMemo(() => {
    if (accumRes.length === 0) {
      if (props.runs && props.runs.length > 0) {
        return props.runs[props.runs.length - 1].measures;
      } else {
        return undefined;
      }
    } else {
      return measuresPrettyToMeasures(accumRes[accumRes.length - 1].measuresPretty);
    }
  }, [props.runs, accumRes]);

  const handleAdvance = useCallback(
    (measuresPretty: SubmitValues) => {
      if (state.type === "playing") {
        setAccumRes((prev) => [
          ...prev,
          {
            key: props.measure.key,
            measuresPretty,
            startedAt: state.startedAt,
            endedAt: new Date().toISOString(),
            metadata: {},
            selected: true,
          },
        ]);
        if (state.iteration >= props.numberToPlay - 1) {
          setMode({ type: "finished", iteration: state.iteration + 1 });
        } else {
          setMode({ type: "playing", startedAt: new Date().toISOString(), iteration: state.iteration + 1 });
        }
      }
    },
    [state.iteration, props.numberToPlay]
  );

  const handleConclude = useCallback(() => {
    props.handleConclude(
      accumRes
        .filter((r) => r.selected)
        .map((r) => ({
          ...r,
          measures: Object.fromEntries(r.measuresPretty.map((m) => [m.key, m.value])),
        }))
    );
  }, [accumRes, props.handleConclude]);

  return { state, accumRes, priorRun, handleAdvance, handleConclude, handleToggleSelection };
};
