import React from 'react';
import { Box, Link, Pagination, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import { NavLink } from 'react-router-dom';
import { useAddressRanking } from '../../slices/wallet/hooks';
import { shortenAddress } from '../../utils/shortenAddress';
import { numberFormat } from '../../utils/numberFormat';
import CustomPaper from '../../components/Custom/CustomPaper';
import TableSkeleton from '../../components/Skeleton/TableSkeleton';

export default function Home(): JSX.Element {
  const addressRanking = useAddressRanking();

  return (
    <CustomPaper style={{height:'100%'}} >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ranking</TableCell>
            <TableCell>
              <TableSortLabel>Address</TableSortLabel>
            </TableCell>
            <TableCell>Total assets</TableCell>
            <TableCell>Daily PnL</TableCell>
            <TableCell>Daily PnL Ratio</TableCell>
            <TableCell>Daily Txns</TableCell>
            <TableCell>Stable Coin%</TableCell>
            <TableCell>Follow</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addressRanking.loading ? (
            <TableSkeleton columnNum={8} rowNum={10} />
          ) : (
            addressRanking.data.map((item) => (
              <TableRow key={item.address}>
                <TableCell>-</TableCell>
                <TableCell>
                  <Link component={NavLink} to={`/web3/account/${item.address}`}>
                    {shortenAddress(item.address)}
                  </Link>
                </TableCell>
                <TableCell>{numberFormat(item.total, 'currency')}</TableCell>
                <TableCell>{numberFormat(item.dayProfit, 'currency')}</TableCell>
                <TableCell>{numberFormat(item.dayProfitRatio, 'percent')}</TableCell>
                <TableCell>{item.dayTxNum}</TableCell>
                <TableCell>{numberFormat(item.stableCoinOccupation, 'percent')}</TableCell>
                <TableCell>
                  <StarOutlineRoundedIcon sx={{ color: '#D0D0D0' }} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination
          sx={{
            mt: 3,
          }}
          shape="rounded"
          page={addressRanking.page}
          count={addressRanking.pageCount}
          onChange={(e, value) => {
            addressRanking.getData({ page: value });
          }}
        />
      </Box>
    </CustomPaper>
  );
}
