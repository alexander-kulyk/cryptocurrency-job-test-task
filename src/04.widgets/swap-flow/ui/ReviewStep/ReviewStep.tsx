"use client";

import { ArrowLeft, ArrowRightLeft, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, TokenIcon } from "@/07.shared/ui";
import {
  formatUsd,
  isUsdStable,
  truncateAddress,
  type ISwapFlowHandlers,
  type ISwapFlowValues,
} from "../../model";
import { StepProgress } from "../StepProgress";

const NETWORK_FEE = "0.25 USDT";

export interface IReviewStepProps {
  values: ISwapFlowValues;
  handlers: ISwapFlowHandlers;
}

const ReviewStep: React.FC<IReviewStepProps> = ({ values, handlers }) => {
  const t = useTranslations("swap");
  const { swap } = values;

  const fromSymbol = swap.fromAsset?.symbol ?? "";
  const toSymbol = swap.toAsset?.symbol ?? "";
  const equivalent = swap.preview?.estimatedUsdtEquivalent;

  const sendUsd = isUsdStable(fromSymbol)
    ? formatUsd(swap.fromAmount)
    : formatUsd(equivalent);
  const receiveUsd = formatUsd(equivalent);

  const rate = swap.preview
    ? t("review.rateValue", {
        fromSymbol,
        toSymbol,
        rate: swap.preview.estimatedRate,
      })
    : "—";

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-swap-muted">
          {t("review.eyebrow")}
        </p>
        <StepProgress step="review" label={t("steps.progressLabel")} />
      </div>

      <div className="mt-5 rounded-swap-field border border-swap-border bg-swap-elevated p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {swap.fromAsset ? (
              <TokenIcon
                src={swap.fromAsset.assetImage}
                symbol={fromSymbol}
                size={36}
              />
            ) : null}
            <div className="min-w-0">
              <p className="text-xs text-swap-muted">{t("youSend")}</p>
              <p className="truncate text-lg font-bold text-swap-foreground">
                {swap.fromAmount} {fromSymbol}
              </p>
            </div>
          </div>
          {sendUsd ? (
            <p className="shrink-0 text-sm text-swap-muted">{sendUsd}</p>
          ) : null}
        </div>

        <div className="my-4 flex items-center gap-4">
          <ArrowRightLeft className="size-4 rotate-90 text-swap-accent" />
          <span className="h-px flex-1 bg-swap-border" aria-hidden />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {swap.toAsset ? (
              <TokenIcon
                src={swap.toAsset.assetImage}
                symbol={toSymbol}
                size={36}
              />
            ) : null}
            <div className="min-w-0">
              <p className="text-xs text-swap-muted">{t("youReceive")}</p>
              <p className="truncate text-lg font-bold text-swap-accent">
                {swap.toAmount} {toSymbol}
              </p>
            </div>
          </div>
          {receiveUsd ? (
            <p className="shrink-0 text-sm text-swap-muted">{receiveUsd}</p>
          ) : null}
        </div>
      </div>

      <dl className="mt-5 rounded-swap-field border border-swap-border bg-swap-elevated p-5 text-base sm:p-6">
        <div className="flex items-center justify-between gap-4 py-1.5">
          <dt className="text-swap-muted">{t("review.rate")}</dt>
          <dd className="text-right font-medium text-swap-foreground">
            {rate}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-1.5">
          <dt className="flex items-center gap-1 text-swap-muted">
            {t("review.networkFee")}
            <Info className="size-3.5" aria-hidden />
          </dt>
          <dd className="text-right font-medium text-swap-foreground">
            {NETWORK_FEE}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4 py-1.5">
          <dt className="text-swap-muted">{t("review.arrival")}</dt>
          <dd className="text-right font-medium text-swap-foreground">
            {t("review.arrivalValue")}
          </dd>
        </div>
        <div className="mt-2 flex items-center justify-between gap-4 border-t border-swap-border pt-4">
          <dt className="text-swap-muted">{t("review.toAddress")}</dt>
          <dd className="text-right font-medium text-swap-foreground">
            {truncateAddress(values.walletAddress)}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex items-center gap-3">
        <Button
          variant="light"
          size="lg"
          block={false}
          onClick={handlers.backToRecipient}
          aria-label={t("steps.back")}
          className="aspect-square shrink-0 px-0"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          variant="primary"
          size="lg"
          block
          onClick={handlers.startProcessing}
        >
          {t("review.confirm")}
        </Button>
      </div>
    </div>
  );
};

export default ReviewStep;
