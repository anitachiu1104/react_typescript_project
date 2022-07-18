import axios, { AxiosInstance } from 'axios';
import {
  Analysis,
  AccountProtocols,
  AccountTokens,
  Token,
  PaginationParams,
  PaginationResponse,
  Chain,
} from './api.type';

export class Web3Api {
  constructor(public client: AxiosInstance) {}

  getAnalysisList({ addressList }: { addressList: string[] }): Promise<Analysis[]> {
    return this.client.post<{ list: Analysis[] }>('/walletData/analysisInfo', { addressList }).then((response) =>
      response.data.list.map((item) => ({
        ...item,
        active30: item.active30 / 100,
        active90: item.active90 / 100,
        active360: item.active360 / 100,
        dayProfitRatio: item.dayProfitRatio / 100,
      })),
    );
  }

  getAnalysis({ address }: { address: string }): Promise<Analysis | undefined> {
    return this.getAnalysisList({ addressList: [address] }).then((response) =>
      response.length > 0 ? response[0] : undefined,
    );
  }

  getProtocolList(params: { addressList: string[]; detail?: boolean }): Promise<AccountProtocols[]> {
    return this.client
      .post<{ list: AccountProtocols[] }>('/walletData/protocolInfo', {
        detail: true,
        ...params,
      })
      .then((response) => response.data.list);
  }

  getProtocol({ address, ...params }: { address: string; detail?: boolean }): Promise<Chain[]> {
    return this.getProtocolList({ addressList: [address], ...params }).then((response) =>
      response.length > 0 ? response[0].chains : [],
    );
  }

  getTokenList(params: { addressList: string[]; minValueUsd?: number }): Promise<AccountTokens[]> {
    return this.client
      .post<{ list: AccountTokens[] }>('/walletData/tokenInfo', {
        minValueUsd: 1,
        ...params,
      })
      .then((response) => response.data.list);
  }

  getToken({ address, ...params }: { address: string; minValueUsd?: number }): Promise<Token[]> {
    return this.getTokenList({ addressList: [address], ...params }).then((response) =>
      response.length > 0 ? response[0].tokenList : [],
    );
  }

  getAddressRanking(params: PaginationParams = {}): Promise<PaginationResponse<Analysis>> {
    return this.client
      .post<PaginationResponse & { addressList: string[] }>('/walletData/listAddress', params)
      .then(({ data: { addressList, ...pagination } }) =>
        this.getAnalysisList({ addressList }).then((response) => ({
          ...pagination,
          data: response,
        })),
      );
  }
}

export const web3Api = new Web3Api(
  axios.create({
    baseURL: 'https://web3-api.bctrend.com/api/',
  }),
);
