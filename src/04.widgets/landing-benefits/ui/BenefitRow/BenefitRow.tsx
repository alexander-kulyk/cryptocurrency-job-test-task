"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { classes } from "@/07.shared/lib";
import { Pill } from "@/07.shared/ui";

const overlayVariants: Variants = {
  inactive: { opacity: 0, scale: 1.06 },
  active: { opacity: 1, scale: 1 },
};

export interface IBenefitRowProps {
  description: string;
  title: string;
  tag: string;
  image: string;
  isActive: boolean;
  reduceMotion: boolean;
  onActivate: () => void;
  onRelease: () => void;
}

const BenefitRow: React.FC<IBenefitRowProps> = ({
  description,
  title,
  tag,
  image,
  isActive,
  reduceMotion,
  onActivate,
  onRelease,
}) => {
  const titleClass = classes(
    "text-center text-4xl font-bold tracking-tight transition-colors duration-500 tablet:text-6xl",
    isActive ? "text-landing-highlight" : "text-landing-on-ink",
  );

  return (
    <div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onMouseLeave={onRelease}
      onBlur={onRelease}
      tabIndex={0}
      aria-current={isActive}
      className="group relative isolate flex flex-col items-center gap-3 overflow-hidden border-b border-landing-row-border px-5 py-8 outline-hidden tablet:grid tablet:grid-cols-[1fr_auto_1fr] tablet:items-center tablet:gap-6 tablet:px-10 tablet:py-10 focus-visible:ring-2 focus-visible:ring-landing-highlight/60"
    >
      <motion.div
        variants={overlayVariants}
        initial={false}
        animate={isActive ? "active" : "inactive"}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
        }
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-landing-ink/55" />
        <div className="absolute inset-0 bg-linear-to-r from-landing-ink via-landing-ink/25 to-landing-ink" />
      </motion.div>

      <p className="max-w-xs text-center text-sm text-landing-on-ink-muted tablet:text-left">
        {description}
      </p>

      <h3 className={titleClass}>{title}</h3>

      <div className="flex justify-center tablet:justify-end">
        <Pill tone={isActive ? "accent" : "muted"} size="sm">
          {tag}
        </Pill>
      </div>
    </div>
  );
};

export default BenefitRow;
