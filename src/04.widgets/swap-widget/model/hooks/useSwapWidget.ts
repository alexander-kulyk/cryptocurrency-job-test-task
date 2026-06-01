import { useCallback, useRef, useState } from "react";
import {
  assetApi,
  useGetAssetsQuery,
  useGetSwapPreviewMutation,
  type IAsset,
  type ISwapPreviewPayload,
  type ISwapPreviewResponse,
  type SwapDirection,
} from "@/06.entities";
import {
  useAbortOnUnmount,
  useAppDispatch,
  useThrottledCallback,
} from "@/07.shared/hooks";
import { formatDecimal } from "@/07.shared/lib";

const PREVIEW_THROTTLE_MS = 600;
const DEFAULT_FROM_SYMBOL = "USDT";
const DEFAULT_TO_SYMBOL = "BTC";
const BALANCE_TYPE: ["main", "trade"] = ["main", "trade"];

const isValidAmount = (value: string): boolean => {
  const parsed = Number(value);
  return value.trim() !== "" && Number.isFinite(parsed) && parsed > 0;
};

const buildPayload = (
  direction: SwapDirection,
  amount: string,
  from: IAsset | null,
  to: IAsset | null,
): ISwapPreviewPayload | null => {
  if (!from || !to || from.id === to.id || !isValidAmount(amount)) {
    return null;
  }
  return {
    fromAssetId: from.id,
    toAssetId: to.id,
    direction,
    amount,
    balanceType: BALANCE_TYPE,
  };
};

export interface ISwapWidgetValues {
  fromAsset: IAsset | null;
  toAsset: IAsset | null;
  fromAmount: string;
  toAmount: string;
  isDefaultAssetsLoading: boolean;
  isPreviewLoading: boolean;
  previewFailed: boolean;
  confirmEnabled: boolean;
  isSuccessOpen: boolean;
  preview: ISwapPreviewResponse | null;
}

export interface ISwapWidgetHandlers {
  changeFromAmount: (value: string) => void;
  changeToAmount: (value: string) => void;
  selectFromAsset: (asset: IAsset) => void;
  selectToAsset: (asset: IAsset) => void;
  switchAssets: () => void;
  confirm: () => void;
  acknowledgeSuccess: () => void;
  reset: () => void;
}

export interface IUseSwapWidgetResult {
  values: ISwapWidgetValues;
  handlers: ISwapWidgetHandlers;
}

