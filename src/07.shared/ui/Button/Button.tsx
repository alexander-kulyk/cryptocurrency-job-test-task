import { cva, type VariantProps } from "class-variance-authority";
import { classes } from "@/07.shared/lib";

const button = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-colors duration-200 ease-swap focus-visible:outline-hidden focus-visible:ring-3 focus-visible:ring-swap-accent/40 disabled:cursor-not-allowed disabled:opacity-40",
  {
    variants: {
      variant: {
        primary:
          "bg-swap-accent text-swap-accent-foreground hover:bg-swap-accent-hover",
        light:
          "bg-white text-swap-dropdown-foreground hover:bg-swap-dropdown-hover",
      },
      size: {
        md: "h-11 rounded-swap-control px-4 text-sm",
        lg: "h-14 rounded-swap-field px-6 text-base",
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
