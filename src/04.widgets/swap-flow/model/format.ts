/** USD-pegged stablecoin symbols whose amount can be shown directly as USD. */
const USD_STABLECOINS: ReadonlySet<string> = new Set(["USDT", "USDC", "DAI", "BUSD"]);

export const isUsdStable = (symbol: string | undefined): boolean =>
  symbol ? USD_STABLECOINS.has(symbol.toUpperCase()) : false;

/**
 * Formats a numeric string as a `≈$N.NN` USD estimate. Returns null for empty
 * or non-numeric input so the caller can omit the line gracefully.
 */
export const formatUsd = (value: string | undefined): string | null => {
  if (!value) {
    return null;
  }
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }
  const fixed = parsed >= 1000 ? parsed.toFixed(0) : parsed.toFixed(2);
  return `≈$${fixed.replace(/\.00$/, "")}`;
};

/** Truncates a long address to `head…tail` for compact display. */
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
