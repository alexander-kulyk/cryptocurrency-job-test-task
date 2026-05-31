import { ChevronDown } from "lucide-react";
import { AmountInput } from "@/05.features";
import type { IAsset } from "@/06.entities";
import { TokenIcon } from "@/07.shared/ui";

export interface IFlowFieldProps {
  label: string;
  asset: IAsset | null;
  /** Opens the token-select modal for this field. */
  onOpenSelect: () => void;
  selectLabel: string;
  amount: string;
  onAmountChange: (value: string) => void;
  amountAriaLabel: string;
  /** Pre-formatted `≈$N` estimate, or null to hide the line. */
  usdEstimate: string | null;
  placeholder: string;
}

const FlowField: React.FC<IFlowFieldProps> = ({
  label,
  asset,
  onOpenSelect,
  selectLabel,
  amount,
  onAmountChange,
  amountAriaLabel,
  usdEstimate,
  placeholder,
}) => {
  return (
    <div className="rounded-swap-field bg-swap-elevated p-5">
      <p className="mb-3 text-sm text-swap-muted">{label}</p>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onOpenSelect}
          aria-label={selectLabel}
          aria-haspopup="dialog"
          className="flex shrink-0 items-center gap-2 rounded-full bg-swap-surface py-1.5 pl-1.5 pr-3 transition-colors hover:bg-swap-border"
        >
          {asset ? (
            <TokenIcon src={asset.assetImage} symbol={asset.symbol} size={28} />
          ) : (
            <span className="size-7 shrink-0 rounded-full bg-swap-border" />
          )}
          <span className="text-base font-bold text-swap-foreground">
            {asset?.symbol ?? placeholder}
          </span>
          <ChevronDown className="size-4 text-swap-muted" />
        </button>

        <AmountInput
          value={amount}
          onValueChange={onAmountChange}
          ariaLabel={amountAriaLabel}
          className="text-3xl"
        />
      </div>
      {usdEstimate ? (
        <p className="mt-2 text-right text-sm text-swap-muted">{usdEstimate}</p>
      ) : null}
    </div>
  );
};

export default FlowField;
