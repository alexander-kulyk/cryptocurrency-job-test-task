"use client";

import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/07.shared/hooks";
import { clearApiErrors, selectApiErrors } from "@/07.shared/model";
import { Button, Modal } from "@/07.shared/ui";

const ErrorConfirmation: React.FC = () => {
  const t = useTranslations("errors");
  const dispatch = useAppDispatch();
  const errors = useAppSelector(selectApiErrors);

  const isOpen = errors.length > 0;

  const handleOk = (): void => {
    dispatch(clearApiErrors());
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOk} labelledBy="api-error-title">
      <h2
        id="api-error-title"
        className="text-lg font-semibold text-swap-foreground"
      >
        {t("title")}
      </h2>
      <ul className="mt-3 flex max-h-60 flex-col gap-2 overflow-y-auto">
        {errors.map((error) => (
          <li
            key={error.id}
            className="rounded-swap-control bg-swap-elevated p-3"
          >
            <p className="text-xs font-semibold text-swap-accent">
              {error.status}
            </p>
            <p className="mt-1 text-sm text-swap-foreground">{error.message}</p>
          </li>
        ))}
      </ul>
      <Button size="md" block onClick={handleOk} className="mt-6">
        {t("ok")}
      </Button>
    </Modal>
  );
};

export default ErrorConfirmation;
