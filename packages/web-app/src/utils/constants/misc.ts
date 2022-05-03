import {
  IconCommunity,
  IconDashboard,
  IconFinance,
  IconGovernance,
  IconType,
} from '@aragon/ui-components';

import {i18n} from '../../../i18n.config';
import {Dashboard, Community, Finance, Governance} from '../paths';

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
