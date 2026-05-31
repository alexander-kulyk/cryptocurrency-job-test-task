import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { IApiError } from "./types";

const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError =>
  typeof error === "object" && error !== null && "status" in error;

const isSerializedError = (error: unknown): error is SerializedError =>
  typeof error === "object" &&
  error !== null &&
  ("message" in error || "code" in error || "name" in error);

const extractMessage = (data: unknown): string | null => {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object" && data !== null && "message" in data) {
    const message = (data as { message: unknown }).message;
    if (typeof message === "string") {
      return message;
    }
  }
  return null;
};

/**
 * Transforms any RTK Query / thunk rejection value into the consistent
 * {@link IApiError} shape (without an id) before it reaches the store.
 * Reusable so error handling is never duplicated inside components.
 */
export const normalizeApiError = (
  error: unknown,
  endpoint?: string,
): Omit<IApiError, "id"> => {
  if (isFetchBaseQueryError(error)) {
    const transportMessage =
      "error" in error && typeof error.error === "string"
        ? error.error
        : null;
    return {
      status: error.status,
      message: extractMessage(error.data) ?? transportMessage ?? "Request failed",
      endpoint,
    };
  }

  if (isSerializedError(error)) {
    return {
      status: error.code ?? "UNKNOWN",
      message: error.message ?? "Unexpected error",
      endpoint,
    };
  }

  return { status: "UNKNOWN", message: "Unexpected error", endpoint };
};
