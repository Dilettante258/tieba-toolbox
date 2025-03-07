export type ErrorRes = {error: string}

export function isErrorData(
  value:unknown
):value is {error: string} {
  return typeof value === 'object' && value !== null && 'error' in value;
}
