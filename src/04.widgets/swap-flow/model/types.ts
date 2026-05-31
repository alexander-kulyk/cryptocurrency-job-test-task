/** Ordered steps of the multi-step swap flow. */
export type SwapStep =
  | "convert"
  | "recipient"
  | "review"
  | "processing"
  | "done";

/** Ordered list used to drive the segmented progress indicator. */
export const SWAP_STEPS: readonly SwapStep[] = [
  "convert",
  "recipient",
  "review",
  "processing",
  "done",
];

/** A single item in the processing checklist. */
export type ProcessingStageStatus = "pending" | "active" | "done";

export interface IProcessingStage {
  /** Stable key — also used as the i18n key under `swap.processing.stages`. */
  id: "deposit" | "exchange" | "send";
  status: ProcessingStageStatus;
}
