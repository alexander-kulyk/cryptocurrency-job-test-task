"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@/07.shared/ui";

export interface ISwapSuccessModalProps {
  isOpen: boolean;
  fromSymbol: string;
  fromAmount: string;
  toSymbol: string;
  toAmount: string;
  onOk: () => void;
}

const SwapSuccessModal: React.FC<ISwapSuccessModalProps> = ({
  isOpen,
  fromSymbol,
  fromAmount,
  toSymbol,
  toAmount,
  onOk,
}) => {
  const t = useTranslations("swap.success");

  return (
    <Modal isOpen={isOpen} onClose={onOk} labelledBy="swap-success-title">
      <h2
        id="swap-success-title"
        className="text-lg font-semibold text-swap-foreground"
      >
        {t("title")}
      </h2>
      <p className="mt-3 text-sm leading-6 text-swap-muted">
        {t("message", { fromSymbol, fromAmount, toSymbol, toAmount })}
      </p>
      <Button size="md" block onClick={onOk} className="mt-6">
        {t("ok")}
      </Button>
    </Modal>
  );
};

export default SwapSuccessModal;
