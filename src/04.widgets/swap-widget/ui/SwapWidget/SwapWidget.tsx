"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ConfirmButton,
  SwapSuccessModal,
  SwapSwitchButton,
} from "@/05.features";
import { useSwapWidget } from "../../model";
import { SwapField, type IAssetDropdownLabels } from "../SwapField";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const SwapWidget: React.FC = () => {
  const t = useTranslations("swap");
  const reduceMotion = useReducedMotion();
  const { values, handlers } = useSwapWidget();

  const cardDuration = reduceMotion ? 0 : 0.4;
  const canSwitch = Boolean(values.fromAsset && values.toAsset);

  const baseDropdownLabels: Omit<IAssetDropdownLabels, "triggerLabel"> = {
    placeholder: t("dropdown.placeholder"),
    searchPlaceholder: t("dropdown.search"),
    loadingLabel: t("dropdown.loading"),
    emptyLabel: t("dropdown.empty"),
    errorLabel: t("dropdown.error"),
  };

  const sendDropdownLabels: IAssetDropdownLabels = {
    ...baseDropdownLabels,
    triggerLabel: t("dropdown.triggerSend"),
  };
  const receiveDropdownLabels: IAssetDropdownLabels = {
    ...baseDropdownLabels,
    triggerLabel: t("dropdown.triggerReceive"),
  };

  return (
    <div className="flex w-full flex-col items-center gap-8">
      <h1 className="text-center text-4xl font-bold text-swap-foreground sm:text-5xl">
        {t("title")}
      </h1>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: cardDuration, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md rounded-swap-card bg-swap-surface p-6 shadow-swap-card sm:p-8"
      >
        <p className="text-sm font-medium text-swap-muted">
          {t("selectCryptocurrency")}
        </p>

        <div className="relative mt-4 rounded-swap-field border border-swap-border">
          <SwapField
            label={t("youSend")}
            selectedAsset={values.fromAsset}
            onSelectAsset={handlers.selectFromAsset}
            amount={values.fromAmount}
            onAmountChange={handlers.changeFromAmount}
            amountAriaLabel={t("youSend")}
            dropdownLabels={sendDropdownLabels}
          />

          <div className="mx-5 border-t border-swap-border" />

          <SwapField
            label={t("youReceive")}
            selectedAsset={values.toAsset}
            onSelectAsset={handlers.selectToAsset}
            amount={values.toAmount}
            onAmountChange={handlers.changeToAmount}
            amountAriaLabel={t("youReceive")}
            dropdownLabels={receiveDropdownLabels}
          />

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <SwapSwitchButton
              onSwitch={handlers.switchAssets}
              label={t("switch")}
              disabled={!canSwitch}
            />
          </div>
        </div>

        {values.previewFailed ? (
          <p className="mt-3 text-center text-sm text-destructive">
            {t("previewUnavailable")}
          </p>
        ) : null}

        <div className="mt-6">
          <ConfirmButton
            label={t("confirm")}
            loadingLabel={t("loading")}
            onConfirm={handlers.confirm}
            disabled={!values.confirmEnabled}
            isLoading={values.isPreviewLoading}
          />
        </div>
      </motion.div>

      <SwapSuccessModal
        isOpen={values.isSuccessOpen}
        fromSymbol={values.fromAsset?.symbol ?? ""}
        fromAmount={values.fromAmount}
        toSymbol={values.toAsset?.symbol ?? ""}
        toAmount={values.toAmount}
        onOk={handlers.acknowledgeSuccess}
      />
    </div>
  );
};

export default SwapWidget;
