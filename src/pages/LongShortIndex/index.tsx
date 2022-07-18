import React from 'react';
import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLongShortIndex } from '../../slices/longShortIndex/hooks';
import CustomPaper from '../../components/Custom/CustomPaper';

export default function LongShortIndexLayout(): JSX.Element {
  const { pathname } = useLocation();

  const { selectedContractType, selectContractType } = useLongShortIndex();

  return (
    <CustomPaper style={{height:'100%'}} >
      <Tabs value={pathname}>
        <Tab
          component={NavLink}
          label="Long/Short Index"
          to="/charts/long-short-index"
          value="/charts/long-short-index"
        />
        <Tab
          component={NavLink}
          label="Long/Short Index Analysis"
          to="/charts/long-short-index/analysis"
          value="/charts/long-short-index/analysis"
        />
      </Tabs>
      <Box sx={{ py: 2.5, display: 'flex', justifyContent: 'center' }}>
        <ToggleButtonGroup
          exclusive
          value={selectedContractType}
          color="secondary"
          onChange={(e, value) => {
            if (value !== null) {
              selectContractType(value);
            }
          }}
        >
          <ToggleButton value="s">Spot</ToggleButton>
          <ToggleButton value="p">Perpetual</ToggleButton>
          <ToggleButton value="f">Futures</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Outlet />
    </CustomPaper>
  );
}
