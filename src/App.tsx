import React, { lazy, useMemo } from 'react';
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Route, Routes, NavLink, Navigate, useLocation } from 'react-router-dom';
import defaultTheme from './themes/defaultTheme';
import Header from './components/Header';
import {
  AccountIcon,
  AlertIcon,
  HomeIcon,
  LongShortIndexIcon,
  SettingIcon,
  SocialMediaIcon,
  StablecoinSupplyRatioIcon,
} from './components/Icons';

const Ranking = lazy(() => import('./pages/Ranking'));
const Account = lazy(() => import('./pages/Account'));
const Setting = lazy(() => import('./pages/Setting'));
const LongShortIndexLayout = lazy(() => import('./pages/LongShortIndex'));
const LongShortIndex = lazy(() => import('./pages/LongShortIndex/LongShortIndex'));
const LongShortIndexAnalysis = lazy(() => import('./pages/LongShortIndex/LongShortIndexAnalysis'));
const SocialMediaLayout = lazy(() => import('./pages/SocialMedia'));
const SocialMediaTable = lazy(() => import('./pages/SocialMedia/SocialMediaTable'));
const SocialMediaAnalysis = lazy(() => import('./pages/SocialMedia/SocialMediaAnalysis'));
const Alert = lazy(() => import('./pages/Alert'));
const StablecoinSupplyRatio = lazy(() => import('./pages/StablecoinSupplyRatio'));

interface Menu {
  icon: JSX.Element;
  text: string;
  to: string;
}

function App(): JSX.Element {
  const location = useLocation();

  const menus = useMemo<Menu[]>(() => {
    if (location.pathname.startsWith('/web3')) {
      return [
        {
          icon: <HomeIcon />,
          to: '/web3/ranking',
          text: 'Ranking',
        },
        {
          icon: <AccountIcon />,
          to: '/web3/account',
          text: 'Account',
        },
        {
          icon: <SettingIcon />,
          to: '/web3/setting',
          text: 'Setting',
        },
      ];
    }

    if (location.pathname.startsWith('/charts')) {
      return [
        {
          icon: <LongShortIndexIcon />,
          to: '/charts/long-short-index',
          text: 'Long/Short index',
        },
        {
          icon: <SocialMediaIcon />,
          to: '/charts/social-media',
          text: 'Social Media',
        },
        {
          icon: <StablecoinSupplyRatioIcon />,
          to: '/charts/stablecoin-supply-ratio',
          text: 'Stablecoin supply ratio',
        },
      ];
    }

    if (location.pathname.startsWith('/alert')) {
      return [
        {
          icon: <AlertIcon />,
          to: '/alert',
          text: 'Alert',
        },
      ];
    }

    return [];
  }, [location]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 1,
          zIndex: 'appBar',
          boxShadow: '0px 4px 10px 0px rgba(182, 182, 182, 0.11)',
        }}
      >
        <Header />
      </Box>
      <Box sx={{ position: 'fixed', top: 80, left: 0, bottom: 0, width: 320, zIndex: 1000, bgcolor: '#fff', pt: 5 }}>
        <List
          sx={{
            '&': {
              '.MuiListItemButton-root': {
                '&.active': {
                  color: '#F0FFFF',
                  bgcolor: '#B0E0E6',
                },
              },
              '.MuiSvgIcon-root': {
                fontSize: '1.25rem',
                color: 'inherit',
              },
            },
          }}
        >
          {menus.map((menu) => (
            <ListItem key={menu.text}>
              <ListItemButton component={NavLink} to={menu.to}>
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText>
                  <Typography variant="subtitle2" sx={{ lineHeight: 1 }}>
                    {menu.text}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ pt: 15, pl: 40, height: '100%'}}>
        <Box sx={{ px: 5 ,height: '100%'}}>
          <Routes>
            <Route path="/web3">
              <Route
                path="ranking"
                element={
                  <React.Suspense fallback={null}>
                    <Ranking />
                  </React.Suspense>
                }
              />
              <Route
                path="account/:address"
                element={
                  <React.Suspense fallback={null}>
                    <Account />
                  </React.Suspense>
                }
              />
              <Route
                path="setting"
                element={
                  <React.Suspense fallback={null}>
                    <Setting />
                  </React.Suspense>
                }
              />
              <Route index element={<Navigate replace to="/web3/ranking" />} />
            </Route>
            <Route path="/charts">
              <Route
                path="long-short-index"
                element={
                  <React.Suspense fallback={null}>
                    <LongShortIndexLayout />
                  </React.Suspense>
                }
              >
                <Route
                  index
                  element={
                    <React.Suspense fallback={null}>
                      <LongShortIndex />
                    </React.Suspense>
                  }
                />
                <Route
                  path="analysis"
                  element={
                    <React.Suspense fallback={null}>
                      <LongShortIndexAnalysis />
                    </React.Suspense>
                  }
                />
              </Route>
              <Route
                path="social-media"
                element={
                  <React.Suspense fallback={null}>
                    <SocialMediaLayout />
                  </React.Suspense>
                }
              >
                <Route
                  path=":social"
                  element={
                    <React.Suspense fallback={null}>
                      <SocialMediaTable />
                    </React.Suspense>
                  }
                />
                <Route
                  path="analysis"
                  element={
                    <React.Suspense fallback={null}>
                      <SocialMediaAnalysis />
                    </React.Suspense>
                  }
                />
                <Route index element={<Navigate replace to="/charts/social-media/telegram" />} />
              </Route>
              <Route
                path="stablecoin-supply-ratio"
                element={
                  <React.Suspense fallback={null}>
                    <StablecoinSupplyRatio />
                  </React.Suspense>
                }
              />
              <Route index element={<Navigate replace to="/charts/long-short-index" />} />
            </Route>
            <Route path="/alert">
              <Route
                index
                element={
                  <React.Suspense fallback={null}>
                    <Alert />
                  </React.Suspense>
                }
              />
            </Route>
            <Route path="*" element={<Typography>Page not found</Typography>} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default App;