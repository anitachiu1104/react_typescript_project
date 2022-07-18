import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { numberFormat } from '../../utils/numberFormat';

export default function AssetItem({ name, amount }: { name: string; amount: number }): JSX.Element {
  return (
    <Box sx={{ px: 1.25, py: 1.25, minWidth: 210, border: 1, borderColor: 'text.secondary', borderRadius: 2 }}>
      <Grid container spacing={1.25} alignItems="center">
        <Grid item>
          <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'text.secondary' }} />
        </Grid>
        <Grid item>
          <Typography color="text.secondary">{name}</Typography>
          <Typography variant="subtitle1">
            <strong>{numberFormat(amount, 'currency')}</strong>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
