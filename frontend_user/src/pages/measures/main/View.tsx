import { UseMainReturn } from "./use-main";
import { MeasureDefinition } from "../types";
import { PageContent, BasicCard, Button } from "../../../components";
import { MeasureChartProcessed } from "./components";

export const View = (props: UseMainReturn & { measure: MeasureDefinition }) => {
  const { userData } = props;

  const mappedData = userData.map((run) => {
    const base: Record<string, number | string> = { startedAt: new Date(run.startedAt).getTime() };
    Object.keys(run.measures).forEach((key) => {
      base[key] = run.measures[key];
    });
    return base;
  });

  return (
    <PageContent>
      <BasicCard title={props.measure.title} subtext={props.measure.description}>
        <div className="h-80 w-full">
          <MeasureChartProcessed data={mappedData} xAxisDataKey="startedAt" yAxisDataKeys={props.measure.measureKeys} />
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={props.handleStartOne}>Do one exercise</Button>
          <Button onClick={props.handleStartMany}>Do {props.measure.numberPerDefault} in a row</Button>
        </div>
      </BasicCard>
    </PageContent>
  );
};
