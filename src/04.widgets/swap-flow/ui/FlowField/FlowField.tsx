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
    <div className="rounded-swap-field border border-swap-border bg-swap-elevated p-5 sm:p-6">
      <p className="mb-4 text-base text-swap-muted">{label}</p>
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onOpenSelect}
          aria-label={selectLabel}
          aria-haspopup="dialog"
          className="flex h-14 shrink-0 items-center gap-3 rounded-full border border-swap-strong-border bg-swap-chip py-2 pl-2 pr-4 transition-colors hover:bg-swap-border"
        >
          {asset ? (
            <TokenIcon src={asset.assetImage} symbol={asset.symbol} size={32} />
          ) : (
            <span className="size-8 shrink-0 rounded-full bg-swap-border" />
          )}
          <span className="text-lg font-bold text-swap-foreground">
            {asset?.symbol ?? placeholder}
          </span>
          <ChevronDown className="size-4 text-swap-muted" />
        </button>

        <AmountInput
          value={amount}
          onValueChange={onAmountChange}
          ariaLabel={amountAriaLabel}
          className="text-4xl sm:text-5xl"
        />
      </div>
      {usdEstimate ? (
        <p className="mt-2 text-right text-sm text-swap-muted">{usdEstimate}</p>
      ) : null}
    </div>
  );
};

export default FlowField;
