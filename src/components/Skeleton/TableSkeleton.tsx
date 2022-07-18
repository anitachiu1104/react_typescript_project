import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

export default function TableSkeleton({ columnNum, rowNum = 4 }: { columnNum: number; rowNum?: number }): JSX.Element {
  if (columnNum <= 0) {
    throw new Error('columnNum must be greater than 0');
  }

  if (rowNum <= 0) {
    throw new Error('rowNum must be greater than 0');
  }

  return (
    <>
      {[...new Array(rowNum).keys()].map((rowIndex) => (
        <TableRow key={rowIndex}>
          {[...new Array(columnNum).keys()].map((columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton variant="rectangular" width="100%" height={20} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
