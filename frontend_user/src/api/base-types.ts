export type Run = {
  id: string;
  createdAt: string;
  startedAt: string;
  endedAt: string;
};

export type Task = {
  key: string;
  name: string;
  measures: string[];
};

export type Measure = {
  key: string;
  number: number;
};
