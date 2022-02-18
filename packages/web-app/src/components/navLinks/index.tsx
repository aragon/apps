import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';

import NavLink from 'components/navLink';
import {Dashboard, Community, Finance, Governance} from 'utils/paths';

type NavLinksProps = {
  selected?: string; //todo Remove
  isDropdown?: boolean; //todo Remove

  parent?: 'nav' | 'modal' | 'dropdown';
  onItemClick?: () => void;
};

const styles = {
  nav: 'flex space-x-1.5 items-center',
  dropdown: 'space-y-1.5 p-2',
  modal: 'p-2 space-y-1',
};

const NavLinks: React.FC<NavLinksProps> = props => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  const handleOnClick = (to: string) => {
    navigate(to);
  };

  // TODO: Investigate string interpolation with react-i18next
  return (
    <ul data-testid="navLinks" className={styles[props.parent!]}>
      <NavLink
        to={Dashboard}
        matchEnd={props.parent !== 'modal'}
        render={isSelected => (
          <NavItem
            isSelected={isSelected}
            onClick={() => handleOnClick(Dashboard)}
          >
            {t('navLinks.dashboard')}
          </NavItem>
        )}
      />
      <NavLink
        to={Governance}
        matchEnd={props.parent !== 'modal'}
        render={isSelected => (
          <NavItem
            isSelected={isSelected}
            onClick={() => handleOnClick(Governance)}
          >
            {t('navLinks.governance')}
          </NavItem>
        )}
      />
      <NavLink
        to={Finance}
        matchEnd={props.parent !== 'modal'}
        render={isSelected => (
          <NavItem
            isSelected={isSelected}
            onClick={() => handleOnClick(Finance)}
          >
            {t('navLinks.finance')}
          </NavItem>
        )}
      />
      <NavLink
        to={Community}
        matchEnd={props.parent !== 'modal'}
        render={isSelected => (
          <NavItem
            isSelected={isSelected}
            onClick={() => handleOnClick(Community)}
          >
            {t('navLinks.community')}
          </NavItem>
        )}
      />
    </ul>
  );
};

const NavItem = styled.button.attrs(({isSelected}: {isSelected: boolean}) => {
  let className =
    'py-1.5 px-2 rounded-xl font-bold hover:text-primary-500 ' +
    'active:text-primary-700 disabled:text-ui-300 focus:bg-ui-50 ' +
    'disabled:bg-ui-50 focus:ring-2 focus:ring-primary-500 focus:outline-none ';

  isSelected
    ? (className += 'text-primary-500 bg-ui-0')
    : (className += 'text-ui-600');
  return {className};
})<{isSelected: boolean}>``;

export default NavLinks;
