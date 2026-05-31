import { Button, Spinner } from "@/07.shared/ui";

export interface IConfirmButtonProps {
  label: string;
  loadingLabel: string;
  onConfirm: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const ConfirmButton: React.FC<IConfirmButtonProps> = ({
  label,
  loadingLabel,
  onConfirm,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <Button
      variant="primary"
      size="lg"
      block
      onClick={onConfirm}
      disabled={disabled || isLoading}
    >
      {isLoading ? <Spinner label={loadingLabel} /> : null}
      {label}
    </Button>
  );
};

export default ConfirmButton;
