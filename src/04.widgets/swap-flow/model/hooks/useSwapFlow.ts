import { useCallback, useEffect, useReducer, useRef } from "react";
import {
  useSwapWidget,
  type IUseSwapWidgetResult,
} from "@/04.widgets/swap-widget/model";
import type { IProcessingStage, SwapStep } from "../types";

const STAGE_INTERVAL_MS = 1100;
const COMPLETE_DELAY_MS = 700;

const INITIAL_STAGES: readonly IProcessingStage[] = [
  { id: "deposit", status: "active" },
  { id: "exchange", status: "pending" },
  { id: "send", status: "pending" },
];

interface IFlowState {
  step: SwapStep;
  walletAddress: string;
  walletTouched: boolean;
  stages: IProcessingStage[];
}

type FlowAction =
  | { type: "GO_TO"; step: SwapStep }
  | { type: "SET_WALLET"; value: string }
  | { type: "TOUCH_WALLET" }
  | { type: "ADVANCE_STAGE" }
  | { type: "RESET" };

const createInitialState = (): IFlowState => ({
  step: "convert",
  walletAddress: "",
  walletTouched: false,
  stages: INITIAL_STAGES.map((stage) => ({ ...stage })),
});

const advanceStages = (stages: IProcessingStage[]): IProcessingStage[] => {
  const activeIndex = stages.findIndex((stage) => stage.status === "active");
  if (activeIndex === -1) {
    return stages;
  }
  return stages.map((stage, index) => {
    if (index === activeIndex) {
      return { ...stage, status: "done" };
    }
    if (index === activeIndex + 1) {
      return { ...stage, status: "active" };
    }
    return stage;
  });
};

const flowReducer = (state: IFlowState, action: FlowAction): IFlowState => {
  switch (action.type) {
    case "GO_TO":
      return { ...state, step: action.step };
    case "SET_WALLET":
      return { ...state, walletAddress: action.value };
    case "TOUCH_WALLET":
      return { ...state, walletTouched: true };
    case "ADVANCE_STAGE":
      return { ...state, stages: advanceStages(state.stages) };
    case "RESET":
      return createInitialState();
    default:
      return state;
  }
};

const MIN_WALLET_LENGTH = 8;

const isValidWallet = (value: string): boolean =>
  value.trim().length >= MIN_WALLET_LENGTH;

export interface ISwapFlowValues {
  step: SwapStep;
  walletAddress: string;
  walletError: boolean;
  walletValid: boolean;
  stages: IProcessingStage[];
  swap: IUseSwapWidgetResult["values"];
}

export interface ISwapFlowHandlers {
  swap: IUseSwapWidgetResult["handlers"];
  changeWallet: (value: string) => void;
  pasteWallet: () => Promise<void>;
  goToConvert: () => void;
  goToRecipient: () => void;
  backToRecipient: () => void;
  goToReview: () => void;
  startProcessing: () => void;
  restart: () => void;
}

export interface IUseSwapFlowResult {
  values: ISwapFlowValues;
  handlers: ISwapFlowHandlers;
}

export const useSwapFlow = (): IUseSwapFlowResult => {
  const { values: swapValues, handlers: swapHandlers } = useSwapWidget();
  const [state, dispatch] = useReducer(flowReducer, undefined, createInitialState);

  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback((): void => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const goToConvert = (): void => {
    dispatch({ type: "GO_TO", step: "convert" });
  };

  const goToRecipient = (): void => {
    if (!swapValues.confirmEnabled) {
      return;
    }
    dispatch({ type: "GO_TO", step: "recipient" });
  };

  const backToRecipient = (): void => {
    dispatch({ type: "GO_TO", step: "recipient" });
  };

  const changeWallet = (value: string): void => {
    dispatch({ type: "SET_WALLET", value });
  };

  const pasteWallet = async (): Promise<void> => {
    if (typeof navigator === "undefined" || !navigator.clipboard?.readText) {
      return;
    }
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        dispatch({ type: "SET_WALLET", value: text.trim() });
      }
    } catch {
      // Clipboard read can reject (denied permission / empty) — fall back to
      // manual entry rather than surfacing an error.
    }
  };

  const goToReview = (): void => {
    if (!isValidWallet(state.walletAddress)) {
      dispatch({ type: "TOUCH_WALLET" });
      return;
    }
    dispatch({ type: "GO_TO", step: "review" });
  };

  const startProcessing = (): void => {
    dispatch({ type: "GO_TO", step: "processing" });
  };

  const restart = (): void => {
    clearTimers();
    swapHandlers.reset();
    dispatch({ type: "RESET" });
  };

  useEffect(() => {
    if (state.step !== "processing") {
      return;
    }
    clearTimers();
    const stageCount = INITIAL_STAGES.length;
    for (let index = 1; index < stageCount; index += 1) {
      timersRef.current.push(
        setTimeout(() => {
          dispatch({ type: "ADVANCE_STAGE" });
        }, STAGE_INTERVAL_MS * index),
      );
    }
    timersRef.current.push(
      setTimeout(() => {
        dispatch({ type: "ADVANCE_STAGE" });
        dispatch({ type: "GO_TO", step: "done" });
      }, STAGE_INTERVAL_MS * stageCount + COMPLETE_DELAY_MS),
    );
    return clearTimers;
  }, [state.step, clearTimers]);

  const walletValid = isValidWallet(state.walletAddress);
  const walletError = state.walletTouched && !walletValid;

  return {
    values: {
      step: state.step,
      walletAddress: state.walletAddress,
      walletError,
      walletValid,
      stages: state.stages,
      swap: swapValues,
    },
    handlers: {
      swap: swapHandlers,
      changeWallet,
      pasteWallet,
      goToConvert,
      goToRecipient,
      backToRecipient,
      goToReview,
      startProcessing,
      restart,
    },
  };
};
