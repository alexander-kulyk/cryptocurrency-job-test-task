import { useCallback, useEffect, useRef, useState } from 'react';
import { useGetAssetsQuery, type IAsset } from '@/06.entities';
import { useOnClickOutside } from '@/07.shared/hooks';

const SEARCH_DEBOUNCE_MS = 600;
const SCROLL_THRESHOLD_PX = 64;

export interface IUseAssetDropdownParams {
  onSelect: (asset: IAsset) => void;
}

export interface IUseAssetDropdownValues {
  isOpen: boolean;
  searchTerm: string;
  assets: IAsset[];
  /** First page is loading. */
  isLoading: boolean;
  /** Any request (incl. next page) is in flight. */
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export interface IUseAssetDropdownHandlers {
  open: () => void;
  close: () => void;
  toggle: () => void;
  setSearchTerm: (value: string) => void;
  selectAsset: (asset: IAsset) => void;
  handleListScroll: (event: React.UIEvent<HTMLDivElement>) => void;
}

export interface IUseAssetDropdownResult {
  values: IUseAssetDropdownValues;
  handlers: IUseAssetDropdownHandlers;
}

export const useAssetDropdown = ({
  onSelect,
}: IUseAssetDropdownParams): IUseAssetDropdownResult => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTermState] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data, isLoading, isFetching, isError } = useGetAssetsQuery(
    { search: debouncedSearch, page },
    { skip: !isOpen },
  );

  const assets = data?.data ?? [];
  const hasNextPage = data?.hasNextPage ?? false;

  const close = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const open = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const toggle = useCallback((): void => {
    setIsOpen((previous) => !previous);
  }, []);

  useOnClickOutside(containerRef, close, isOpen);

  const setSearchTerm = useCallback((value: string): void => {
    setSearchTermState(value);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setPage(1);
      setDebouncedSearch(value);
    }, SEARCH_DEBOUNCE_MS);
  }, []);

  useEffect(
    () => () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    },
    [],
  );

  const selectAsset = useCallback(
    (asset: IAsset): void => {
      onSelect(asset);
      setIsOpen(false);
      setSearchTermState('');
      setDebouncedSearch('');
      setPage(1);
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    },
    [onSelect],
  );

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
      isOpen,
      searchTerm,
      assets,
      isLoading,
      isFetching,
      isError,
      hasNextPage,
      containerRef,
    },
    handlers: {
      open,
      close,
      toggle,
      setSearchTerm,
      selectAsset,
      handleListScroll,
    },
  };
};
