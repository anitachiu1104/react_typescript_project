import React, { useMemo } from 'react';
import { Tab, Tabs } from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import CustomPaper from '../../components/Custom/CustomPaper';

export default function SocialMediaLayout(): JSX.Element {
  const { pathname } = useLocation();

  const tabs = useMemo<{ label: string; value: string }[]>(
    () => [
      {
        label: 'Telegram',
        value: '/charts/social-media/telegram',
      },
      {
        label: 'Discord',
        value: '/charts/social-media/discord',
      },
      {
        label: 'Twitter',
        value: '/charts/social-media/twitter',
      },
      {
        label: 'Facebook',
        value: '/charts/social-media/facebook',
      },
      {
        label: 'Reddit',
        value: '/charts/social-media/reddit',
      },
      {
        label: 'Analysis',
        value: '/charts/social-media/analysis',
      },
    ],
    [],
  );

  const value = useMemo(() => {
    if (tabs.find((item) => item.value === pathname)) {
      return pathname;
    }
    return tabs[0].value;
  }, [pathname, tabs]);

  return (
    <CustomPaper style={{height:"100%"}}>
      <Tabs value={value}>
        {tabs.map((item) => (
          <Tab key={item.value} component={NavLink} label={item.label} to={item.value} value={item.value} />
        ))}
      </Tabs>
      <Outlet />
    </CustomPaper>
  );
}
