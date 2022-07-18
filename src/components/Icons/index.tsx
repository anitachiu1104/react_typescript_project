import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

import { ReactComponent as Home } from '../../assets/images/home.svg';
import { ReactComponent as Data } from '../../assets/images/data.svg';
import { ReactComponent as Account } from '../../assets/images/account.svg';
import { ReactComponent as Setting } from '../../assets/images/setting.svg';
import { ReactComponent as LongShortIndex } from '../../assets/images/long-short-index.svg';
import { ReactComponent as SocialMedia } from '../../assets/images/social-media.svg';
import { ReactComponent as Alert } from '../../assets/images/alert.svg';
import { ReactComponent as StablecoinSupplyRatio } from '../../assets/images/stablecoin-supply-ratio.svg';

export function HomeIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={Home} viewBox="0 0 22 20" {...props} />;
}

export function DataIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={Data} viewBox="0 0 20 20" {...props} />;
}

export function AccountIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={Account} viewBox="0 0 20 20" {...props} />;
}

export function SettingIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={Setting} viewBox="0 0 20 20" {...props} />;
}

export function LongShortIndexIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={LongShortIndex} viewBox="0 0 20 20" {...props} />;
}

export function SocialMediaIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={SocialMedia} viewBox="0 0 20 20" {...props} />;
}

export function AlertIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={Alert} viewBox="0 0 17 20" {...props} />;
}

export function StablecoinSupplyRatioIcon(props: SvgIconProps): JSX.Element {
  return <SvgIcon component={StablecoinSupplyRatio} viewBox="0 0 20 20" {...props} />;
}
