export type Result<T> =
  | {
      success: true;
      value: T;
    }
  | {
      success: false;
      error: string;
    };

export type Task = {
  key: string;
  title: string;
  measures: { title: string; key: string }[];
};

export type TaskDecorated = Task & {
  validateObject: (value: any) => Result<Record<string, number>>;
  validateArray: (value: any) => Result<Array<{ key: string; number: number }>>;
};
