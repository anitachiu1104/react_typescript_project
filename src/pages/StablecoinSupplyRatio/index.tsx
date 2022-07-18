import React, { useEffect, useMemo } from 'react';
import { EChartsOption, graphic } from 'echarts';
import { Box, Skeleton, Tab, Tabs, ToggleButton, Typography } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { useStablecoinSupplyRatio } from '../../slices/stablecoinSupplyRatio/hooks';
import CustomPaper from '../../components/Custom/CustomPaper';
import DetachedToggleButtonGroup from '../../components/Custom/DetachedToggleButtonGroup';

export default function StablecoinSupplyRatio(): JSX.Element {
  const { getData, loading, usdt, usdc, dai, busd, stablecoinSupplyRatio, stablecoinList, interval, setInterval } =
    useStablecoinSupplyRatio();

  const chartOptions = useMemo<EChartsOption>(() => {
    const xDataSet: Set<number> = new Set();
    const ratioObject: Record<string, number> = {};
    const usdcObject: Record<string, number> = {};
    const usdtObject: Record<string, number> = {};
    const busdObject: Record<string, number> = {};
    const daiObject: Record<string, number> = {};

    const ratio: number[] = [];
    const usdcY: number[] = [];
    const usdtY: number[] = [];
    const busdY: number[] = [];
    const daiY: number[] = [];

    stablecoinSupplyRatio.forEach((item) => {
      xDataSet.add(item.creationTime);
      ratioObject[dayjs(item.creationTime * 1000).format('YYYY-MM-DD')] = item.ratio;
    });

    usdc.forEach((item) => {
      xDataSet.add(item.creationTime);
      usdcObject[dayjs(item.creationTime * 1000).format('YYYY-MM-DD')] = item.totalSupply;
    });

    usdt.forEach((item) => {
      xDataSet.add(item.creationTime);
      usdtObject[dayjs(item.creationTime * 1000).format('YYYY-MM-DD')] = item.totalSupply;
    });

    busd.forEach((item) => {
      xDataSet.add(item.creationTime);
      busdObject[dayjs(item.creationTime * 1000).format('YYYY-MM-DD')] = item.totalSupply;
    });

    dai.forEach((item) => {
      xDataSet.add(item.creationTime);
      daiObject[dayjs(item.creationTime * 1000).format('YYYY-MM-DD')] = item.totalSupply;
    });

    const xData = Array.from(xDataSet)
      .sort((a, b) => a - b)
      .map((item) => dayjs(item * 1000).format('YYYY-MM-DD'));

    xData.forEach((item) => {
      ratio.push(ratioObject[item]);
      usdcY.push(usdcObject[item]);
      usdtY.push(usdtObject[item]);
      busdY.push(busdObject[item]);
      daiY.push(daiObject[item]);
    });

    return {
      legend: {
        data: ['Stablecoin Supply Ratio', ...stablecoinList.map((item) => item.toUpperCase())],
      },
      dataZoom: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xData,
        axisLine: {
          lineStyle: {
            color: '#BDBDBD',
          },
        },
        axisTick: {
          lineStyle: {
            color: '#BDBDBD',
          },
        },
        axisLabel: {
          color: '#424166',
          fontSize: 14,
        },
      },
      tooltip: {
        trigger: 'axis',
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          alignTicks: true,
          axisLabel: {
            color: '#424166',
            fontSize: 14,
            formatter: '{value}%',
          },
        },
        {
          type: 'value',
          position: 'right',
          alignTicks: true,
          axisLabel: {
            color: '#424166',
            fontSize: 14,
          },
        },
      ],
      series: [
        {
          data: ratio,
          name: 'Stablecoin Supply Ratio',
          type: 'line',
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00c1de',
              },
              {
                offset: 1,
                color: 'rgba(88, 207, 255, 0)',
              },
            ]),
          },
        },
        {
          data: usdtY,
          name: 'USDT',
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#FF5C5C',
              },
              {
                offset: 1,
                color: 'rgba(255, 92, 92, 0)',
              },
            ]),
          },
        },
        {
          data: usdcY,
          name: 'USDC',
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#F8359B',
              },
              {
                offset: 1,
                color: 'rgba(248, 53, 155, 0)',
              },
            ]),
          },
        },
        {
          data: busdY,
          name: 'BUSD',
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#F59720',
              },
              {
                offset: 1,
                color: 'rgba(245, 151, 32, 0)',
              },
            ]),
          },
        },
        {
          data: daiY,
          name: 'DAI',
          type: 'line',
          yAxisIndex: 1,
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#51FF23',
              },
              {
                offset: 1,
                color: 'rgba(81, 255, 35, 0)',
              },
            ]),
          },
        },
      ],
      color: ['#58CFFF', '#FF5C5C', '#F8359B', '#F59720', '#51FF23'],
    };
  }, [busd, dai, stablecoinList, stablecoinSupplyRatio, usdc, usdt]);

  useEffect(() => {
    getData().then();
  }, [getData]);

  return (
    <CustomPaper>
      <Tabs value="ratio">
        <Tab value="ratio" label="Stablecoin Supply Ratio" />
      </Tabs>
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          The Stablecoin Supply Ratio (SSR) is the ratio between Bitcoin supply and the supply of stablecoins denoted in
          BTC, or: Bitcoin Market cap / Stablecoin Market cap. We use the following stablecoins for the supply: USDT,
          USDC, DAI and BUSD. When the SSR is low, the current stablecoin supply has more &quot;buying power&quot; to
          purchase BTC. It serves as a proxy for the supply/demand mechanics between BTC and USD. For more information
          see this article.
        </Typography>
        <Typography sx={{ fontWeight: 500 }}>Assets</Typography>
        <Typography variant="subtitle2">BTC</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <DetachedToggleButtonGroup
          exclusive
          value={interval}
          onChange={(e, value) => {
            if (value !== null) {
              setInterval(value);
            }
          }}
        >
          <ToggleButton value={7}>7D</ToggleButton>
          <ToggleButton value={30}>1M</ToggleButton>
          <ToggleButton value={90}>3M</ToggleButton>
          <ToggleButton value={365}>1Y</ToggleButton>
        </DetachedToggleButtonGroup>
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" height={800} />
      ) : (
        <Box component={ReactECharts} option={chartOptions} style={{ height: 800 }} />
      )}
    </CustomPaper>
  );
}
