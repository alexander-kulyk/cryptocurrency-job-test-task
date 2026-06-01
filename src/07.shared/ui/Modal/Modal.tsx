"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { classes } from "@/07.shared/lib";

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 8 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
}

const Modal: React.FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  labelledBy,
}) => {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const stopPropagation = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
    },
    [],
  );

  if (typeof document === "undefined") {
    return null;
  }

  const overlayDuration = reduceMotion ? 0 : 0.2;
  const panelDuration = reduceMotion ? 0 : 0.24;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-swap-page/90 p-4 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: overlayDuration }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            className={classes(
              "w-full max-w-sm cursor-default rounded-swap-card border border-swap-border bg-swap-surface p-6 text-swap-foreground shadow-swap-dropdown",
              className,
            )}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: panelDuration, ease: [0.22, 1, 0.36, 1] }}
            onClick={stopPropagation}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export default Modal;
