"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/07.shared/ui";
import type { ISwapFlowHandlers, ISwapFlowValues } from "../../model";
import { StepProgress } from "../StepProgress";

const checkTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 18,
};

export interface IDoneStepProps {
  values: ISwapFlowValues;
  handlers: ISwapFlowHandlers;
}

const DoneStep: React.FC<IDoneStepProps> = ({ values, handlers }) => {
  const t = useTranslations("swap");
  const reduceMotion = useReducedMotion();
  const { swap } = values;

  const fromSymbol = swap.fromAsset?.symbol ?? "";
  const toSymbol = swap.toAsset?.symbol ?? "";

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-swap-muted">
          {t("done.eyebrow")}
        </p>
        <StepProgress step="done" label={t("steps.progressLabel")} />
      </div>

      <div className="mt-6 flex flex-col items-center text-center">
        <motion.span
          className="flex size-16 items-center justify-center rounded-full bg-swap-accent text-swap-accent-foreground"
          initial={reduceMotion ? false : { scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduceMotion ? { duration: 0 } : checkTransition}
        >
          <Check className="size-8" />
        </motion.span>
        <p className="mt-4 text-xl font-bold text-swap-foreground">
          {t("done.title")}
        </p>
        <p className="mt-1 text-sm text-swap-muted">
          {t.rich("done.message", {
            amount: swap.toAmount,
            symbol: toSymbol,
            strong: (chunks) => (
              <span className="font-semibold text-swap-foreground">
                {chunks}
              </span>
            ),
          })}
        </p>
      </div>

      <dl className="mt-6 rounded-swap-field border border-swap-border bg-swap-elevated p-5 text-base sm:p-6">
        <div className="flex items-center justify-between gap-4 py-1.5">
          <dt className="text-swap-muted">{t("done.sent")}</dt>
          <dd className="font-medium text-swap-foreground">
            {swap.fromAmount} {fromSymbol}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-1.5">
          <dt className="text-swap-muted">{t("done.received")}</dt>
          <dd className="font-medium text-swap-accent">
            {swap.toAmount} {toSymbol}
          </dd>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 border-t border-swap-border pt-4">
          <dt className="text-swap-muted">{t("done.transaction")}</dt>
          <dd>
            <a
              href="#"
              aria-disabled
              className="inline-flex items-center gap-1 font-medium text-swap-accent hover:underline"
            >
              {t("done.viewExplorer")}
              <ExternalLink className="size-3.5" />
            </a>
          </dd>
        </div>
      </dl>

      <Button
        variant="primary"
        size="lg"
        block
        onClick={handlers.restart}
        className="mt-6"
      >
        {t("done.newSwap")}
      </Button>
    </div>
  );
};

export default DoneStep;
