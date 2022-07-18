import React from 'react';
import { Button, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useParams } from 'react-router-dom';
import { numberFormat } from '../../utils/numberFormat';
import { useToken } from '../../slices/wallet/hooks';
import CustomPaper from '../../components/Custom/CustomPaper';
import { WalletAnalysis } from './WalletAnalysis';
import { WalletChains } from './WalletChains';

export default function Account(): JSX.Element {
  const { address } = useParams();
  const { tokens, totalValueUsd } = useToken(address);

  return (
    <>
      <WalletAnalysis sx={{ mb: 5 }} />
      <WalletChains sx={{ mb: 5 }} />
      <CustomPaper sx={{ p: 5, mb: 5 }}>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3.75 }}>
          <Grid item>
            <Typography color="primary" variant="subtitle1">
              <strong>Wallet</strong>
            </Typography>
          </Grid>
          <Grid item>
            <Button>
              <Typography variant="subtitle1">
                <strong>{numberFormat(totalValueUsd, 'currency')}</strong>
              </Typography>
              <ArrowDropDownIcon />
            </Button>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Assets</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((item) => (
              <TableRow key={item.contract + item.symbol}>
                <TableCell>{item.symbol}</TableCell>
                <TableCell>{numberFormat(item.price, 'currency')}</TableCell>
                <TableCell>{numberFormat(item.amount)}</TableCell>
                <TableCell>{numberFormat(item.valueUsd, 'currency')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomPaper>
      {/* <CustomPaper sx={{ p: 5 }}> */}
      {/*  <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 3.75 }}> */}
      {/*    <Grid item> */}
      {/*      <Grid container spacing={1.25} alignItems="center"> */}
      {/*        <Grid item> */}
      {/*          <Box sx={{ width: 40, height: 40, bgcolor: 'text.secondary', borderRadius: '50%' }} /> */}
      {/*        </Grid> */}
      {/*        <Grid item> */}
      {/*          <Typography color="primary" variant="subtitle1"> */}
      {/*            <strong>Conves</strong> */}
      {/*          </Typography> */}
      {/*        </Grid> */}
      {/*      </Grid> */}
      {/*    </Grid> */}
      {/*    <Grid item> */}
      {/*      <Button> */}
      {/*        <Typography variant="subtitle1"> */}
      {/*          <strong>$1,234</strong> */}
      {/*        </Typography> */}
      {/*        <ArrowDropDownIcon /> */}
      {/*      </Button> */}
      {/*    </Grid> */}
      {/*  </Grid> */}
      {/*  <Table> */}
      {/*    <TableHead> */}
      {/*      <TableRow> */}
      {/*        <TableCell>Assets</TableCell> */}
      {/*        <TableCell>Price</TableCell> */}
      {/*        <TableCell>Unlock time</TableCell> */}
      {/*        <TableCell>Value</TableCell> */}
      {/*      </TableRow> */}
      {/*    </TableHead> */}
      {/*    <TableBody> */}
      {/*      <TableRow> */}
      {/*        <TableCell>1</TableCell> */}
      {/*        <TableCell>0x3bs2….87b3</TableCell> */}
      {/*        <TableCell>$4321.0</TableCell> */}
      {/*        <TableCell>$4321.0</TableCell> */}
      {/*      </TableRow> */}
      {/*      <TableRow> */}
      {/*        <TableCell>1</TableCell> */}
      {/*        <TableCell>0x3bs2….87b3</TableCell> */}
      {/*        <TableCell>$4321.0</TableCell> */}
      {/*        <TableCell>$4321.0</TableCell> */}
      {/*      </TableRow> */}
      {/*    </TableBody> */}
      {/*  </Table> */}
      {/* </CustomPaper> */}
    </>
  );
}
