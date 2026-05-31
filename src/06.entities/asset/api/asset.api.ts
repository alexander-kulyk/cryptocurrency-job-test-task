import { baseRtkApi } from "@/07.shared/api";
import type { IAssetsQueryArg, IAssetsResponse } from "../model";

// Same-origin path; rewritten to https://api.miex.one/api/v1/public/assets
// by next.config.mjs to avoid browser CORS.
const ASSETS_URL = "/api/miex/assets";

/**
 * Assets endpoint with cursor-style infinite scroll: one cache entry per
 * search term (page is dropped from the cache key) and pages are merged into
 * that entry, so RTK Query owns the accumulated list.
 */
export const assetApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssets: builder.query<IAssetsResponse, IAssetsQueryArg>({
      query: ({ search, page }) => ({
        url: ASSETS_URL,
        params: search ? { search, page } : { page },
      }),
      serializeQueryArgs: ({ queryArgs }) => ({ search: queryArgs.search }),
      merge: (currentCache, incoming, { arg }) => {
        if (arg.page <= 1) {
          return incoming;
        }
        const knownIds = new Set(currentCache.data.map((asset) => asset.id));
        currentCache.data.push(
          ...incoming.data.filter((asset) => !knownIds.has(asset.id)),
        );
        currentCache.currentPage = incoming.currentPage;
        currentCache.hasNextPage = incoming.hasNextPage;
        currentCache.maximumPages = incoming.maximumPages;
      },
      forceRefetch: ({ currentArg, previousArg }) =>
        currentArg?.page !== previousArg?.page ||
        currentArg?.search !== previousArg?.search,
    }),
  }),
});

export const { useGetAssetsQuery } = assetApi;
