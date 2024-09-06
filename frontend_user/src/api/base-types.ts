export type Run = {
  id?: string | null;
  key: string;
  startedAt: string;
  endedAt: string;
};

export type Measure = {
  key: string;
  number: number;
};
