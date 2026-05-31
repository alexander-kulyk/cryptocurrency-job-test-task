import { classes } from "@/07.shared/lib";
import { TokenIcon } from "@/07.shared/ui";
import type { IAsset } from "../../model";

export interface IAssetOptionProps {
  asset: IAsset;
  onSelect: (asset: IAsset) => void;
  isActive?: boolean;
}

const AssetOption: React.FC<IAssetOptionProps> = ({
  asset,
  onSelect,
  isActive = false,
}) => {
  const handleSelect = (): void => {
    onSelect(asset);
  };

  const rowClasses = classes(
    "flex w-full items-center gap-3 rounded-swap-control px-3 py-2 text-left transition-colors hover:bg-swap-dropdown-hover",
    isActive && "bg-swap-dropdown-hover",
  );

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={rowClasses}
      aria-pressed={isActive}
    >
      <TokenIcon src={asset.assetImage} symbol={asset.symbol} size={28} />
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-semibold text-swap-dropdown-foreground">
          {asset.symbol}
        </span>
        <span className="truncate text-xs text-swap-dropdown-muted">
          {asset.name}
        </span>
      </span>
    </button>
  );
};

export default AssetOption;
