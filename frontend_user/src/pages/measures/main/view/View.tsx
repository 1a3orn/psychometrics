import { MeasureDefinition } from "../../types";
import { PageContent, CardBase, Button } from "../../../../components";

import { MeasureChartProcessed } from "../components";
import { UseSwitchReturn } from "../use-switch";
import { DownloadCSVLink } from "../ViewDownload";

import { useView } from "./use-view";
export const View = (props: UseSwitchReturn & { measure: MeasureDefinition }) => {
  const { handleBack, mappedData } = useView(props);

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
