import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { ExchangeAndPair, LongShortIndex } from '../../types';
import { longShortIndexActions } from './actions';
import { longShortIndexUtils } from './utils';

function getExchangeList(list: ExchangeAndPair[], selectedContractType: string): ExchangeAndPair[] {
  return list.filter((item) => item.contractType === selectedContractType);
}

function getExchangeOptions(list: ExchangeAndPair[]): string[] {
  return Array.from(new Set(list.map((item) => item.exchange)));
}

function getPairList(list: ExchangeAndPair[], selectedExchange: string): ExchangeAndPair[] {
  return list.filter((item) => item.exchange === selectedExchange);
}

function existExchange(exchangeOptions: string[], selectedExchange: string): boolean {
  return exchangeOptions.length > 0 && exchangeOptions.some((item) => item === selectedExchange);
}

function existPair(pairList: ExchangeAndPair[], selectedPair: string): boolean {
  return pairList.length > 0 && pairList.some((item) => item.pair === selectedPair);
}

function getNextExchange(
  list: ExchangeAndPair[],
  nextContractType: string,
  selectedExchange: string,
): { nextExchangeList: ExchangeAndPair[]; nextSelectedExchange: string } {
  const nextExchangeList = getExchangeList(longShortIndexUtils.pairList, nextContractType);
  const nextExchangeOptions = getExchangeOptions(nextExchangeList);

  return {
    nextExchangeList,
    nextSelectedExchange: existExchange(nextExchangeOptions, selectedExchange)
      ? selectedExchange
      : nextExchangeOptions[0],
  };
}

function getNextPair(exchangeList: ExchangeAndPair[], selectedExchange: string, selectedPair: string): string {
  const nextPairList = getPairList(exchangeList, selectedExchange);
  return existPair(nextPairList, selectedPair) ? selectedPair : nextPairList[0].pair;
}

export function useLongShortIndex(): {
  exchangeList: ExchangeAndPair[];
  exchangeOptions: string[];
  getLongShortIndexHistory: () => Promise<void>;
  getLongShortIndexList: () => void;
  loadingLongShortIndex: boolean;
  loadingLongShortIndexHistory: boolean;
  longShortIndexHistory: LongShortIndex[];
  longShortIndexList: LongShortIndex[];
  pairList: ExchangeAndPair[];
  selectContractType: (value: string) => void;
  selectCurrency: (value: string) => void;
  selectExchange: (value: string) => void;
  selectPair: (value: string) => void;
  selectedContractType: string;
  selectedCurrency: string;
  selectedExchange: string;
  selectedPair: string;
} {

  const dispatch = useAppDispatch();
  const {
    loadingLongShortIndex,
    longShortIndex,
    selectedContractType,
    selectedCurrency,
    selectedExchange,
    selectedPair,
  } = useAppSelector((state) => state.longShortIndex);
  const [loadingLongShortIndexHistory, setLoadingLongShortIndexHistory] = useState<boolean>(false);

  const exchangeList = useMemo(
    () => getExchangeList(longShortIndexUtils.pairList, selectedContractType),
    [selectedContractType],
  );

  const exchangeOptions = useMemo(() => getExchangeOptions(exchangeList), [exchangeList]);

  const pairList = useMemo(() => getPairList(exchangeList, selectedExchange), [exchangeList, selectedExchange]);

  const longShortIndexList = useMemo(
    () =>
      exchangeList
        .map<LongShortIndex | undefined>((item) => {
          const abbr = longShortIndexUtils.getAbbr(item);
          const data = longShortIndex[abbr];
          return data && data.length > 0 ? { ...data[data.length - 1], abbr } : undefined;
        })
        .filter((item): item is LongShortIndex => item !== undefined),
    [exchangeList, longShortIndex],
  );
  console.log("###########",exchangeList)
  console.log(longShortIndex)
  const longShortIndexHistory = useMemo(() => {
    const abbr = longShortIndexUtils.getAbbr({
      contractType: selectedContractType,
      pair: selectedPair,
      exchange: selectedExchange,
    });
    return longShortIndex[abbr] ?? [];
  }, [longShortIndex, selectedContractType, selectedExchange, selectedPair]);

  const selectCurrency = useCallback(
    (value: string) => {
      dispatch(longShortIndexActions.selectCurrency(value));
    },
    [dispatch],
  );

  const getLongShortIndexList = useCallback(() => {
    dispatch(
      longShortIndexActions.getLongShortIndexList(exchangeList.map((item) => longShortIndexUtils.getAbbr(item))),
    );
  }, [dispatch, exchangeList]);

  const selectPair = useCallback(
    (value: string) => {
      dispatch(longShortIndexActions.selectPair(value));
    },
    [dispatch],
  );

  const selectExchange = useCallback(
    (value: string) => {
      dispatch(longShortIndexActions.selectExchange(value));
      dispatch(longShortIndexActions.selectPair(getNextPair(exchangeList, value, selectedPair)));
    },
    [dispatch, exchangeList, selectedPair],
  );

  const selectContractType = useCallback(
    (value: string) => {
      const { nextExchangeList, nextSelectedExchange } = getNextExchange(
        longShortIndexUtils.pairList,
        value,
        selectedExchange,
      );

      dispatch(longShortIndexActions.selectContractType(value));
      dispatch(longShortIndexActions.selectExchange(nextSelectedExchange));
      dispatch(longShortIndexActions.selectPair(getNextPair(nextExchangeList, nextSelectedExchange, selectedPair)));
    },
    [dispatch, selectedExchange, selectedPair],
  );

  const getLongShortIndexHistory = useCallback(async () => {
    try {
      setLoadingLongShortIndexHistory(true);
      await dispatch(
        longShortIndexActions.getLongShortIndexList([
          longShortIndexUtils.getAbbr({
            contractType: selectedContractType,
            pair: selectedPair,
            exchange: selectedExchange,
          }),
        ]),
      );
    } finally {
      setLoadingLongShortIndexHistory(false);
    }
  }, [dispatch, selectedContractType, selectedExchange, selectedPair]);

  return {
    exchangeList,
    exchangeOptions,
    getLongShortIndexHistory,
    getLongShortIndexList,
    loadingLongShortIndex,
    loadingLongShortIndexHistory,
    longShortIndexHistory,
    longShortIndexList,
    pairList,
    selectContractType,
    selectCurrency,
    selectExchange,
    selectPair,
    selectedContractType,
    selectedCurrency,
    selectedExchange,
    selectedPair,
  };
}
