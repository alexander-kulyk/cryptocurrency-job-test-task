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
  ignoredEndpoints?: string[];
}

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
