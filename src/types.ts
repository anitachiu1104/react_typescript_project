export interface LongShortIndex {
  abbr: string;
  asksTotalVolume: number;
  bidsRatio: number;
  bidsTotalVolume: number;
  coinPrice: number;
  timestamp: number;
}

export interface ExchangeAndPair {
  contractType: string;
  exchange: string;
  pair: string;
}

export interface SocialMedia {
  id: string;
  available: boolean;
  name: string;
}

export interface SocialMediaLatest extends SocialMedia {
  totalMember: number;

  onlineMember?: number;
  changeRatio?: number;
  changeNumber?: number;
}

export interface SocialMediaHistory {
  totalMember: number;
  onlineMember: number;
  creationTime: number;
}

export interface StablecoinSupplyRatio {
  ratio: number;
  creationTime: number;
}

export interface StablecoinTotalSupply {
  totalSupply: number;
  creationTime: number;
}
