import { baseRtkApi } from "@/07.shared/api";
import type { ISwapPreviewPayload, ISwapPreviewResponse } from "../model";

// Same-origin path; rewritten to
// https://devgateway.miex.one/api/swap/public/preview by next.config.mjs.
const PREVIEW_URL = "/api/devgateway/swap/public/preview";

/**
 * Swap preview as a mutation: the request is fired on demand (throttled by the
 * caller) rather than auto-running on every arg change, which matches the
 * "≤1 request / 600ms" requirement and gives explicit reset control.
 */
export const swapApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getSwapPreview: builder.mutation<
      ISwapPreviewResponse,
      ISwapPreviewPayload
    >({
      query: (body) => ({ url: PREVIEW_URL, method: "POST", body }),
    }),
  }),
});

export const { useGetSwapPreviewMutation } = swapApi;
