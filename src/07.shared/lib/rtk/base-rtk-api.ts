import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API,
});

export const baseRtkApi = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Asset'],
  endpoints: () => ({}),
});

export { baseQuery, fetchBaseQuery };
