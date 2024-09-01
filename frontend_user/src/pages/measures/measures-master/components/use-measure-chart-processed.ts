import { useMemo } from "react";

type ChunkingOption = "none" | "minute" | "hour" | "day";

export const getChunkSize = (chunkingOption: ChunkingOption): number => {
  switch (chunkingOption) {
    case "minute":
      return 60000;
    case "hour":
      return 3600000;
    case "day":
      return 86400000;
    default:
      return 0;
  }
};

export const chunkData = (
  data: Record<string, number | string>[],
  xAxisDataKey: string,
  yAxisDataKeys: string[],
  chunkSize: number
): Record<number, Record<string, number>> => {
  const chunkedData: Record<number, Record<string, number>> = {};

  data.forEach((item) => {
    const timestamp = Number(item[xAxisDataKey]);
    if (isNaN(timestamp)) return;

    const chunkStart = Math.floor(timestamp / chunkSize) * chunkSize;
    if (!chunkedData[chunkStart]) {
      chunkedData[chunkStart] = { [xAxisDataKey]: chunkStart };
      yAxisDataKeys.forEach((key) => (chunkedData[chunkStart][key] = 0));
    }

    yAxisDataKeys.forEach((key) => {
      const value = Number(item[key]);
      if (!isNaN(value)) {
        chunkedData[chunkStart][key] += value;
      }
    });
  });

  return chunkedData;
};

export const processChunkedData = (
  data: Record<string, number | string>[],
  chunkedData: Record<number, Record<string, number>>,
  xAxisDataKey: string,
  yAxisDataKeys: string[],
  chunkSize: number
): Record<string, number>[] => {
  return Object.values(chunkedData).map((chunk) => {
    const count = data.filter(
      (item) =>
        Number(item[xAxisDataKey]) >= chunk[xAxisDataKey] &&
        Number(item[xAxisDataKey]) < chunk[xAxisDataKey] + chunkSize
    ).length;

    yAxisDataKeys.forEach((key) => {
      chunk[key] = Number((chunk[key] / count).toFixed(2));
    });

    return chunk;
  });
};

export const useChartData = (
  data: Record<string, number | string>[],
  xAxisDataKey: string,
  yAxisDataKeys: string[],
  chunkingOption: ChunkingOption
) => {
  return useMemo(() => {
    if (chunkingOption === "none") return data;

    const chunkSize = getChunkSize(chunkingOption);
    const chunkedData = chunkData(data, xAxisDataKey, yAxisDataKeys, chunkSize);
    return processChunkedData(data, chunkedData, xAxisDataKey, yAxisDataKeys, chunkSize);
  }, [data, xAxisDataKey, yAxisDataKeys, chunkingOption]);
};
