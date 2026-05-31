"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/07.shared/ui";
import { NAV_LINKS, useMobileMenu } from "../../model";

const drawerVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const MenuIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Top navigation for the hero. Inline links on tablet+, a slide-down drawer on
 * mobile (animated with AnimatePresence). Brand + link labels are localized.
 */
const LandingNav: React.FC = () => {
  const t = useTranslations("landing");
  const { isOpen, close, toggle } = useMobileMenu();

  return (
    <nav className="relative z-20 flex items-center justify-between gap-4 px-5 py-5 tablet:px-10">
      <a
        href="#hero"
        className="text-lg font-bold tracking-tight text-landing-foreground"
      >
        {t("brand")}
      </a>

      <ul className="hidden items-center gap-8 tablet:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.key}>
            <a
              href={link.href}
              className="text-sm font-medium text-landing-muted transition-colors hover:text-landing-foreground"
            >
              {t(`nav.${link.key}`)}
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden tablet:block">
        <Button
          variant="light"
          size="md"
          block={false}
          className="border border-landing-foreground/15"
        >
          {t("nav.login")}
        </Button>
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-label={t(isOpen ? "nav.closeMenu" : "nav.openMenu")}
        className="text-landing-foreground tablet:hidden"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mobile-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-3 top-full mt-2 rounded-2xl border border-landing-foreground/10 bg-landing-surface p-4 shadow-xl tablet:hidden"
          >
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    onClick={close}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-landing-foreground transition-colors hover:bg-landing-foreground/5"
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="primary" size="md" onClick={close}>
                {t("hero.cta")}
              </Button>
              <Button
                variant="light"
                size="md"
                onClick={close}
                className="border border-landing-foreground/15"
              >
                {t("nav.login")}
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default LandingNav;
