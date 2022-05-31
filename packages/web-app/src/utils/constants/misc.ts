import {
  IconCommunity,
  IconDashboard,
  IconFinance,
  IconGovernance,
  IconType,
  IconSettings,
} from '@aragon/ui-components';
import {BigNumber} from 'ethers';

import {i18n} from '../../../i18n.config';
import {Dashboard, Community, Finance, Governance, Settings} from '../paths';

/** Time period options for token price change */
export const enum TimeFilter {
  day = 'day',
  week = 'week',
  month = 'month',
  year = 'year',
  // max = 'max',
}

export const enum TransactionState {
  WAITING = 'WAITING',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type NavLinkData = {
  path: string;
  label: string;
  icon: IconType;
};

export const NAV_LINKS_DATA: NavLinkData[] = [
  {
    label: i18n.t('navLinks.dashboard'),
    path: Dashboard,
    icon: IconDashboard,
  },
  {
    label: i18n.t('navLinks.governance'),
    path: Governance,
    icon: IconGovernance,
  },
  {label: i18n.t('navLinks.finance'), path: Finance, icon: IconFinance},
  {
    label: i18n.t('navLinks.community'),
    path: Community,
    icon: IconCommunity,
  },
  {
    label: i18n.t('navLinks.settings'),
    path: Settings,
    icon: IconSettings,
  },
];

export const EXPLORE_NAV_LINKS = [
  {
    label: i18n.t('navLinks.explore'),
    path: Dashboard,
  },
  {
    label: i18n.t('navLinks.learn'),
    path: Dashboard,
  },
  {
    label: i18n.t('navLinks.build'),
    path: Dashboard,
  },
  {
    label: i18n.t('navLinks.help'),
    path: Dashboard,
  },
];

export const PRIVACY_NAV_LINKS = [
  {
    label: i18n.t('navLinks.terms'),
    path: Dashboard,
  },
  {
    label: i18n.t('navLinks.privacy'),
    path: Dashboard,
  },
];

export const enum TransferTypes {
  Deposit = 'VaultDeposit',
  Withdraw = 'VaultWithdraw',
}

// largest decimal that can be represented in 224 bits
// before adding the 18 decimals
export const MAX_TOKEN_AMOUNT = BigNumber.from(
  '26959946667150639794667015087019630673637144422540'
);
