export interface IApiError {
  id: string;
  status: number | string;
  message: string;
  endpoint?: string;
}

export interface IApiErrorState {
  errors: IApiError[];
}
