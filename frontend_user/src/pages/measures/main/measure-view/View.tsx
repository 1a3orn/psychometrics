import { MeasureDefinition } from "../../types";
import { PageContent, CardBase, Button } from "../../../../components";

import { MeasureChartProcessed } from "../components";
import { DownloadCSVLink } from "../ViewDownload";

import { useMeasureView } from "./use-measure-view";
import { useContext } from "react";
import { SwitchDataContext } from "../SwitchDataProvider";

export const MeasureView = ({ measure }: { measure: MeasureDefinition }) => {
  const { handleBack, mappedData } = useMeasureView();

  const { setMeasurePlayOne, setMeasurePlayMany } =
    useContext(SwitchDataContext);

  return (
    <PageContent>
      <CardBase
        greyChildren={
          <div className="flex flex-col gap-1">
            {/* Small back text link */}
            <div
              className="text-gray-500 text-sm cursor-pointer"
              onClick={handleBack}
            >
              Back
            </div>
            <div className="text-xl font-bold pb-2">{measure.title}</div>
            <div className="text-gray-500">{measure.description}</div>
          </div>
        }
      >
        <div className="h-80 w-full">
          <DownloadCSVLink measureKey={measure.key} />
          <MeasureChartProcessed
            data={mappedData}
            xAxisDataKey="startedAt"
            yAxisDataKeys={measure.measureKeys}
          />
        </div>
        <div className="flex flex-col gap-4">
          <Button onClick={setMeasurePlayOne}>Do one exercise</Button>
          <Button onClick={setMeasurePlayMany}>
            Do {measure.numberPerDefault} in a row
          </Button>
        </div>
      </CardBase>
    </PageContent>
  );
};
