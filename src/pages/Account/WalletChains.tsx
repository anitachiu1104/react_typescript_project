import React from 'react';
import { Button, Grid, SxProps, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useParams } from 'react-router-dom';
import { numberFormat } from '../../utils/numberFormat';
import { useChain } from '../../slices/wallet/hooks';
import CustomPaper from '../../components/Custom/CustomPaper';
import AssetBar from './AssetBar';

export function WalletChains({ sx }: { sx?: SxProps }): JSX.Element {
  const { address } = useParams();
  const { chains, total } = useChain(address);

  return (
    <CustomPaper sx={{ p: 5, ...sx }}>
      <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3.75 }}>
        <Grid item>
          <Typography color="primary" variant="subtitle1">
            <strong>Chains</strong>
          </Typography>
        </Grid>
        <Grid item>
          <Button>
            <Typography variant="subtitle1">
              <strong>{numberFormat(total, 'currency')}</strong>
            </Typography>
            <ArrowDropDownIcon />
          </Button>
        </Grid>
      </Grid>
      {chains.map((item) => (
        <AssetBar key={item.chain} chain={item} sx={{ mb: 5 }} />
      ))}
    </CustomPaper>
  );
}
