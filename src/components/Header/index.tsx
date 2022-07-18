import React from 'react';
import { Box, Button, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import { useWeb3Context } from '../../hooks/web3Context';
import { shortenAddress } from '../../utils/shortenAddress';

export default function Header(): JSX.Element {
  const { connect, connected, account } = useWeb3Context();

  return (
    <Box sx={{ px: 5, bgcolor: '#fff', boxShadow: '0px 4px 10px 0px rgba(182, 182, 182, 0.11)' }}>
      <Grid container alignItems="center" sx={{ height: 80 }}>
        <Grid item sx={{ minWidth: 320 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src={Logo} sx={{ width: 30, mr: 1.75 }} />
            <Typography variant="h5" sx={{ color: '#000' }}>
              <strong>BCTrend</strong>
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Divider variant="middle" orientation="vertical" sx={{ height: 60, my: 0 }} />
        </Grid>
        <Grid item>
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Grid>
        <Grid item sx={{ flex: 1, px: 10 }}>
          <Grid
            container
            spacing={10}
            justifyContent="flex-end"
            alignItems="center"
            sx={{ '&': { a: { color: '#999', fontWeight: 600, fontSize: '1rem', '&.active': { color: '#333' } } } }}
          >
            <Grid item>
              <Link component={NavLink} to="/">
                Home
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/charts">
                Charts
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/web3">
                Web3 Data
              </Link>
            </Grid>
            <Grid item>
              <Link component={NavLink} to="/alert">
                Alert
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {connected ? (
            <Box sx={{ borderRadius: 2, bgcolor: 'primary.light', px: 2.5, py: 1 }}>
              <Typography color="primary">{shortenAddress(account)}</Typography>
            </Box>
          ) : (
            <Button variant="contained" onClick={connect}>
              Connect wallet
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
