/**
 * Structural data for the benefits block. Translatable copy is NOT stored here
 * — only the i18n key suffix and the revealed background image per row. The
 * widget reads `description`/`title`/`tag` from the `landing.benefits.<key>`
 * namespace so both locales stay in sync.
 */
export interface IBenefitRow {
  /** Stable key — also the i18n sub-namespace and animation key. */
  key: string;
  /** Public path of the photographic background revealed when the row is active. */
  image: string;
}

export const BENEFIT_ROWS: readonly IBenefitRow[] = [
  { key: "exhibition", image: "/landing/benefit-exhibition.png" },
  { key: "capsules", image: "/landing/benefit-capsules.png" },
  { key: "telemetry", image: "/landing/benefit-telemetry.png" },
  { key: "domain", image: "/landing/benefit-domain.png" },
  { key: "impact", image: "/landing/benefit-impact.png" },
] as const;
