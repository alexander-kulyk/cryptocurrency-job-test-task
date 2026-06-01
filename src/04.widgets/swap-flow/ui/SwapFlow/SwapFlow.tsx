"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { AssetSelectModal } from "@/05.features";
import type { IAsset } from "@/06.entities";
import { EASE_OUT } from "@/07.shared/lib";
import { useSwapFlow, type SwapStep } from "../../model";
import { ConvertStep } from "../ConvertStep";
import { DoneStep } from "../DoneStep";
import { ProcessingStep } from "../ProcessingStep";
import { RecipientStep } from "../RecipientStep";
import { ReviewStep } from "../ReviewStep";

/** Incoming step slides in from the right, outgoing slides out to the left. */
const stepVariants: Variants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

/** Which field's token-select modal is open, if any. */
type SelectTarget = "from" | "to" | null;

const SwapFlow: React.FC = () => {
  const t = useTranslations("swap");
  const reduceMotion = useReducedMotion();
  const { values, handlers } = useSwapFlow();
  const [selectTarget, setSelectTarget] = useState<SelectTarget>(null);

  const stepDuration = reduceMotion ? 0 : 0.28;
  const step = values.step;

  const openSend = useCallback((): void => setSelectTarget("from"), []);
  const openReceive = useCallback((): void => setSelectTarget("to"), []);
  const closeSelect = useCallback((): void => setSelectTarget(null), []);

  const handleSelectAsset = useCallback(
    (asset: IAsset): void => {
      if (selectTarget === "from") {
        handlers.swap.selectFromAsset(asset);
      } else if (selectTarget === "to") {
        handlers.swap.selectToAsset(asset);
      }
      setSelectTarget(null);
    },
    [selectTarget, handlers.swap],
  );

  const headings: Record<SwapStep, { title: string; subtitle: string }> = {
    convert: {
      title: t("steps.convert.title"),
      subtitle: t("steps.convert.subtitle"),
    },
    recipient: {
      title: t("recipient.title"),
      subtitle: t("recipient.subtitle"),
    },
    review: { title: t("review.title"), subtitle: t("review.subtitle") },
    processing: {
      title: t("processing.title2"),
      subtitle: t("processing.subtitle"),
    },
    done: { title: t("done.title2"), subtitle: t("done.subtitle") },
  };

  const renderStep = (): React.ReactNode => {
    switch (step) {
      case "convert":
        return (
          <ConvertStep
            values={values}
            handlers={handlers}
            onOpenSend={openSend}
            onOpenReceive={openReceive}
          />
        );
      case "recipient":
        return <RecipientStep values={values} handlers={handlers} />;
      case "review":
        return <ReviewStep values={values} handlers={handlers} />;
      case "processing":
        return <ProcessingStep values={values} />;
      case "done":
        return <DoneStep values={values} handlers={handlers} />;
      default:
        return null;
    }
  };

  const selectedForModal =
    selectTarget === "from"
      ? values.swap.fromAsset
      : selectTarget === "to"
        ? values.swap.toAsset
        : null;

  const modalLabels = {
    title: t("modal.title"),
    close: t("modal.close"),
    searchPlaceholder: t("modal.search"),
    allCoins: t("modal.allCoins"),
    loading: t("dropdown.loading"),
    empty: t("dropdown.empty"),
    error: t("dropdown.error"),
  };

  const layoutTransition = {
    duration: stepDuration,
    ease: EASE_OUT,
    layout: { duration: stepDuration, ease: EASE_OUT },
  };

  return (
    <motion.div
      layout
      transition={layoutTransition}
      className="flex w-full flex-col items-center gap-7"
    >
      <header className="text-center">
        <h1 className="text-4xl font-bold text-swap-title sm:text-5xl">
          {headings[step].title}
        </h1>
        <p className="mt-2 text-base text-swap-muted">
          {headings[step].subtitle}
        </p>
      </header>

      <motion.div
        layout="size"
        style={{ transformOrigin: "top center" }}
        transition={layoutTransition}
        className="w-full max-w-[40rem] overflow-hidden rounded-swap-card border border-swap-border bg-swap-surface p-6 shadow-swap-card sm:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: stepDuration, ease: EASE_OUT }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.p
        layout
        transition={layoutTransition}
        className="flex items-center justify-center gap-2 text-center text-sm text-swap-subtle"
      >
        <ShieldCheck className="size-4" aria-hidden />
        {t("footerNote")}
      </motion.p>

      <AssetSelectModal
        isOpen={selectTarget !== null}
        onClose={closeSelect}
        onSelect={handleSelectAsset}
        selectedAsset={selectedForModal}
        labels={modalLabels}
      />
    </motion.div>
  );
};

export default SwapFlow;
