import { classes } from "@/07.shared/lib";

const AMOUNT_PATTERN = /^\d*\.?\d*$/;

export interface IAmountInputProps {
  value: string;
  onValueChange: (value: string) => void;
  ariaLabel: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const AmountInput: React.FC<IAmountInputProps> = ({
  value,
  onValueChange,
  ariaLabel,
  placeholder = "0",
  disabled = false,
  className,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const next = event.target.value.replace(",", ".");
    if (next === "" || AMOUNT_PATTERN.test(next)) {
      onValueChange(next);
    }
  };

  return (
    <input
      type="text"
      inputMode="decimal"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes(
        "w-full min-w-0 bg-transparent text-right text-2xl font-semibold text-swap-foreground outline-none placeholder:text-swap-muted disabled:opacity-60",
        className,
      )}
    />
  );
};

export default AmountInput;
