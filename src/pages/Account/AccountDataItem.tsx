import React from 'react';
import { Grid, Skeleton, Typography } from '@mui/material';

export default function AccountDataItem({
  title,
  value,
}: {
  title: string | JSX.Element;
  value?: number | string | JSX.Element;
}): JSX.Element {
  return (
    <Grid container spacing={2} justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography>{title}</Typography>
      </Grid>
      <Grid item>{value !== undefined ? <Typography>{value}</Typography> : <Skeleton width={120} height={14} />}</Grid>
    </Grid>
  );
}
