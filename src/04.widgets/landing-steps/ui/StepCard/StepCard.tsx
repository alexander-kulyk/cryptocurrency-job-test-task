"use client";

import { classes } from "@/07.shared/lib";
import type { StepTone } from "../../model";

export interface IStepCardProps {
  tone: StepTone;
  /** Localized brand chip ("Gifty"). */
  brand: string;
  /** Localized small label above the title ("01" / "Create, add, share"). */
  eyebrow: string;
  /** Localized card title. */
  title: string;
  /** Localized card body. */
  body: string;
  /** Localized repeated accent word ("START"); shown only on the highlight card. */
  accentWord?: string;
}

/**
 * One card in the "three steps" section. The highlight (yellow) variant carries
 * the repeated "START" accent words and brand chip; the ink variant is a calmer
 * dark card. Pure presentational — no logic in JSX.
 */
const StepCard: React.FC<IStepCardProps> = ({
  tone,
  brand,
  eyebrow,
  title,
  body,
  accentWord,
}) => {
  const isHighlight = tone === "highlight";

  const cardClass = classes(
    "relative flex h-full flex-col overflow-hidden rounded-3xl p-7 tablet:p-9",
    isHighlight
      ? "bg-landing-highlight text-landing-highlight-foreground"
      : "bg-landing-ink text-landing-on-ink",
  );

  const eyebrowClass = classes(
    "text-xs font-semibold uppercase tracking-widest",
    isHighlight ? "text-landing-highlight-foreground/70" : "text-landing-on-ink-muted",
  );

  const bodyClass = classes(
    "mt-3 max-w-sm text-sm",
    isHighlight ? "text-landing-highlight-foreground/80" : "text-landing-on-ink-muted",
  );

  const chipClass = classes(
    "flex size-7 items-center justify-center rounded-full text-[10px] font-bold",
    isHighlight ? "bg-landing-highlight-foreground/15" : "bg-landing-on-ink/15",
  );

  return (
    <article className={cardClass}>
      <div className="flex items-center gap-2">
        <span className={chipClass} aria-hidden>
          ◆
        </span>
        <span className="text-sm font-semibold">{brand}</span>
      </div>

      {isHighlight && accentWord ? (
        <div
          aria-hidden
          className="mt-6 flex items-baseline justify-between text-3xl font-black italic tablet:text-5xl"
        >
          <span>{accentWord}</span>
          <span className="opacity-30">{accentWord}</span>
        </div>
      ) : null}

      <p className={classes(eyebrowClass, isHighlight ? "mt-6" : "mt-8")}>
        {eyebrow}
      </p>
      <h3 className="mt-2 text-2xl font-bold tablet:text-3xl">{title}</h3>
      <p className={bodyClass}>{body}</p>
    </article>
  );
};

export default StepCard;
