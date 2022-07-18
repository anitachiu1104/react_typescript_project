import React from 'react';
import { Box, Button, Grid, Skeleton, SxProps, Typography } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useParams } from 'react-router-dom';
import { numberFormat } from '../../utils/numberFormat';
import { useAnalysis } from '../../slices/wallet/hooks';
import CustomPaper from '../../components/Custom/CustomPaper';
import AccountDataItem from './AccountDataItem';

export function WalletAnalysis({ sx }: { sx?: SxProps }): JSX.Element {
  const { address } = useParams();
  const { analysis } = useAnalysis(address);

  return (
    <CustomPaper sx={{ p: 5, ...sx }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 5 }}>
        <Grid item>
          <Grid container spacing={2.5} alignItems="center" sx={{ mb: 1.25 }}>
            <Grid item>
              <Box sx={{ width: 80, height: 80, bgcolor: 'background.default', borderRadius: '50%' }} />
            </Grid>
            <Grid item>
              <Typography color="text.secondary" sx={{ mb: 1.25 }}>
                Total Assets
              </Typography>
              <Grid container spacing={1.25} alignItems="center">
                <Grid item>
                  {analysis ? (
                    <Typography variant="h6" sx={{ fontSize: '1.125rem' }}>
                      <strong>{numberFormat(analysis.total, 'currency')}</strong>
                    </Typography>
                  ) : (
                    <Skeleton width={80} height={20} />
                  )}
                </Grid>
                <Grid item>
                  <Typography>365 days</Typography>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      bgcolor: '#A8B2C4',
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <ReplayIcon sx={{ color: '#fff', fontSize: 14 }} />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography>{address}</Typography>
        </Grid>
        <Grid item>
          <Grid container spacing={1.25} flexDirection="column" alignItems="flex-end">
            <Grid item>
              <Button
                variant="contained"
                sx={{
                  borderRadius: 7.5,
                  boxShadow: '0px 2px 4px 0px rgba(133, 154, 255, 0.5)',
                  background: 'linear-gradient(133deg, #AED0FF 0%, #8676FF 100%);',
                  px: 3,
                  py: 1,
                  lineHeight: 1,
                }}
              >
                Compare
              </Button>
            </Grid>
            <Grid item>
              <Grid container spacing={2.5} alignItems="center">
                <Grid item>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'text.secondary',
                      minWidth: 140,
                      color: 'text.secondary',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Followings</Typography>
                    <Typography>
                      <strong>54</strong>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'text.secondary',
                      minWidth: 140,
                      color: 'text.secondary',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>Followers</Typography>
                    <Typography>
                      <strong>2</strong>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ border: 1, borderColor: 'text.secondary', p: 2.5, borderRadius: 3 }}>
        <Grid container spacing={0.4} flexDirection="column">
          <Grid item>
            <AccountDataItem title="Daily Txns" value={analysis?.dayTxNum} />
          </Grid>
          <Grid item>
            <AccountDataItem
              title="30/90/360 Days Activity"
              value={
                analysis
                  ? `${numberFormat(analysis.active30, 'percent')}/${numberFormat(
                      analysis.active90,
                      'percent',
                    )}/${numberFormat(analysis.active360, 'percent')}`
                  : undefined
              }
            />
          </Grid>
          <Grid item>
            <AccountDataItem title="Daily PnL" value={numberFormat(analysis?.dayProfit)} />
          </Grid>
          <Grid item>
            <AccountDataItem title="Daily PnL Ratio" value={numberFormat(analysis?.dayProfitRatio, 'percent')} />
          </Grid>
          <Grid item>
            <AccountDataItem title="Stable Coin%" value={numberFormat(analysis?.stableCoinOccupation, 'percent')} />
          </Grid>
        </Grid>
      </Box>
    </CustomPaper>
  );
}
