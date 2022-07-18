export enum ChainId {
  mainnet = 1,
  ropsten = 3,
  rinkeby = 4,
  goerli = 5,
  kovan = 42,
  bscMainnet = 56,
  bscTestnet = 97,
}

export interface Config {}

export interface Environment {
  config: { readonly [chainId in ChainId]?: Config };
}

export const env: Environment = {
  config: {},
};
