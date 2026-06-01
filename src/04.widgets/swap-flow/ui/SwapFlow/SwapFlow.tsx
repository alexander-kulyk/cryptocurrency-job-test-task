"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AssetSelectModal } from "@/05.features";
import type { IAsset } from "@/06.entities";
import { EASE_OUT } from "@/07.shared/lib";
import { useSwapFlow } from "../../model";
import { getModalLabels, getStepHeadings, renderStep } from "./helpers";

const stepVariants: Variants = {
  enter: { opacity: 0, x: 24 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
};

type SelectTarget = "from" | "to" | null;

const SwapFlow: React.FC = () => {
  const t = useTranslations("swap");
  const reduceMotion = useReducedMotion();
  const { values, handlers } = useSwapFlow();
  const [selectTarget, setSelectTarget] = useState<SelectTarget>(null);

  const stepDuration = reduceMotion ? 0 : 0.28;
  const step = values.step;
  const heading = getStepHeadings(t)[step];

  const openSend = (): void => setSelectTarget("from");
  const openReceive = (): void => setSelectTarget("to");
  const closeSelect = (): void => setSelectTarget(null);

  const handleSelectAsset = (asset: IAsset): void => {
    if (selectTarget === "from") {
      handlers.swap.selectFromAsset(asset);
    } else if (selectTarget === "to") {
      handlers.swap.selectToAsset(asset);
    }
    setSelectTarget(null);
  };

  const selectedForModal =
    selectTarget === "from"
      ? values.swap.fromAsset
      : selectTarget === "to"
        ? values.swap.toAsset
        : null;

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
          {heading.title}
        </h1>
        <p className="mt-2 text-base text-swap-muted">{heading.subtitle}</p>
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
            {renderStep({
              step,
              values,
              handlers,
              onOpenSend: openSend,
              onOpenReceive: openReceive,
            })}
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
        labels={getModalLabels(t)}
      />
    </motion.div>
  );
};

export default SwapFlow;
