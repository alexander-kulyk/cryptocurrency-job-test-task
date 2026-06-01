import { ArrowLeft } from "lucide-react";
import { classes } from "@/07.shared/lib";

export interface IBackHomeLinkProps {
  href: string;
  label?: string;
  tone?: "dark" | "light";
  className?: string;
}

const BackHomeLink: React.FC<IBackHomeLinkProps> = ({
  href,
  label = "Back to home",
  tone = "dark",
  className,
}) => {
  const toneClass =
    tone === "light"
      ? "border-landing-foreground/15 bg-landing-surface/90 text-landing-foreground shadow-lg hover:bg-[#f8f8f8]"
      : "border-swap-border bg-swap-surface/80 text-swap-foreground shadow-swap-card hover:border-swap-strong-border hover:bg-swap-elevated";

  return (
    <a
      href={href}
      aria-label={label}
      className={classes(
        "inline-flex size-11 items-center justify-center rounded-full border backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-swap-accent/40",
        toneClass,
        className,
      )}
    >
      <ArrowLeft className="size-5" aria-hidden />
    </a>
  );
};

export default BackHomeLink;
