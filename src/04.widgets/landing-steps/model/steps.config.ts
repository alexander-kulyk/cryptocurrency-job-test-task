export type StepTone = "highlight" | "ink";

export interface IStepCard {
  key: string;
  tone: StepTone;
}

export const STEP_CARDS: readonly IStepCard[] = [
  { key: "account", tone: "highlight" },
  { key: "share", tone: "ink" },
] as const;
