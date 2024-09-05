import React, { useState } from "react";
import { MeasureChart } from "./MeasureChart";
import { useChartData } from "./use-measure-chart-processed";

type ChunkingOption = "none" | "minute" | "hour" | "day";
type XAxisOption = "date" | "index";

interface MeasureChartProcessedProps {
  data: Record<string, number | string>[];
  xAxisDataKey: string;
  yAxisDataKeys: string[];
}

export const MeasureChartProcessed: React.FC<MeasureChartProcessedProps> = ({ data, xAxisDataKey, yAxisDataKeys }) => {
  const [xAxisOption, setXAxisOption] = useState<XAxisOption>("date");
  const [chunkingOption, setChunkingOption] = useState<ChunkingOption>("none");
  const processedData = useChartData(
    data,
    xAxisDataKey,
    yAxisDataKeys,
    xAxisOption === "date" ? chunkingOption : "none"
  );

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-col bg-white p-2 rounded mb-2">
        <div className="flex justify-end space-x-4 mb-2">
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="xAxis"
              value="date"
              checked={xAxisOption === "date"}
              onChange={() => setXAxisOption("date")}
              className="form-radio text-indigo-600"
            />
            <span className="text-sm font-medium">Date X-Axis</span>
          </label>
          <label className="flex items-center space-x-1">
            <input
              type="radio"
              name="xAxis"
              value="index"
              checked={xAxisOption === "index"}
              onChange={() => setXAxisOption("index")}
              className="form-radio text-indigo-600"
            />
            <span className="text-sm font-medium">Index X-Axis</span>
          </label>
        </div>
        {xAxisOption === "date" && (
          <div className="flex justify-end space-x-2 pl-4">
            {(["none", "minute", "hour", "day"] as const).map((option) => (
              <label key={option} className="flex items-center space-x-1">
                <input
                  type="radio"
                  name="chunking"
                  value={option}
                  checked={chunkingOption === option}
                  onChange={() => setChunkingOption(option)}
                  className="form-radio text-indigo-600"
                />
                <span className="text-sm">
                  {option === "none" ? "No Chunking" : `Chunk to ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="flex-grow">
        <MeasureChart
          data={processedData}
          xAxisDataKey={xAxisOption === "date" ? xAxisDataKey : "index"}
          yAxisDataKeys={yAxisDataKeys}
        />
      </div>
    </div>
  );
};
