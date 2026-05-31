import { useCallback, useEffect, useRef, useState } from "react";
import { useGetAssetsQuery, type IAsset } from "@/06.entities";

const SEARCH_DEBOUNCE_MS = 600;
const SCROLL_THRESHOLD_PX = 64;

export interface IUseAssetSearchParams {
  /** When false, the underlying query is skipped (e.g. modal closed). */
  enabled: boolean;
}

export interface IUseAssetSearchValues {
  searchTerm: string;
  assets: IAsset[];
  /** First page is loading. */
  isLoading: boolean;
  /** Any request (incl. next page) is in flight. */
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean;
}

export interface IUseAssetSearchHandlers {
  setSearchTerm: (value: string) => void;
  resetSearch: () => void;
  handleListScroll: (event: React.UIEvent<HTMLDivElement>) => void;
}

export interface IUseAssetSearchResult {
  values: IUseAssetSearchValues;
  handlers: IUseAssetSearchHandlers;
}

/**
 * Data layer for asset selection: debounced search + paginated infinite scroll
 * over the RTK Query assets endpoint. Open/close is owned by the caller — this
 * hook only fetches while `enabled` is true. Shared by the inline dropdown and
 * the swap-flow token modal.
 */
export const useAssetSearch = ({
  enabled,
}: IUseAssetSearchParams): IUseAssetSearchResult => {
  const [searchTerm, setSearchTermState] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, isFetching, isError } = useGetAssetsQuery(
    { search: debouncedSearch, page },
    { skip: !enabled },
  );

  const assets = data?.data ?? [];
  const hasNextPage = data?.hasNextPage ?? false;

  const clearDebounce = useCallback((): void => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
  }, []);

  const setSearchTerm = useCallback(
    (value: string): void => {
      setSearchTermState(value);
      clearDebounce();
      debounceTimer.current = setTimeout(() => {
        setPage(1);
        setDebouncedSearch(value);
      }, SEARCH_DEBOUNCE_MS);
    },
    [clearDebounce],
  );

  const resetSearch = useCallback((): void => {
    clearDebounce();
    setSearchTermState("");
    setDebouncedSearch("");
    setPage(1);
  }, [clearDebounce]);

  useEffect(() => clearDebounce, [clearDebounce]);

  const handleListScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>): void => {
      const element = event.currentTarget;
      const distanceToBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight;
      if (
        distanceToBottom <= SCROLL_THRESHOLD_PX &&
        hasNextPage &&
        !isFetching
      ) {
        setPage((previous) => previous + 1);
      }
    },
    [hasNextPage, isFetching],
  );

  return {
    values: {
      searchTerm,
      assets,
      isLoading,
      isFetching,
      isError,
      hasNextPage,
    },
    handlers: {
      setSearchTerm,
      resetSearch,
      handleListScroll,
    },
  };
};
