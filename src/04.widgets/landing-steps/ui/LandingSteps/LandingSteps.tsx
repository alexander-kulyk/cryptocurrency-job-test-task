"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeScale,
  fadeUp,
  motionTransition,
  staggerContainer,
  VIEWPORT_ONCE,
} from "@/07.shared/lib";
import { STEP_CARDS } from "../../model";
import { StepCard } from "../StepCard";

/**
 * Section 3 — "Three steps to drops". A black band with an oversized heading and
 * two cards (a yellow primary card + a dark secondary card). Heading and cards
 * fade up once on scroll-in.
 */
const LandingSteps: React.FC = () => {
  const t = useTranslations("landing.steps");
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="steps"
      className="w-full bg-landing-ink px-5 py-16 tablet:px-10 tablet:py-24"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto grid w-full max-w-laptop gap-10 laptop:grid-cols-[1fr_1.3fr] laptop:items-center"
      >
        <motion.h2
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.6)}
          className="text-5xl font-black uppercase leading-[0.9] tracking-tight text-landing-on-ink tablet:text-7xl"
        >
          {t("headline")}
        </motion.h2>

        <div className="grid gap-4 tablet:grid-cols-2">
          {STEP_CARDS.map((card) => (
            <motion.div
              key={card.key}
              variants={fadeScale}
              transition={motionTransition(reduceMotion, 0.6)}
            >
              <StepCard
                tone={card.tone}
                brand={t(`cards.${card.key}.brand`)}
                eyebrow={t(`cards.${card.key}.eyebrow`)}
                title={t(`cards.${card.key}.title`)}
                body={t(`cards.${card.key}.body`)}
                accentWord={
                  card.tone === "highlight" ? t("accentWord") : undefined
                }
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LandingSteps;
