import { cva, type VariantProps } from "class-variance-authority";
import { classes } from "@/07.shared/lib";

const pill = cva(
  "inline-flex w-fit items-center rounded-full font-medium leading-none whitespace-nowrap",
  {
    variants: {
      tone: {
        accent: "bg-landing-accent text-landing-accent-foreground",
        muted: "bg-white/10 text-white/70",
        outline: "border border-white/20 text-white/80",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: { tone: "accent", size: "sm" },
  },
);

export interface IPillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pill> {
  children: React.ReactNode;
}

const Pill: React.FC<IPillProps> = ({
  tone,
  size,
  className,
  children,
  ...props
}) => {
  return (
    <span className={classes(pill({ tone, size }), className)} {...props}>
      {children}
    </span>
  );
};

export default Pill;
