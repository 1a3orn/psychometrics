export type BlockLocation = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Trial = {
  blockLocations: BlockLocation[];
  sequenceIndices: number[];
};
