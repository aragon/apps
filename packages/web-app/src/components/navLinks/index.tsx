import {
  ButtonText,
  IconFinance,
  IconCommunity,
  IconDashboard,
  IconGovernance,
} from '@aragon/ui-components';
import React from 'react';
import {useTranslation} from 'react-i18next';

import NavLink from 'components/navLink';
import {Dashboard, Community, Finance, Governance} from 'utils/paths';

type NavLinksProps = {
  isDropdown?: boolean;
  selected?: string;
  onItemClick?: () => void;
};

const NavLinks: React.FC<NavLinksProps> = ({
  isDropdown = false,
  selected,
  onItemClick,
}) => {
  const {t} = useTranslation();

  // TODO: Investigate string interpolation with react-i18next
  return (
    <div
      data-testid="navLinks"
      className={
        isDropdown
          ? 'flex flex-col space-y-1.5'
          : 'flex space-x-1.5 items-center'
      }
    >
      <NavLink
        to={Dashboard}
        onClick={onItemClick}
        selected={selected}
        renderItem={(isActive, onClick) => (
          <ButtonText
            mode="ghost"
            size="large"
            label={t('navLinks.dashboard')}
            bgWhite={isDropdown}
            onClick={onClick}
            isActive={isActive}
            {...(isActive || isDropdown ? {iconLeft: <IconDashboard />} : {})}
          />
        )}
      />
      <NavLink
        to={Governance}
        onClick={onItemClick}
        selected={selected}
        renderItem={(isActive, onClick) => (
          <ButtonText
            mode="ghost"
            size="large"
            label={t('navLinks.governance')}
            bgWhite={isDropdown}
            onClick={onClick}
            isActive={isActive}
            {...(isActive || isDropdown ? {iconLeft: <IconGovernance />} : {})}
          />
        )}
      />
      <NavLink
        to={Finance}
        onClick={onItemClick}
        selected={selected}
        renderItem={(isActive, onClick) => (
          <ButtonText
            mode="ghost"
            size="large"
            label={t('navLinks.finance')}
            bgWhite={isDropdown}
            onClick={onClick}
            isActive={isActive}
            {...(isActive || isDropdown ? {iconLeft: <IconFinance />} : {})}
          />
        )}
      />
      <NavLink
        to={Community}
        onClick={onItemClick}
        selected={selected}
        renderItem={(isActive, onClick) => (
          <ButtonText
            mode="ghost"
            size="large"
            label={t('navLinks.community')}
            bgWhite={isDropdown}
            onClick={onClick}
            isActive={isActive}
            {...(isActive || isDropdown ? {iconLeft: <IconCommunity />} : {})}
          />
        )}
      />
    </div>
  );
};

export default NavLinks;
