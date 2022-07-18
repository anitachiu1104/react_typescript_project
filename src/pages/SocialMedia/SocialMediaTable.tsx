import React, { useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useSocialMediaLatest } from '../../slices/socialMedia/hooks';
import { numberFormat } from '../../utils/numberFormat';
import TableSkeleton from '../../components/Skeleton/TableSkeleton';

export default function SocialMediaTable(): JSX.Element {
  const { social } = useParams<{ social: string }>();

  const { loading, getSocialMediaLatest, socialMediaLatest } = useSocialMediaLatest(social);

  useEffect(() => {
    getSocialMediaLatest();
  }, [getSocialMediaLatest]);

  return (
    <Box>
      <Box sx={{ px: 2, py: 2.5 }}>
        {/*  <FormControl size="small"> */}
        {/*    <InputLabel>Select Period</InputLabel> */}
        {/*    <Select label="Select Period" sx={{ width: 180 }}> */}
        {/*      <MenuItem value={1}>Day</MenuItem> */}
        {/*      <MenuItem value={7}>Week</MenuItem> */}
        {/*      <MenuItem value={30}>Month</MenuItem> */}
        {/*    </Select> */}
        {/*  </FormControl> */}
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Project</TableCell>
            <TableCell>Total Member</TableCell>
            <TableCell>Online Member</TableCell>
            <TableCell>% 1D</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableSkeleton columnNum={4} />
          ) : (
            socialMediaLatest.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{numberFormat(item.totalMember)}</TableCell>
                <TableCell>{numberFormat(item.onlineMember)}</TableCell>
                <TableCell>
                  {numberFormat(item.changeRatio, 'percent')}({numberFormat(item.changeNumber)})
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Box>
  );
}
