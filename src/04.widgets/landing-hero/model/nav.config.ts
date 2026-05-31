/**
 * Nav link structure. Labels are resolved from `landing.nav.<key>` so the menu
 * is fully localized; `href` is an in-page anchor.
 */
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
