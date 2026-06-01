import { classes } from "@/07.shared/lib";

export interface ISpinnerProps {
  label?: string;
  className?: string;
}

const Spinner: React.FC<ISpinnerProps> = ({ label = "Loading", className }) => {
  return (
    <span
      role="status"
      aria-label={label}
      className={classes(
        "inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent",
        className,
      )}
    />
  );
};

export default Spinner;
