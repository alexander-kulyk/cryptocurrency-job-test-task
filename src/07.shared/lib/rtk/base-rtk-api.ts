import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
});

/**
 * Single API slice for the whole app. Features extend it through
 * `baseRtkApi.injectEndpoints(...)` instead of calling `createApi` again.
 * Endpoints are injected from the entity layer, so this stays endpoint-free.
 */
export const baseRtkApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Asset"],
  endpoints: () => ({}),
});

export { baseQuery, fetchBaseQuery };
