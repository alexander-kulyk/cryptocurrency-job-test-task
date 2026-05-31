import { baseRtkApi } from '@/07.shared/api';
import type { ISwapPreviewPayload, ISwapPreviewResponse } from '../model';

const PREVIEW_URL = '/api/devgateway/swap/public/preview';

export const swapApi = baseRtkApi.injectEndpoints({
  endpoints: (builder) => ({
    getSwapPreview: builder.mutation<ISwapPreviewResponse, ISwapPreviewPayload>(
      {
        query: (body) => ({ url: PREVIEW_URL, method: 'POST', body }),
      },
    ),
  }),
});

export const { useGetSwapPreviewMutation } = swapApi;
