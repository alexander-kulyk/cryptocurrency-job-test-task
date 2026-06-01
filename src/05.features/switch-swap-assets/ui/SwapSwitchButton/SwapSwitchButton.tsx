"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

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
  const [isReversed, setIsReversed] = useState(false);

  const iconTransition = {
    duration: reduceMotion ? 0 : 0.22,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const handleClick = (): void => {
    setIsReversed((current) => !current);
    onSwitch();
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="flex size-14 shrink-0 items-center justify-center rounded-swap-control border border-swap-strong-border bg-swap-chip text-swap-accent shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-colors hover:bg-swap-border disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className="relative h-6 w-9" aria-hidden>
        <motion.span
          className="absolute left-0 top-0"
          animate={{
            y: isReversed ? 10 : 2,
            opacity: isReversed ? 0 : 1,
          }}
          transition={iconTransition}
        >
          <ArrowDown className="size-5" />
        </motion.span>
        <motion.span
          className="absolute left-0 top-0"
          animate={{
            y: isReversed ? -2 : -10,
            opacity: isReversed ? 1 : 0,
          }}
          transition={iconTransition}
        >
          <ArrowUp className="size-5" />
        </motion.span>
        <motion.span
          className="absolute right-0 top-0"
          animate={{
            y: isReversed ? -10 : -2,
            opacity: isReversed ? 0 : 1,
          }}
          transition={iconTransition}
        >
          <ArrowUp className="size-5" />
        </motion.span>
        <motion.span
          className="absolute right-0 top-0"
          animate={{
            y: isReversed ? 2 : 10,
            opacity: isReversed ? 1 : 0,
          }}
          transition={iconTransition}
        >
          <ArrowDown className="size-5" />
        </motion.span>
      </span>
    </motion.button>
  );
};

export default SwapSwitchButton;
