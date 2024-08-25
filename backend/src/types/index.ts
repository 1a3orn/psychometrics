export type Result<T, E = string> =
  | { ok: true; value: T }
  | { ok: false; error: E };

export function wrap<T, E = string>(value: T): Result<T, E> {
    return { value, ok: true };
  }
  
export function unwrap<T, E = string>(result: Result<T, E>): T {
  if (result.ok) {
    return result.value;
  } else {
    throw new Error(typeof result.error === "string" ? result.error  : "Unknown error");
  }
}
  