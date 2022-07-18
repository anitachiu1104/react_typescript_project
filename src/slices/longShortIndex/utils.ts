import { ExchangeAndPair } from '../../types';

const fullAbbrList: string[] =
  'osbt/oset/opbt/opet/opb/ope/ofbt/ofet/ofb/ofe/bsbt/bset/bpbt/bpet/bpb/bpe/bfb/bfe/fpb/fpe'.split('/');

function isValidAbbr(abbr: string): boolean {
  return abbr.length >= 3;
}

function requireValidAbbr(abbr: string): void {
  if (!isValidAbbr(abbr)) {
    throw new Error('Invalid abbr.');
  }
}

function getPairInfoFromAbbr(abbr: string): ExchangeAndPair {
  requireValidAbbr(abbr);
  console.log(abbr,"#####")
  return {
    contractType: abbr[1],
    exchange: abbr[0],
    pair: abbr.length === 4 ? abbr.slice(2, 4) : abbr[2],
  };
}

function getPairList(): ExchangeAndPair[] {
  return fullAbbrList.map((item) => getPairInfoFromAbbr(item));
}

const pairList = getPairList();

function getExchangeName(symbol: string): string | undefined {
  return {
    b: 'Binance',
    o: 'OKX',
    f: 'FTX',
  }[symbol];
}

function getPairName(pair: string): string | undefined {
  return {
    b: 'BTC/USD',
    e: 'ETH/USD',
    bt: 'BTC/USDT',
    et: 'ETH/USDT',
  }[pair];
}

function getAbbr({ contractType, exchange, pair }: ExchangeAndPair): string {
  return `${exchange}${contractType}${pair}`;
}

export const longShortIndexUtils = {
  getAbbr,
  getExchangeName,
  getPairInfoFromAbbr,
  getPairName,
  pairList,
};
