export interface INavLink {
  key: string;
  href: string;
}

export const NAV_LINKS: readonly INavLink[] = [
  { key: "home", href: "#hero" },
  { key: "howItWorks", href: "#steps" },
  { key: "features", href: "#benefits" },
  { key: "forWhom", href: "#manifesto" },
] as const;
