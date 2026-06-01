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

export const QUICK_PICK_SYMBOLS: readonly string[] = [
  "ETH",
  "USDT",
  "USDC",
  "BNB",
  "SOL",
];

export const getNetworkLabel = (symbol: string): string | null =>
  NETWORK_BY_SYMBOL[symbol.toUpperCase()] ?? null;
