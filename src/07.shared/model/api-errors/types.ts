/** Consistent, UI-agnostic shape every API error is normalized into. */
export interface IApiError {
  /** Stable client id so the list can dedupe / remove a single entry. */
  id: string;
  /** HTTP status or an RTK Query error kind (e.g. "FETCH_ERROR"). */
  status: number | string;
  /** Human-readable message extracted from the response or transport. */
  message: string;
  /** Endpoint name that produced the error, when available. */
  endpoint?: string;
}

export interface IApiErrorState {
  errors: IApiError[];
}
