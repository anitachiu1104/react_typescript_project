import { useCallback, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../store';
import { StablecoinSupplyRatio, StablecoinTotalSupply } from '../../types';
import { getStablecoinSupplyRatio, getStablecoinTotalSupply } from './actions';

function intervalFilter<T>(list: T[], getTime: (item: T) => Dayjs, interval: number): T[] {
  if (list.length === 0) {
    return [];
  }

  let date = getTime(list[0]).startOf('day');

  return list.filter((item) => {
    const currentData = getTime(item).startOf('day');

    if (!date.isSame(currentData)) {
      return false;
    }

    date = currentData.subtract(interval, 'day');

    return true;
  });
}

export function useStablecoinSupplyRatio(): {
  busd: StablecoinTotalSupply[];
  dai: StablecoinTotalSupply[];
  getData: () => Promise<void>;
  loading: boolean;
  stablecoinList: string[];
  stablecoinSupplyRatio: StablecoinSupplyRatio[];
  usdc: StablecoinTotalSupply[];
  usdt: StablecoinTotalSupply[];
  interval: number;
  setInterval: (value: number) => void;
} {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [interval, setInterval] = useState<number>(7);
  const { stablecoinSupplyRatio, usdc, dai, usdt, busd } = useAppSelector((state) => state.stablecoinSupplyRatio);
  const stablecoinList = useMemo(() => ['usdt', 'usdc', 'dai', 'busd'], []);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        dispatch(getStablecoinSupplyRatio()),
        ...stablecoinList.map((item) => dispatch(getStablecoinTotalSupply(item))),
      ]);
    } finally {
      setLoading(false);
    }
  }, [dispatch, stablecoinList]);

  return {
    busd: intervalFilter(busd.slice().reverse(), (item) => dayjs(item.creationTime * 1000), interval).reverse(),
    dai: intervalFilter(dai.slice().reverse(), (item) => dayjs(item.creationTime * 1000), interval).reverse(),
    getData,
    loading,
    stablecoinList,
    stablecoinSupplyRatio: intervalFilter(
      stablecoinSupplyRatio.slice().reverse(),
      (item) => dayjs(item.creationTime * 1000),
      interval,
    ).reverse(),
    usdc: intervalFilter(usdc.slice().reverse(), (item) => dayjs(item.creationTime * 1000), interval).reverse(),
    usdt: intervalFilter(usdt.slice().reverse(), (item) => dayjs(item.creationTime * 1000), interval).reverse(),
    interval,
    setInterval,
  };
}
