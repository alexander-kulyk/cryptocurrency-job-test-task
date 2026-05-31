"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useRef } from "react";
import { AssetOption, type IAsset } from "@/06.entities";
import { classes } from "@/07.shared/lib";
import { Spinner, TokenIcon } from "@/07.shared/ui";
import { useAssetDropdown } from "../../model";

const panelVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export interface IAssetDropdownProps {
  selectedAsset: IAsset | null;
  onSelect: (asset: IAsset) => void;
  triggerLabel: string;
  placeholder: string;
  searchPlaceholder: string;
  loadingLabel: string;
  emptyLabel: string;
  errorLabel: string;
}

const AssetDropdown: React.FC<IAssetDropdownProps> = ({
  selectedAsset,
  onSelect,
  triggerLabel,
  placeholder,
  searchPlaceholder,
  loadingLabel,
  emptyLabel,
  errorLabel,
}) => {
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { values, handlers } = useAssetDropdown({ onSelect });
  const {
    isOpen,
    searchTerm,
    assets,
    isLoading,
    isFetching,
    isError,
    containerRef,
  } = values;

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    handlers.setSearchTerm(event.target.value);
  };

  const showEmptyState = !isLoading && !isError && assets.length === 0;
  const showFooterSpinner = isFetching && assets.length > 0;
  const panelDuration = reduceMotion ? 0 : 0.18;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handlers.toggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={triggerLabel}
        className="flex items-center gap-3 rounded-swap-control text-left transition-opacity hover:opacity-80"
      >
        {selectedAsset ? (
          <TokenIcon
            src={selectedAsset.assetImage}
            symbol={selectedAsset.symbol}
            size={32}
          />
        ) : (
          <span className="size-8 shrink-0 rounded-full bg-swap-elevated" />
        )}
        <span className="flex flex-col">
          <span className="flex items-center gap-1 text-xl font-bold text-swap-foreground">
            {selectedAsset ? selectedAsset.symbol : placeholder}
            <ChevronDown
              className={classes(
                "size-4 text-swap-muted transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </span>
          <span className="text-xs text-swap-muted">
            {selectedAsset?.name ?? ""}
          </span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: panelDuration, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-20 mt-2 w-72 max-w-[80vw] overflow-hidden rounded-swap-field bg-swap-dropdown p-2 shadow-swap-dropdown"
            role="listbox"
          >
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-swap-dropdown-muted" />
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="w-full rounded-swap-control bg-swap-dropdown-hover py-2 pl-9 pr-3 text-sm text-swap-dropdown-foreground outline-none placeholder:text-swap-dropdown-muted"
              />
            </div>

            <div
              onScroll={handlers.handleListScroll}
              className="scroll-bar flex max-h-64 flex-col gap-1 overflow-y-auto"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 py-6 text-sm text-swap-dropdown-muted">
                  <Spinner label={loadingLabel} />
                  {loadingLabel}
                </div>
              ) : null}

              {isError ? (
                <p className="py-6 text-center text-sm text-swap-dropdown-muted">
                  {errorLabel}
                </p>
              ) : null}

              {showEmptyState ? (
                <p className="py-6 text-center text-sm text-swap-dropdown-muted">
                  {emptyLabel}
                </p>
              ) : null}

              {assets.map((asset) => (
                <AssetOption
                  key={asset.id}
                  asset={asset}
                  onSelect={handlers.selectAsset}
                  isActive={asset.id === selectedAsset?.id}
                />
              ))}

              {showFooterSpinner ? (
                <div className="flex justify-center py-3 text-swap-dropdown-muted">
                  <Spinner label={loadingLabel} />
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default AssetDropdown;
