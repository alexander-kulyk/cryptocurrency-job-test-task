export type SwapDirection = "from" | "to";

export interface ISwapPreviewPayload {
  fromAssetId: number;
  toAssetId: number;
  direction: SwapDirection;
  amount: string;
  balanceType: ["main", "trade"];
}

export interface ISwapPreviewResponse {
  estimatedGive: string;
  estimatedReceive: string;
  estimatedRate: string;
  estimatedUsdtEquivalent: string;
}
