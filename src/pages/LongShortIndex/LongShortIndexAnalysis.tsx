import React, { useEffect, useMemo } from 'react';
import { Box, Divider, Grid, Skeleton, ToggleButton } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { EChartsOption, graphic } from 'echarts';
import dayjs from 'dayjs';
import { useLongShortIndex } from '../../slices/longShortIndex/hooks';
import { longShortIndexUtils } from '../../slices/longShortIndex/utils';
import DetachedToggleButtonGroup from '../../components/Custom/DetachedToggleButtonGroup';

export default function LongShortIndexAnalysis(): JSX.Element {
  const {
    exchangeOptions,
    getLongShortIndexHistory,
    loadingLongShortIndexHistory,
    longShortIndexHistory,
    pairList,
    selectExchange,
    selectPair,
    selectedExchange,
    selectedPair,
  } = useLongShortIndex();

  const chartOptions = useMemo<EChartsOption>(() => {
    const xData: string[] = [];
    const yData: number[] = [];
    const yData2: number[] = [];

    longShortIndexHistory.forEach((item) => {
      xData.push(dayjs(item.timestamp * 1000).format('YYYY-MM-DD HH:mm'));
      yData.push(item.bidsTotalVolume);
      yData2.push(item.asksTotalVolume);
    });

    return {
      legend: { data: ['Long', 'Short'] },
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
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#424166',
          fontSize: 14,
        },
      },
      series: [
        {
          data: yData,
          name: 'Long',
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
          data: yData2,
          name: 'Short',
          type: 'line',
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#8676FF',
              },
              {
                offset: 1,
                color: 'rgba(51, 63, 255, 0)',
              },
            ]),
          },
        },
      ],
      color: ['#58CFFF', '#8676FF'],
    };
  }, [longShortIndexHistory]);

  useEffect(() => {
    getLongShortIndexHistory();
  }, [getLongShortIndexHistory]);

  return (
    <Box>
      <Grid container alignItems="center">
        <Grid item sx={{ minWidth: 100 }}>
          <strong>Exchange:</strong>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <DetachedToggleButtonGroup
            exclusive
            value={selectedExchange}
            onChange={(e, value) => {
              if (value !== null) {
                selectExchange(value);
              }
            }}
          >
            {exchangeOptions.map((symbol) => (
              <ToggleButton key={symbol} value={symbol}>
                {longShortIndexUtils.getExchangeName(symbol)}
              </ToggleButton>
            ))}
          </DetachedToggleButtonGroup>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item sx={{ minWidth: 100 }}>
          <strong>Pair:</strong>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <DetachedToggleButtonGroup
            exclusive
            value={selectedPair}
            size="small"
            onChange={(e, value) => {
              if (value !== null) {
                selectPair(value);
              }
            }}
          >
            {pairList.map((item) => (
              <ToggleButton value={item.pair} key={item.pair}>
                {longShortIndexUtils.getPairName(item.pair)}
              </ToggleButton>
            ))}
          </DetachedToggleButtonGroup>
        </Grid>
        {/* <Grid item> */}
        {/*  <ToggleButtonGroup value={selectedCurrency} size="small"> */}
        {/*    <ToggleButton value="">USD-M</ToggleButton> */}
        {/*    <ToggleButton value="t">COIN-M</ToggleButton> */}
        {/*  </ToggleButtonGroup> */}
        {/* </Grid> */}
      </Grid>
      <Box sx={{ mt: 4 }}>
        {loadingLongShortIndexHistory && longShortIndexHistory.length === 0 ? (
          <Skeleton variant="rectangular" height={800} />
        ) : (
          <ReactECharts option={chartOptions} style={{ height: 800 }} />
        )}
      </Box>
    </Box>
  );
}
