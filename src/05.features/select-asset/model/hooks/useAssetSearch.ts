import { useCallback, useEffect, useRef, useState } from 'react';
import { assetApi, useGetAssetsQuery, type IAsset } from '@/06.entities';
import { useAbortOnUnmount, useAppDispatch } from '@/07.shared/hooks';

const SEARCH_DEBOUNCE_MS = 600;
const LOAD_MORE_ZONE_PX = 96;

export interface IUseAssetSearchParams {
  enabled: boolean;
}

export interface IUseAssetSearchValues {
  searchTerm: string;
  assets: IAsset[];
  isLoading: boolean;
  isFetching: boolean;
  isFetchingMore: boolean;
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

export const useAssetSearch = ({
  enabled,
}: IUseAssetSearchParams): IUseAssetSearchResult => {
  const [searchTerm, setSearchTermState] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const dispatch = useAppDispatch();
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousQueryRef = useRef<{
    enabled: boolean;
    page: number;
    search: string;
  } | null>(null);

  const { data, isLoading, isFetching, isError } = useGetAssetsQuery(
    { search: debouncedSearch, page },
    { skip: !enabled },
  );

  const assets = data?.data ?? [];
  const hasNextPage = data?.hasNextPage ?? false;
  const isFetchingMore = page > 1 && isFetching && assets.length > 0;

  const abortAssetsRequest = useCallback(
    (search: string, targetPage: number): void => {
      dispatch(
        assetApi.util.getRunningQueryThunk('getAssets', {
          search,
          page: targetPage,
        }),
      )?.abort();
    },
    [dispatch],
  );

  useEffect(() => {
    const previous = previousQueryRef.current;
    const shouldAbortPrevious =
      previous?.enabled && (!enabled || previous.search !== debouncedSearch);

    if (shouldAbortPrevious) {
      abortAssetsRequest(previous.search, previous.page);
    }

    previousQueryRef.current = {
      enabled,
      search: debouncedSearch,
      page,
    };
  }, [abortAssetsRequest, debouncedSearch, enabled, page]);

  useAbortOnUnmount(() => {
    const current = previousQueryRef.current;
    if (current?.enabled) {
      abortAssetsRequest(current.search, current.page);
    }
  });

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
    setSearchTermState('');
    setDebouncedSearch('');
    setPage(1);
  }, [clearDebounce]);

  useEffect(() => clearDebounce, [clearDebounce]);

  const handleListScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>): void => {
      const element = event.currentTarget;
      const distanceToBottom =
        element.scrollHeight - element.scrollTop - element.clientHeight;
      if (
        distanceToBottom <= LOAD_MORE_ZONE_PX &&
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
      isFetchingMore,
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
