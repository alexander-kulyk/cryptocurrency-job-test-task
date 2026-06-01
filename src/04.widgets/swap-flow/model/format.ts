import { formatDecimal } from "@/07.shared/lib";

const USD_STABLECOINS: ReadonlySet<string> = new Set(["USDT", "USDC", "DAI", "BUSD"]);

export const isUsdStable = (symbol: string | undefined): boolean =>
  symbol ? USD_STABLECOINS.has(symbol.toUpperCase()) : false;

export const formatUsd = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  return `≈$${formatDecimal(parsed)}`;
};

export const truncateAddress = (
  address: string,
  head = 6,
  tail = 6,
): string => {
  const trimmed = address.trim();
  if (trimmed.length <= head + tail + 1) {
    return trimmed;
  }
  return `${trimmed.slice(0, head)}…${trimmed.slice(-tail)}`;
};
