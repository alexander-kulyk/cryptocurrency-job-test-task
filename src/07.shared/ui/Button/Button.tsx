import { cva, type VariantProps } from "class-variance-authority";
import { classes } from "@/07.shared/lib";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 ease-swap focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-swap-accent/40 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-swap-accent bg-[linear-gradient(180deg,hsl(157_66%_55%),hsl(157_77%_45%))] text-swap-accent-foreground shadow-[0_12px_32px_rgba(27,202,127,0.22)] hover:bg-swap-accent-hover hover:bg-[linear-gradient(180deg,hsl(157_68%_51%),hsl(157_80%_41%))] disabled:bg-swap-elevated disabled:bg-none disabled:text-swap-disabled disabled:shadow-none",
        light:
          "border border-swap-strong-border bg-swap-chip text-swap-foreground hover:bg-swap-dropdown-hover disabled:border-swap-border disabled:text-swap-disabled",
      },
      size: {
        md: "h-11 rounded-swap-control px-4 text-sm",
        lg: "h-16 rounded-swap-field px-6 text-lg",
      },
      block: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "lg", block: true },
  },
);

export interface IButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button: React.FC<IButtonProps> = ({
  variant,
  size,
  block,
  className,
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={classes(button({ variant, size, block }), className)}
      {...props}
    />
  );
};

export default Button;
