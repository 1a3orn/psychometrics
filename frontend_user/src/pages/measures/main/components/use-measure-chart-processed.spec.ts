import { getChunkSize, chunkData, processChunkedData } from "./use-measure-chart-processed";

describe("getChunkSize", () => {
  it("returns correct chunk size for each option", () => {
    expect(getChunkSize("minute")).toBe(60000);
    expect(getChunkSize("hour")).toBe(3600000);
    expect(getChunkSize("day")).toBe(86400000);
    expect(getChunkSize("none")).toBe(0);
  });
});

describe("chunkData", () => {
  it("chunks data correctly", () => {
    const testData = [
      { timestamp: 1000, value: 10 },
      { timestamp: 2000, value: 20 },
      { timestamp: 3000, value: 30 },
    ];
    const result = chunkData(testData, "timestamp", ["value"], 2000);
    expect(result).toEqual({
      0: { timestamp: 0, value: 30 },
      2000: { timestamp: 2000, value: 30 },
    });
  });
});

describe("processChunkedData", () => {
  it("processes chunked data correctly", () => {
    const testData = [
      { timestamp: 1000, value: 10 },
      { timestamp: 2000, value: 20 },
      { timestamp: 3000, value: 30 },
    ];
    const chunkedData = {
      0: { timestamp: 0, value: 30 },
      2000: { timestamp: 2000, value: 30 },
    };
    const result = processChunkedData(testData, chunkedData, "timestamp", ["value"], 2000);
    expect(result).toEqual([
      { timestamp: 0, value: 15 },
      { timestamp: 2000, value: 30 },
    ]);
  });
});
