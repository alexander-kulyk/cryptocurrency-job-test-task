import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { normalizeApiError } from "./normalize";
import { addApiError } from "./slice";

const readEndpointName = (meta: unknown): string | undefined => {
  if (typeof meta !== "object" || meta === null || !("arg" in meta)) {
    return undefined;
  }
  const arg = (meta as { arg: unknown }).arg;
  if (typeof arg === "object" && arg !== null && "endpointName" in arg) {
    const endpointName = (arg as { endpointName: unknown }).endpointName;
    return typeof endpointName === "string" ? endpointName : undefined;
  }
  return undefined;
};

export interface IApiErrorMiddlewareOptions {
  /**
   * Endpoint names whose failures are handled inline by their feature and
   * must NOT raise the global error overlay (e.g. an expected swap-preview
   * "assetNotFound" for an unsupported pair).
   */
  ignoredEndpoints?: string[];
}

/**
 * Builds the global RTK middleware: any rejected RTK Query / thunk action is
 * normalized and pushed into the api-error store, except endpoints listed in
 * `ignoredEndpoints`. Keeps error handling out of components.
 */
export const createApiErrorMiddleware = (
  options: IApiErrorMiddlewareOptions = {},
): Middleware => {
  const ignored = new Set(options.ignoredEndpoints ?? []);

  return (api) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const endpoint = readEndpointName(action.meta);
      if (!endpoint || !ignored.has(endpoint)) {
        api.dispatch(addApiError(normalizeApiError(action.payload, endpoint)));
      }
    }
    return next(action);
  };
};
