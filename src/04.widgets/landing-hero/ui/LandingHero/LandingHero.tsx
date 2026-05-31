"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeScale,
  fadeUp,
  motionTransition,
  staggerContainer,
} from "@/07.shared/lib";
import { Button, Pill } from "@/07.shared/ui";
import { LandingNav } from "../LandingNav";

/** Decorative sparkle. Position is set by the caller via className. */
const Sparkle: React.FC<{ className: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
    <path
      d="M12 2c.6 4.8 2.6 6.8 7.4 7.4-4.8.6-6.8 2.6-7.4 7.4-.6-4.8-2.6-6.8-7.4-7.4C9.4 8.8 11.4 6.8 12 2Z"
      fill="currentColor"
    />
  </svg>
);

/**
 * Section 1 — hero. Top nav, the zebra "PHASE" wordmark, the purple
 * "independent minds only" callout, the tagline and the yellow CTA, plus a
 * couple of decorative sparkles. Content staggers in once on mount.
 */
const LandingHero: React.FC = () => {
  const t = useTranslations("landing.hero");
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden bg-landing-surface"
    >
      <LandingNav />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex w-full max-w-laptop flex-col items-center px-5 pb-16 pt-6 text-center tablet:pb-24 tablet:pt-10"
      >
        <Sparkle className="pointer-events-none absolute left-6 top-10 size-7 text-landing-accent tablet:left-16 tablet:size-9" />
        <Sparkle className="pointer-events-none absolute right-10 bottom-32 size-5 text-landing-highlight tablet:right-24" />

        <motion.div
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className="mb-6 self-center tablet:mb-8 tablet:self-end"
        >
          <Pill tone="accent" size="md">
            {t("badge")}
          </Pill>
        </motion.div>

        <motion.div
          variants={fadeScale}
          transition={motionTransition(reduceMotion, 0.7)}
          className="relative aspect-[600/180] w-full max-w-4xl"
        >
          <Image
            src="/landing/phase-wordmark.png"
            alt={t("wordmarkAlt")}
            fill
            priority
            sizes="(max-width: 767px) 92vw, 900px"
            className="object-contain"
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className="mt-8 max-w-xl text-base text-landing-muted tablet:text-lg"
        >
          {t("tagline")}
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className="mt-7"
        >
          <Button
            variant="primary"
            size="lg"
            block={false}
            className="bg-landing-highlight text-landing-highlight-foreground hover:bg-landing-highlight/90 focus-visible:ring-landing-highlight/40"
          >
            {t("cta")}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LandingHero;
