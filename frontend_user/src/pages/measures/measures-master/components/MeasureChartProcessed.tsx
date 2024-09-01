import React, { useState } from "react";
import { MeasureChart } from "./MeasureChart";
import { useChartData } from "./use-measure-chart-processed";

type ChunkingOption = "none" | "minute" | "hour" | "day";

interface MeasureChartProcessedProps {
  data: Record<string, number | string>[];
  xAxisDataKey: string;
  yAxisDataKeys: string[];
}

export const MeasureChartProcessed: React.FC<MeasureChartProcessedProps> = ({ data, xAxisDataKey, yAxisDataKeys }) => {
  const [chunkingOption, setChunkingOption] = useState<ChunkingOption>("none");
  const processedData = useChartData(data, xAxisDataKey, yAxisDataKeys, chunkingOption);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-end space-x-2 bg-white p-2 rounded mb-2">
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
      <div className="flex-grow">
        <MeasureChart data={processedData} xAxisDataKey={xAxisDataKey} yAxisDataKeys={yAxisDataKeys} />
      </div>
    </div>
  );
};
