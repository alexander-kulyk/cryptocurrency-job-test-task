"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  fadeScale,
  fadeUp,
  motionTransition,
  staggerContainer,
  VIEWPORT_ONCE,
} from "@/07.shared/lib";
import { Pill } from "@/07.shared/ui";

/**
 * Section 2 — manifesto. An oversized statement headline ("PHASE IS A SPACE FOR
 * CREATORS TO BE SEEN") set against an editorial portrait collage. Heading and
 * media fade up once the section scrolls into view.
 */
const LandingManifesto: React.FC = () => {
  const t = useTranslations("landing.manifesto");
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="manifesto"
      className="w-full bg-landing-surface px-5 py-16 tablet:px-10 tablet:py-24"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        className="mx-auto w-full max-w-laptop"
      >
        <motion.p
          variants={fadeUp}
          transition={motionTransition(reduceMotion, 0.5)}
          className="mb-6 text-sm text-landing-muted"
        >
          {t("eyebrow")}
        </motion.p>

        <div className="grid gap-8 laptop:grid-cols-[1.4fr_1fr] laptop:items-center">
          <motion.h2
            variants={fadeUp}
            transition={motionTransition(reduceMotion, 0.6)}
            className="text-4xl font-black uppercase leading-[0.95] tracking-tight text-landing-foreground tablet:text-6xl laptop:text-7xl"
          >
            {t("headline")}
          </motion.h2>

          <motion.div
            variants={fadeScale}
            transition={motionTransition(reduceMotion, 0.6)}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
          >
            <Image
              src="/landing/editorial-1.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1279px) 100vw, 420px"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3">
              <Pill tone="accent" size="sm">
                {t("captionPrimary")}
              </Pill>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 grid gap-4 tablet:grid-cols-2">
          <motion.div
            variants={fadeScale}
            transition={motionTransition(reduceMotion, 0.6)}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl"
          >
            <Image
              src="/landing/editorial-2.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute bottom-3 left-3 max-w-[16rem]">
              <Pill tone="accent" size="sm">
                {t("captionSecondary")}
              </Pill>
            </div>
          </motion.div>

          <motion.div
            variants={fadeScale}
            transition={motionTransition(reduceMotion, 0.6)}
            className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl"
          >
            <Image
              src="/landing/editorial-3.png"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default LandingManifesto;
