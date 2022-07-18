export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginationResponse<T = any> {
  count: number;
  page: number;
  pageCount: number;
  pageSize: number;
  data: T[];
}

export interface Analysis {
  address: string;
  total: number;
  dayProfit: number;
  dayProfitRatio: number;
  dayTxNum: number;
  stableCoinOccupation: number;
  active30: number;
  active90: number;
  active360: number;
}

export interface AccountProtocols {
  address: string;
  chains: Chain[];
}

export interface Chain {
  chain: string;
  totalAmount: number;
  protocols: Protocol[];
  amountRatio?: number;
}

export interface Protocol {
  amount: number;
  chain: string;
  protocol: string;
}

export interface AccountTokens {
  address: string;
  tokenList: Token[];
}

export interface Token {
  chain: string;
  contract: string;
  name: string;
  symbol: string;
  amount: number;
  price: number;
  valueUsd: number;
}

export type LongShortIndexResponse = [string, number, number, string, number][];
