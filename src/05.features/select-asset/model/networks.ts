/**
 * Presentational network/chain labels keyed by asset symbol.
 *
 * The assets endpoint (`IAsset`) does not expose a chain, so the network pill
 * shown in the token list is purely cosmetic. This map covers the common
 * tokens from the design; unknown symbols render no pill (graceful fallback)
 * rather than inventing a value.
 */
const NETWORK_BY_SYMBOL: Readonly<Record<string, string>> = {
  ETH: "Ethereum",
  USDT: "Tron",
  USDC: "Ethereum",
  BNB: "BSC",
  SOL: "Solana",
  XRP: "Ripple",
  BTC: "Bitcoin",
  TRX: "Tron",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  MATIC: "Polygon",
  DOT: "Polkadot",
};

/** Symbols rendered as quick-pick chips at the top of the token modal. */
export const QUICK_PICK_SYMBOLS: readonly string[] = [
  "ETH",
  "USDT",
  "USDC",
  "BNB",
  "SOL",
];

/** Returns a presentational chain label for a symbol, or null if unknown. */
export const getNetworkLabel = (symbol: string): string | null =>
  NETWORK_BY_SYMBOL[symbol.toUpperCase()] ?? null;
