import React from 'react';
import { Box, Grid, SxProps, Typography } from '@mui/material';
import { Chain } from '../../libs/api.type';
import { numberFormat } from '../../utils/numberFormat';
import AssetItem from './AssetItem';

export default function AssetBar({
  sx,
  color = '#8676FF',
  chain,
}: {
  sx?: SxProps;
  color?: string;
  chain?: Chain;
}): JSX.Element {
  return (
    <Box sx={{ ...sx }}>
      <Box sx={{ display: 'flex', width: chain?.amountRatio, minWidth: 250, alignItems: 'center' }}>
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              height: 60,
              p: 1.25,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              bgcolor: color,
            }}
          >
            <Box sx={{ width: 40, height: 40, bgcolor: '#fff', borderRadius: '50%', mr: 1.25 }} />
            <Typography variant="subtitle1" sx={{ color: '#fff', textTransform: 'uppercase' }}>
              {chain?.chain}
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ whiteSpace: 'nowrap', ml: 2.5 }}>
          <strong>{numberFormat(chain?.totalAmount, 'currency')}</strong>
        </Typography>
      </Box>
      <Grid container spacing={2.5} sx={{ mt: 2 }}>
        {(chain?.protocols ?? []).map((item) => (
          <Grid item>
            <AssetItem key={item.protocol} name={item.protocol} amount={item.amount} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
