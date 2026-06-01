"use client";

import { useEffect, useMemo, useRef } from "react";
import { Search, X } from "lucide-react";
import { type IAsset } from "@/06.entities";
import { classes } from "@/07.shared/lib";
import { Modal, Pill, Spinner, TokenIcon } from "@/07.shared/ui";
import { getNetworkLabel, QUICK_PICK_SYMBOLS, useAssetSearch } from "../../model";

export interface IAssetSelectModalLabels {
  title: string;
  close: string;
  searchPlaceholder: string;
  allCoins: string;
  loading: string;
  empty: string;
  error: string;
}

export interface IAssetSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (asset: IAsset) => void;
  selectedAsset: IAsset | null;
  labels: IAssetSelectModalLabels;
}

const AssetSelectModal: React.FC<IAssetSelectModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedAsset,
  labels,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { values, handlers } = useAssetSearch({ enabled: isOpen });
  const {
    searchTerm,
    assets,
    isLoading,
    isFetching,
    isFetchingMore,
    isError,
  } = values;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    } else {
      handlers.resetSearch();
    }
  }, [isOpen, handlers]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    handlers.setSearchTerm(event.target.value);
  };

  const handleSelect = (asset: IAsset): void => {
    onSelect(asset);
    handlers.resetSearch();
  };

  const handleQuickPick = (symbol: string): void => {
    handlers.setSearchTerm(symbol);
  };

  const quickPicks = useMemo(
    () =>
      QUICK_PICK_SYMBOLS.map((symbol) => {
        const match = assets.find((asset) => asset.symbol === symbol);
        return { symbol, asset: match ?? null };
      }),
    [assets],
  );

  const showEmptyState = !isLoading && !isError && assets.length === 0;
  const showLoadMoreOverlay = isFetchingMore;
  const showSearchSpinner =
    isFetching && !isFetchingMore && searchTerm.trim().length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="asset-select-title"
      placement="top"
      animateSize
      className="max-w-[44rem] p-0"
    >
      <div className="flex items-center justify-between p-6 pb-4 sm:p-8 sm:pb-5">
        <h2
          id="asset-select-title"
          className="text-2xl font-bold text-swap-foreground"
        >
          {labels.title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="flex size-12 items-center justify-center rounded-swap-control bg-swap-chip text-swap-muted transition-colors hover:bg-swap-border hover:text-swap-foreground"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="px-6 sm:px-8">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-swap-muted" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={labels.searchPlaceholder}
            className="w-full rounded-swap-field border border-swap-strong-border bg-swap-elevated py-4 pl-12 pr-12 text-lg text-swap-foreground outline-none placeholder:text-swap-muted focus-visible:border-swap-accent focus-visible:ring-3 focus-visible:ring-swap-accent/20"
          />
          {showSearchSpinner ? (
            <Spinner
              label={labels.loading}
              className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-swap-accent"
            />
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quickPicks.map(({ symbol, asset }) => (
            <button
              key={symbol}
              type="button"
              onClick={() => handleQuickPick(symbol)}
              className="flex items-center gap-2 rounded-full border border-swap-strong-border bg-swap-chip px-3.5 py-2 text-base font-semibold text-swap-foreground transition-colors hover:bg-swap-border"
            >
              {asset ? (
                <TokenIcon
                  src={asset.assetImage}
                  symbol={asset.symbol}
                  size={20}
                />
              ) : (
                <span className="flex size-5 items-center justify-center rounded-full bg-swap-border text-[0.625rem] font-bold text-swap-muted">
                  {symbol.charAt(0)}
                </span>
              )}
              {symbol}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 border-t border-swap-border px-6 pt-5 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-swap-muted">
          {labels.allCoins}
        </p>
      </div>

      <div className="relative">
        <div
          onScroll={handlers.handleListScroll}
          className="scroll-bar flex max-h-[26rem] flex-col gap-1 overflow-y-auto px-4 pb-5 pt-3 sm:px-6"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-swap-muted">
              <Spinner label={labels.loading} />
              {labels.loading}
            </div>
          ) : null}

          {isError ? (
            <p className="py-8 text-center text-sm text-swap-muted">
              {labels.error}
            </p>
          ) : null}

          {showEmptyState ? (
            <p className="py-8 text-center text-sm text-swap-muted">
              {labels.empty}
            </p>
          ) : null}

          {assets.map((asset) => {
            const network = getNetworkLabel(asset.symbol);
            const isActive = asset.id === selectedAsset?.id;
            const rowClasses = classes(
              "flex w-full items-center gap-4 rounded-swap-field px-3 py-3 text-left transition-colors hover:bg-swap-elevated",
              isActive && "bg-swap-elevated",
            );
            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => handleSelect(asset)}
                className={rowClasses}
                aria-pressed={isActive}
              >
                <TokenIcon
                  src={asset.assetImage}
                  symbol={asset.symbol}
                  size={40}
                />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-base font-bold text-swap-foreground">
                    {asset.symbol}
                  </span>
                  <span className="truncate text-sm text-swap-muted">
                    {asset.name}
                  </span>
                </span>
                {network ? (
                  <Pill
                    tone="outline"
                    size="sm"
                    className="ml-auto border-swap-strong-border text-swap-muted"
                  >
                    {network}
                  </Pill>
                ) : null}
              </button>
            );
          })}
        </div>

        {showLoadMoreOverlay ? (
          <div className="pointer-events-none absolute inset-x-4 bottom-0 flex h-20 items-center justify-center rounded-swap-field bg-swap-surface/45 text-swap-accent backdrop-blur-[3px] sm:inset-x-6">
            <Spinner label={labels.loading} className="size-6" />
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default AssetSelectModal;
