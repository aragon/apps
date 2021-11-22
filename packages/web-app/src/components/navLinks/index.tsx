import {
  MenuItem,
  ActionItem,
  IconFinance,
  IconCommunity,
  IconDashboard,
  IconGovernance,
} from '@aragon/ui-components';
import React from 'react';
import {useTranslation} from 'react-i18next';

import NavLink from 'components/navLink';
import {Dashboard, Community, Finance, Governance} from 'utils/paths';

type NavLinksProps = {isMobile: boolean; onClick?: () => void};

const NavLinks: React.FC<NavLinksProps> = ({isMobile, onClick}) => {
  const {t} = useTranslation();

  // TODO: Investigate string interpolation with react-i18next
  return (
    <>
      <NavLink
        to={Dashboard}
        icon={<IconDashboard />}
        label={t('navLinks.dashboard')}
        onClick={onClick}
        Component={isMobile ? ActionItem : MenuItem}
      />
      <NavLink
        to={Governance}
        icon={<IconGovernance />}
        label={t('navLinks.governance')}
        onClick={onClick}
        Component={isMobile ? ActionItem : MenuItem}
      />
      <NavLink
        to={Finance}
        icon={<IconFinance />}
        label={t('navLinks.finance')}
        onClick={onClick}
        Component={isMobile ? ActionItem : MenuItem}
      />
      <NavLink
        to={Community}
        icon={<IconCommunity />}
        label={t('navLinks.community')}
        onClick={onClick}
        Component={isMobile ? ActionItem : MenuItem}
      />
    </>
  );
};

export default NavLinks;
