"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { classes } from "@/07.shared/lib";
import { Spinner, TokenIcon } from "@/07.shared/ui";
import type { IProcessingStage, ISwapFlowValues } from "../../model";
import { StepProgress } from "../StepProgress";

const ringTransition: Transition = {
  repeat: Infinity,
  ease: "linear",
  duration: 1.4,
};

export interface IProcessingStepProps {
  values: ISwapFlowValues;
}

const ProcessingStep: React.FC<IProcessingStepProps> = ({ values }) => {
  const t = useTranslations("swap");
  const reduceMotion = useReducedMotion();
  const { swap, stages } = values;

  const summary = t("processing.summary", {
    fromAmount: swap.fromAmount,
    fromSymbol: swap.fromAsset?.symbol ?? "",
    toAmount: swap.toAmount,
    toSymbol: swap.toAsset?.symbol ?? "",
  });

  const renderStageIcon = (stage: IProcessingStage): React.ReactNode => {
    if (stage.status === "done") {
      return (
        <span className="flex size-6 items-center justify-center rounded-full bg-swap-accent text-swap-accent-foreground">
          <Check className="size-3.5" />
        </span>
      );
    }
    if (stage.status === "active") {
      return (
        <span className="flex size-6 items-center justify-center rounded-full border border-swap-accent/40 text-swap-accent">
          <Spinner label={t("processing.title")} className="size-3.5" />
        </span>
      );
    }
    return (
      <span className="size-6 rounded-full border border-swap-border" />
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-swap-muted">
          {t("processing.eyebrow")}
        </p>
        <StepProgress step="processing" label={t("steps.progressLabel")} />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="relative flex size-24 items-center justify-center">
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-swap-accent/30 border-t-swap-accent"
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={reduceMotion ? undefined : ringTransition}
          />
          <span className="flex items-center">
            {swap.fromAsset ? (
              <TokenIcon
                src={swap.fromAsset.assetImage}
                symbol={swap.fromAsset.symbol}
                size={36}
                className="z-10 ring-2 ring-swap-surface"
              />
            ) : null}
            {swap.toAsset ? (
              <TokenIcon
                src={swap.toAsset.assetImage}
                symbol={swap.toAsset.symbol}
                size={36}
                className="-ml-3 ring-2 ring-swap-surface"
              />
            ) : null}
          </span>
        </div>

        <p className="mt-5 text-lg font-bold text-swap-foreground">
          {t("processing.title")}
        </p>
        <p className="mt-1 text-sm text-swap-muted">{summary}</p>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {stages.map((stage) => (
          <li key={stage.id} className="flex items-center gap-3">
            {renderStageIcon(stage)}
            <span
              className={classes(
                "text-sm transition-colors",
                stage.status === "pending"
                  ? "text-swap-muted"
                  : "text-swap-foreground",
              )}
            >
              {t(`processing.stages.${stage.id}`)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProcessingStep;