export const useSwapWidget = (): IUseSwapWidgetResult => {
  const [fromAssetSelected, setFromAssetSelected] = useState<IAsset | null>(
    null,
  );
  const [toAssetSelected, setToAssetSelected] = useState<IAsset | null>(null);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [direction, setDirection] = useState<SwapDirection>("from");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const dispatch = useAppDispatch();
  const requestSeqRef = useRef(0);

  const { data: defaultFromData, isFetching: isDefaultFromFetching } =
    useGetAssetsQuery({
      search: DEFAULT_FROM_SYMBOL,
      page: 1,
    });
  const { data: defaultToData, isFetching: isDefaultToFetching } =
    useGetAssetsQuery({
      search: DEFAULT_TO_SYMBOL,
      page: 1,
    });

  const defaultFrom =
    defaultFromData?.data.find((asset) => asset.symbol === DEFAULT_FROM_SYMBOL) ??
    defaultFromData?.data[0] ??
    null;
  const defaultTo =
    defaultToData?.data.find((asset) => asset.symbol === DEFAULT_TO_SYMBOL) ??
    defaultToData?.data[0] ??
    null;

  const fromAsset = fromAssetSelected ?? defaultFrom;
  const toAsset = toAssetSelected ?? defaultTo;
  const isDefaultAssetsLoading =
    (!fromAssetSelected && isDefaultFromFetching) ||
    (!toAssetSelected && isDefaultToFetching);

  const [triggerPreview, previewState] = useGetSwapPreviewMutation();
  const {
    data: previewData,
    isLoading: isPreviewLoading,
    isError: isPreviewError,
    reset: resetPreview,
  } = previewState;

  const previewRequestRef = useRef<ReturnType<typeof triggerPreview> | null>(
    null,
  );

  const abortPreviewRequest = useCallback((): void => {
    previewRequestRef.current?.abort();
    previewRequestRef.current = null;
  }, []);

  const applyPreview = useCallback(
    (
      payload: ISwapPreviewPayload,
      seq: number,
      data: ISwapPreviewResponse,
    ): void => {
      if (seq !== requestSeqRef.current) {
        return;
      }
      if (payload.direction === "from") {
        setToAmount(formatDecimal(data.estimatedReceive));
      } else {
        setFromAmount(formatDecimal(data.estimatedGive));
      }
    },
    [],
  );

  const previewWorker = useCallback(
    async (payload: ISwapPreviewPayload, seq: number): Promise<void> => {
      abortPreviewRequest();
      const request = triggerPreview(payload);
      previewRequestRef.current = request;
      try {
        const data = await request.unwrap();
        applyPreview(payload, seq, data);
      } catch {
      } finally {
        if (previewRequestRef.current === request) {
          previewRequestRef.current = null;
        }
      }
    },
    [triggerPreview, applyPreview, abortPreviewRequest],
  );

  const runPreview = useThrottledCallback(previewWorker, PREVIEW_THROTTLE_MS);

  useAbortOnUnmount(() => {
    runPreview.cancel();
    abortPreviewRequest();
    dispatch(
      assetApi.util.getRunningQueryThunk("getAssets", {
        search: DEFAULT_FROM_SYMBOL,
        page: 1,
      }),
    )?.abort();
    dispatch(
      assetApi.util.getRunningQueryThunk("getAssets", {
        search: DEFAULT_TO_SYMBOL,
        page: 1,
      }),
    )?.abort();
  });

  const requestPreview = useCallback(
    (
      nextDirection: SwapDirection,
      amount: string,
      from: IAsset | null,
      to: IAsset | null,
      onInvalid?: () => void,
    ): void => {
      requestSeqRef.current += 1;
      const payload = buildPayload(nextDirection, amount, from, to);
      if (payload) {
        abortPreviewRequest();
        resetPreview();
        runPreview(payload, requestSeqRef.current);
      } else {
        runPreview.cancel();
        abortPreviewRequest();
        resetPreview();
        onInvalid?.();
      }
    },
    [runPreview, resetPreview, abortPreviewRequest],
  );

  const changeFromAmount = useCallback(
    (value: string): void => {
      setFromAmount(value);
      setDirection("from");
      requestPreview("from", value, fromAsset, toAsset, () => setToAmount(""));
    },
    [fromAsset, toAsset, requestPreview],
  );

  const changeToAmount = useCallback(
    (value: string): void => {
      setToAmount(value);
      setDirection("to");
      requestPreview("to", value, fromAsset, toAsset, () => setFromAmount(""));
    },
    [fromAsset, toAsset, requestPreview],
  );

  const resetAmounts = useCallback((): void => {
    setFromAmount("");
    setToAmount("");
    setDirection("from");
    requestSeqRef.current += 1;
    runPreview.cancel();
    abortPreviewRequest();
    resetPreview();
  }, [runPreview, resetPreview, abortPreviewRequest]);

  const selectFromAsset = useCallback(
    (asset: IAsset): void => {
      setFromAssetSelected(asset);
      resetAmounts();
    },
    [resetAmounts],
  );

  const selectToAsset = useCallback(
    (asset: IAsset): void => {
      setToAssetSelected(asset);
      resetAmounts();
    },
    [resetAmounts],
  );

  const switchAssets = useCallback((): void => {
    if (!fromAsset || !toAsset) {
      return;
    }
    const nextFrom = toAsset;
    const nextTo = fromAsset;
    setFromAssetSelected(nextFrom);
    setToAssetSelected(nextTo);
    const amount = direction === "from" ? fromAmount : toAmount;
    requestPreview(direction, amount, nextFrom, nextTo);
  }, [fromAsset, toAsset, direction, fromAmount, toAmount, requestPreview]);

  const confirm = useCallback((): void => {
    setIsSuccessOpen(true);
  }, []);

  const reset = useCallback((): void => {
    setFromAssetSelected(null);
    setToAssetSelected(null);
    setFromAmount("");
    setToAmount("");
    setDirection("from");
    requestSeqRef.current += 1;
    runPreview.cancel();
    abortPreviewRequest();
    resetPreview();
  }, [runPreview, resetPreview, abortPreviewRequest]);

  const acknowledgeSuccess = useCallback((): void => {
    setIsSuccessOpen(false);
    reset();
  }, [reset]);

  const samePair = Boolean(
    fromAsset && toAsset && fromAsset.id === toAsset.id,
  );
  const confirmEnabled =
    Boolean(previewData) &&
    !isPreviewLoading &&
    fromAmount.trim() !== "" &&
    toAmount.trim() !== "" &&
    !samePair;

  return {
    values: {
      fromAsset,
      toAsset,
      fromAmount,
      toAmount,
      isDefaultAssetsLoading,
      isPreviewLoading,
      previewFailed: isPreviewError,
      confirmEnabled,
      isSuccessOpen,
      preview: previewData ?? null,
    },
    handlers: {
      changeFromAmount,
      changeToAmount,
      selectFromAsset,
      selectToAsset,
      switchAssets,
      confirm,
      acknowledgeSuccess,
      reset,
    },
  };
};
