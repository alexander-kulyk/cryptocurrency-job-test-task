import type { IApiError } from "./types";

export const selectApiErrors = (state: RootState): IApiError[] =>
  state.apiError.errors;

export const selectHasApiErrors = (state: RootState): boolean =>
  state.apiError.errors.length > 0;
