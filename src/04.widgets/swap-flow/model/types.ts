export type SwapStep =
  | "convert"
  | "recipient"
  | "review"
  | "processing"
  | "done";

export const SWAP_STEPS: readonly SwapStep[] = [
  "convert",
  "recipient",
  "review",
  "processing",
  "done",
];

export type ProcessingStageStatus = "pending" | "active" | "done";

export interface IProcessingStage {
  id: "deposit" | "exchange" | "send";
  status: ProcessingStageStatus;
}
