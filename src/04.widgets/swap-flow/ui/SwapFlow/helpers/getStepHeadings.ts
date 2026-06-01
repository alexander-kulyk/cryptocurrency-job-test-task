import { useTranslations } from "next-intl";
import type { SwapStep } from "../../../model";

type Translator = ReturnType<typeof useTranslations>;

export interface IStepHeading {
  title: string;
  subtitle: string;
}

/** Localized title/subtitle for every flow step, keyed by step id. */
export const getStepHeadings = (
  t: Translator,
): Record<SwapStep, IStepHeading> => ({
  convert: {
    title: t("steps.convert.title"),
    subtitle: t("steps.convert.subtitle"),
  },
  recipient: {
    title: t("recipient.title"),
    subtitle: t("recipient.subtitle"),
  },
  review: {
    title: t("review.title"),
    subtitle: t("review.subtitle"),
  },
  processing: {
    title: t("processing.title2"),
    subtitle: t("processing.subtitle"),
  },
  done: {
    title: t("done.title2"),
    subtitle: t("done.subtitle"),
  },
});
