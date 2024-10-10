import { useNavigate } from "react-router-dom";
import { UseSwitchReturn } from "../use-switch";
import { MeasureDefinition } from "../../types";

export const useView = (props: UseSwitchReturn & { measure: MeasureDefinition }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const { runs } = props;

  const mappedData = runs.map((run) => {
    const base: Record<string, number | string> = { startedAt: new Date(run.startedAt).getTime() };
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
