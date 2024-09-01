export type ResultSuccess<T> = {
  success: true;
  value: T;
};

export type ResultError = {
  success: false;
  error: string;
};

export type Result<T> = ResultSuccess<T> | ResultError;

export const wrapResult = <T>(value: T): Result<T> => ({
  success: true,
  value,
});

export const errorResult = <T>(error: string): Result<T> => ({
  success: false,
  error,
});
