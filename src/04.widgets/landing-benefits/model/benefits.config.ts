export interface IBenefitRow {
  key: string;
  image: string;
}

export const BENEFIT_ROWS: readonly IBenefitRow[] = [
  { key: "exhibition", image: "/landing/benefit-exhibition.png" },
  { key: "capsules", image: "/landing/benefit-capsules.png" },
  { key: "telemetry", image: "/landing/benefit-telemetry.png" },
  { key: "domain", image: "/landing/benefit-domain.png" },
  { key: "impact", image: "/landing/benefit-impact.png" },
] as const;
