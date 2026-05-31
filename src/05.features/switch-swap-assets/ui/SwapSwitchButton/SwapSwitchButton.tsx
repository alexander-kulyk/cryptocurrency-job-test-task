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
      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-swap-border bg-swap-elevated text-swap-accent transition-colors hover:bg-swap-surface disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ArrowDownUp className="size-4" />
    </motion.button>
  );
};

export default SwapSwitchButton;
