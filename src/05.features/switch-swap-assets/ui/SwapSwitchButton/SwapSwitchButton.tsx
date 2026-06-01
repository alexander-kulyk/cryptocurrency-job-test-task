"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownUp } from "lucide-react";

export interface ISwapSwitchButtonProps {
  onSwitch: () => void;
  label: string;
  disabled?: boolean;
}

const SwapSwitchButton: React.FC<ISwapSwitchButtonProps> = ({
  onSwitch,
  label,
  disabled = false,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onSwitch}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileTap={reduceMotion ? undefined : { scale: 0.88, rotate: 180 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex size-14 shrink-0 items-center justify-center rounded-swap-control border border-swap-strong-border bg-swap-chip text-swap-accent shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-colors hover:bg-swap-border disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ArrowDownUp className="size-5" />
    </motion.button>
  );
};

export default SwapSwitchButton;
