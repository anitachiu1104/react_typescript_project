import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useLongShortIndex } from '../../slices/longShortIndex/hooks';
import { numberFormat } from '../../utils/numberFormat';
import { longShortIndexUtils } from '../../slices/longShortIndex/utils';
import TableSkeleton from '../../components/Skeleton/TableSkeleton';

export default function LongShortIndex(): JSX.Element {
  const { longShortIndexList, loadingLongShortIndex, getLongShortIndexList } = useLongShortIndex();

  useEffect(() => {
    getLongShortIndexList();
  }, [getLongShortIndexList]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Exchange</TableCell>
          <TableCell>Pair</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Long%(Volume)</TableCell>
          <TableCell align="right">Total order volume</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {loadingLongShortIndex ? (
          <TableSkeleton columnNum={5} />
        ) : (
          longShortIndexList.map((item) => {
            const pairInfo = longShortIndexUtils.getPairInfoFromAbbr(item.abbr);
            return (
              <TableRow key={item.abbr}>
                <TableCell>{item.abbr ? longShortIndexUtils.getExchangeName(pairInfo.exchange) : 'Unknown'}</TableCell>
                <TableCell>{item.abbr ? longShortIndexUtils.getPairName(pairInfo.pair) : 'Unknown'}</TableCell>
                <TableCell>{numberFormat(item.coinPrice, 'currency')}</TableCell>
                <TableCell>
                  {numberFormat(item.bidsRatio, 'percent')}({numberFormat(item.bidsTotalVolume, 'currency')})
                </TableCell>
                <TableCell align="right">
                  {numberFormat(item.bidsTotalVolume + item.asksTotalVolume, 'currency')}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
