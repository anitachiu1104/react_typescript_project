import React, { useEffect, useMemo, useState } from 'react';
import { Autocomplete, Box, Grid, Skeleton, TextField } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import dayjs from 'dayjs';
import { EChartsOption, graphic } from 'echarts';
import { useAppDispatch, useAppSelector } from '../../store';
import { socialMediaActions } from '../../slices/socialMedia/actions';
import { SocialMedia } from '../../types';

export default function SocialMediaAnalysis(): JSX.Element {
  const [selectedSocialMedia, setSelectedSocialMedia] = useState<SocialMedia | null>(null);
  const [loadingSocialMediaList, setLoadingSocialMediaList] = useState<boolean>(false);
  const [loadingSocialMediaHistory, setLoadingSocialMediaHistory] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { socialMediaList, socialMediaHistory } = useAppSelector((state) => state.socialMedia);

  const chartOptions = useMemo<EChartsOption>(() => {
    let time = dayjs(0);
    const dateList: string[] = [];
    const totalMemberList: number[] = [];

    socialMediaHistory.forEach((item) => {
      const currentTime = dayjs(item.creationTime * 1000).startOf('day');

      if (currentTime.isSame(time)) {
        return;
      }

      time = currentTime;
      dateList.push(time.format('YYYY-MM-DD'));
      totalMemberList.push(item.totalMember);
    });

    return {
      legend: {
        data: ['Telegram'],
      },
      dataZoom: {},
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dateList,
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
          data: totalMemberList,
          name: 'Telegram',
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
      ],
      color: ['#58CFFF'],
    };
  }, [socialMediaHistory]);

  useEffect(() => {
    setLoadingSocialMediaList(true);
    const fetchData = async (): Promise<void> => {
      const response = await dispatch(socialMediaActions.getSocialMediaList()).unwrap();

      setSelectedSocialMedia((state) => {
        if (state !== null && response.find((item) => item.id === state.id)) {
          return state;
        }

        if (response.length === 0) {
          return null;
        }

        return response[0];
      });
    };
    fetchData().finally(() => {
      setLoadingSocialMediaList(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (selectedSocialMedia?.id === undefined) {
      return;
    }
    setLoadingSocialMediaHistory(true);
    dispatch(socialMediaActions.getSocialMediaHistory({ id: selectedSocialMedia.id })).finally(() => {
      setLoadingSocialMediaHistory(false);
    });
  }, [dispatch, selectedSocialMedia?.id]);

  return (
    <Box>
      <Grid container justifyContent="space-between">
        <Grid item />
        <Grid item>
          <Box sx={{ py: 2 }}>
            {loadingSocialMediaList ? (
              <Skeleton width={180} height={40} variant="rectangular" />
            ) : (
              <Autocomplete
                size="small"
                sx={{ width: 180 }}
                value={selectedSocialMedia}
                onChange={(_, newValue) => {
                  if (newValue !== null) {
                    setSelectedSocialMedia(newValue);
                  }
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} />}
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                options={socialMediaList}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      {loadingSocialMediaHistory || loadingSocialMediaList ? (
        <Skeleton variant="rectangular" height={800} />
      ) : (
        <Box component={ReactECharts} option={chartOptions} style={{ height: 800 }} />
      )}
    </Box>
  );
}
