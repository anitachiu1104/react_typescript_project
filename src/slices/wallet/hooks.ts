import { useCallback, useEffect, useMemo, useState } from 'react';
import { Analysis, Chain, PaginationParams, PaginationResponse, Token } from '../../libs/api.type';
import { web3Api } from '../../libs/web3Api';

export function useAnalysis(address?: string): { analysis?: Analysis } {
  const [analysis, setAnalysis] = useState<Analysis | undefined>();
  const getAnalysis = useCallback(() => {
    if (address) {
      web3Api.getAnalysis({ address }).then(setAnalysis);
    }
  }, [address]);

  useEffect(() => {
    getAnalysis();
  }, [getAnalysis]);

  return { analysis };
}

export function useChain(address?: string): { total: number; chains: Chain[] } {
  const [chains, setChains] = useState<Chain[]>([]);

  useEffect(() => {
    if (address) {
      web3Api.getProtocol({ address }).then(setChains);
    }
  }, [address]);

  return useMemo(
    () => ({
      total: chains.reduce((prev, curr) => prev + curr.totalAmount, 0),
      chains: chains.map((chain) => ({
        ...chain,
        amountRatio: chain.totalAmount / chains[0].totalAmount,
      })),
    }),
    [chains],
  );
}

export function useToken(address?: string): { totalValueUsd: number; tokens: Token[] } {
  const [tokens, setTokens] = useState<Token[]>([]);

  const getToken = useCallback(() => {
    if (address) {
      web3Api.getToken({ address }).then(setTokens);
    }
  }, [address]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return useMemo(
    () => ({
      totalValueUsd: tokens.reduce((prev, curr) => prev + curr.valueUsd, 0),
      tokens,
    }),
    [tokens],
  );
}

export function useAddressRanking(): PaginationResponse<Analysis> & {
  getData: (params?: PaginationParams) => void;
  loading: boolean;
} {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<PaginationResponse<Analysis>>({
    count: 0,
    page: 1,
    pageCount: 1,
    pageSize: 10,
    data: [],
  });

  const getData = useCallback(
    (params: PaginationParams = {}) => {
      setLoading(true);
      web3Api
        .getAddressRanking({ page: state.page, pageSize: state.pageSize, ...params })
        .then((response) => {
          setState((s) => ({
            ...s,
            ...response,
          }));
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [state.page, state.pageSize],
  );

  useEffect(() => {
    getData();
  }, []);

  return {
    ...state,
    getData,
    loading,
  };
}
