import { useNavigate } from "react-router-dom";
import { UseMainReturn } from "./use-main";
import { MeasureDefinition } from "../types";
import { PageContent, CardBase, Button } from "../../../components";
import { MeasureChartProcessed } from "./components";
import { DownloadCSVLink } from "./ViewDownload";
export const View = (props: UseMainReturn & { measure: MeasureDefinition }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

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
      <CardBase
        greyChildren={
          <div className="flex flex-col gap-1">
            {/* Small back text link */}
            <div className="text-gray-500 text-sm cursor-pointer" onClick={handleBack}>
              Back
            </div>
            <div className="text-xl font-bold pb-2">{props.measure.title}</div>
            <div className="text-gray-500">{props.measure.description}</div>
          </div>
        }
      >
        <div className="h-80 w-full">
          <DownloadCSVLink measureKey={props.measure.key} />
          <MeasureChartProcessed data={mappedData} xAxisDataKey="startedAt" yAxisDataKeys={props.measure.measureKeys} />
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={props.handleStartOne}>Do one exercise</Button>
          <Button onClick={props.handleStartMany}>Do {props.measure.numberPerDefault} in a row</Button>
        </div>
      </CardBase>
    </PageContent>
  );
};
