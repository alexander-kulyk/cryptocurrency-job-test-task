import { AmountInput, AssetDropdown } from "@/05.features";
import type { IAsset } from "@/06.entities";

export interface IAssetDropdownLabels {
  triggerLabel: string;
  placeholder: string;
  searchPlaceholder: string;
  loadingLabel: string;
  emptyLabel: string;
  errorLabel: string;
}

export interface ISwapFieldProps {
  label: string;
  selectedAsset: IAsset | null;
  onSelectAsset: (asset: IAsset) => void;
  amount: string;
  onAmountChange: (value: string) => void;
  amountAriaLabel: string;
  dropdownLabels: IAssetDropdownLabels;
}

const SwapField: React.FC<ISwapFieldProps> = ({
  label,
  selectedAsset,
  onSelectAsset,
  amount,
  onAmountChange,
  amountAriaLabel,
  dropdownLabels,
}) => {
  return (
    <div className="p-5">
      <p className="mb-3 text-sm text-swap-muted">{label}</p>
      <div className="flex items-center gap-4">
        <AssetDropdown
          selectedAsset={selectedAsset}
          onSelect={onSelectAsset}
          {...dropdownLabels}
        />
        <AmountInput
          value={amount}
          onValueChange={onAmountChange}
          ariaLabel={amountAriaLabel}
        />
      </div>
    </div>
  );
};

export default SwapField;
