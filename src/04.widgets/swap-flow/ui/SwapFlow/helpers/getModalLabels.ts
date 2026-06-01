import { useTranslations } from "next-intl";
import type { IAssetSelectModalLabels } from "@/05.features";

type Translator = ReturnType<typeof useTranslations>;

/** Localized labels for the asset-select modal opened from the convert step. */
export const getModalLabels = (t: Translator): IAssetSelectModalLabels => ({
  title: t("modal.title"),
  close: t("modal.close"),
  searchPlaceholder: t("modal.search"),
  allCoins: t("modal.allCoins"),
  loading: t("dropdown.loading"),
  empty: t("dropdown.empty"),
  error: t("dropdown.error"),
});
