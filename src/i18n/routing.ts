import { defineRouting } from "next-intl/routing";

export const locales = ["en", "uk"] as const;

export const defaultLocale = "en" as const;

export const routing = defineRouting({
  locales,

  defaultLocale,
});
