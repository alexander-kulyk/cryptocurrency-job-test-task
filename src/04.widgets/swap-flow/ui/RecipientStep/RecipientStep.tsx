"use client";

import { ArrowLeft, ArrowRight, ClipboardPaste, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/07.shared/ui";
import type { ISwapFlowHandlers, ISwapFlowValues } from "../../model";
import { StepProgress } from "../StepProgress";

export interface IRecipientStepProps {
  values: ISwapFlowValues;
  handlers: ISwapFlowHandlers;
}

const RecipientStep: React.FC<IRecipientStepProps> = ({ values, handlers }) => {
  const t = useTranslations("swap");
  const symbol = values.swap.toAsset?.symbol ?? "";
  const hasInput = values.walletAddress.trim().length > 0;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handlers.changeWallet(event.target.value);
  };

  const handlePaste = (): void => {
    void handlers.pasteWallet();
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-swap-muted">
          {t("recipient.eyebrow")}
        </p>
        <StepProgress step="recipient" label={t("steps.progressLabel")} />
      </div>

      <label
        htmlFor="recipient-address"
        className="mt-6 block text-base font-medium text-swap-foreground"
      >
        {t("recipient.label", { symbol })}
      </label>

      <div className="mt-3 flex items-center gap-2 rounded-swap-field bg-swap-elevated p-2 pl-4">
        <ClipboardPaste className="size-5 shrink-0 text-swap-muted" />
        <input
          id="recipient-address"
          type="text"
          value={values.walletAddress}
          onChange={handleChange}
          placeholder={t("recipient.placeholder", { symbol })}
          aria-invalid={values.walletError}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent py-2 text-base text-swap-foreground outline-none placeholder:text-swap-muted"
        />
        <Button
          variant="light"
          size="md"
          block={false}
          onClick={handlePaste}
          className="shrink-0"
        >
          {t("recipient.paste")}
        </Button>
      </div>

      {values.walletError ? (
        <p className="mt-2 text-sm text-destructive">
          {t("recipient.invalid")}
        </p>
      ) : (
        <p className="mt-2 text-sm text-swap-muted">{t("recipient.helper")}</p>
      )}

      <div className="mt-5 flex items-start gap-3 rounded-swap-field border border-swap-accent/40 bg-swap-accent/10 p-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-swap-accent" />
        <p className="text-sm text-swap-foreground">
          {t.rich("recipient.guarantee", {
            strong: (chunks) => (
              <span className="font-semibold">{chunks}</span>
            ),
          })}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button
          variant="light"
          size="lg"
          block={false}
          onClick={handlers.goToConvert}
          aria-label={t("steps.back")}
          className="aspect-square shrink-0 px-0"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <Button
          variant="primary"
          size="lg"
          block
          onClick={handlers.goToReview}
          disabled={!hasInput}
        >
          {t("recipient.review")}
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </div>
  );
};

export default RecipientStep;
