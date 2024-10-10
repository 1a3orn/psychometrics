import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { MeasuresMasterDataContext } from "../MainDataProvider";

export const useMeasureView = () => {
  const { runs } = useContext(MeasuresMasterDataContext);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const mappedData = runs.map((run) => {
    const base: Record<string, number | string> = {
      startedAt: new Date(run.startedAt).getTime(),
    };
    Object.keys(run.measures).forEach((key) => {
      base[key] = run.measures[key];
    });
    return base;
  });

  return {
    handleBack,
    mappedData,
  };
};
