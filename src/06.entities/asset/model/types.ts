export interface IAsset {
  id: number;
  symbol: string;
  name: string;
  assetImage: string;
}

export interface IAssetsResponse {
  data: IAsset[];
  currentPage: number;
  hasNextPage: boolean;
  maximumPages: number;
}

export interface IAssetsQueryArg {
  search: string;
  page: number;
}
