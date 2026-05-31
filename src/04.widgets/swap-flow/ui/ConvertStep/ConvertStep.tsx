"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { SwapSwitchButton } from "@/05.features";
import type { IAsset } from "@/06.entities";
import { Button } from "@/07.shared/ui";
import {
  formatUsd,
  isUsdStable,
  type ISwapFlowHandlers,
  type ISwapFlowValues,
} from "../../model";
import { FlowField } from "../FlowField";
import { StepProgress } from "../StepProgress";

export interface IConvertStepProps {
  values: ISwapFlowValues;
  handlers: ISwapFlowHandlers;
  onOpenSend: () => void;
  onOpenReceive: () => void;
}

const ConvertStep: React.FC<IConvertStepProps> = ({
  values,
  handlers,
  onOpenSend,
  onOpenReceive,
}) => {
  const t = useTranslations("swap");
  const { swap } = values;

  const canSwitch = Boolean(swap.fromAsset && swap.toAsset);
  const equivalent = swap.preview?.estimatedUsdtEquivalent;

  const computeUsd = (
    asset: IAsset | null,
    amount: string,
  ): string | null => {
    if (isUsdStable(asset?.symbol)) {
      return formatUsd(amount);
    }
    return formatUsd(equivalent);
  };

  const sendUsd = computeUsd(swap.fromAsset, swap.fromAmount);
  const receiveUsd = computeUsd(swap.toAsset, swap.toAmount);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-swap-muted">
          {t("steps.convert.eyebrow")}
        </p>
        <StepProgress step="convert" label={t("steps.progressLabel")} />
      </div>

      <div className="relative mt-5">
        <div className="flex flex-col gap-2">
          <FlowField
            label={t("youSend")}
            asset={swap.fromAsset}
            onOpenSelect={onOpenSend}
            selectLabel={t("dropdown.triggerSend")}
            amount={swap.fromAmount}
            onAmountChange={handlers.swap.changeFromAmount}
            amountAriaLabel={t("youSend")}
            usdEstimate={sendUsd}
            placeholder={t("dropdown.placeholder")}
          />
          <FlowField
            label={t("youReceive")}
            asset={swap.toAsset}
            onOpenSelect={onOpenReceive}
            selectLabel={t("dropdown.triggerReceive")}
            amount={swap.toAmount}
            onAmountChange={handlers.swap.changeToAmount}
            amountAriaLabel={t("youReceive")}
            usdEstimate={receiveUsd}
            placeholder={t("dropdown.placeholder")}
          />
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <SwapSwitchButton
            onSwitch={handlers.swap.switchAssets}
            label={t("switch")}
            disabled={!canSwitch}
          />
        </div>
      </div>

      {swap.previewFailed ? (
        <p className="mt-3 text-center text-sm text-destructive">
          {t("previewUnavailable")}
        </p>
      ) : null}

      <Button
        variant="primary"
        size="lg"
        block
        onClick={handlers.goToRecipient}
        disabled={!swap.confirmEnabled}
        className="mt-5"
      >
        {t("steps.continue")}
        <ArrowRight className="size-5" />
      </Button>
    </div>
  );
};

export default ConvertStep;
