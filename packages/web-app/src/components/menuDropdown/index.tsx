import React from 'react';
import styled from 'styled-components';

import NavLinks from 'components/navLinks';

type MenuDropdownProps = {onMenuItemClick: () => void};

const MenuDropdown: React.FC<MenuDropdownProps> = ({onMenuItemClick}) => {
  return (
    <Container>
      {/* Dao Switcher */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-1.5">
          <TempDaoAvatar>DN</TempDaoAvatar>
          <div className="flex flex-col justify-center">
            <DaoIdentifier>Bushido DAO</DaoIdentifier>
            <p className="text-xs text-ui-400">dao.aragonid.eth</p>
          </div>
        </div>
        <button className="py-1.5 px-2 text-primary-500 bg-ui-0 rounded-lg">
          Switch
        </button>
      </div>
      {/* Dao Switcher end */}

      <NavLinksContainer>
        <NavLinks onClick={onMenuItemClick} isMobile={true} />
      </NavLinksContainer>
    </Container>
  );
};

export default MenuDropdown;

const Container = styled.div.attrs({
  className: 'py-3 px-2 text-ui-600',
})``;

const NavLinksContainer = styled.div.attrs({
  className: 'flex flex-col space-y-1.5',
})``;

// TODO: Change when switcher and header are available
const TempDaoAvatar = styled.div.attrs({
  className:
    'flex justify-center items-center w-6 h-6 text-ui-0 bg-primary-700 rounded-xl',
})``;

const DaoIdentifier = styled.span.attrs({
  className: 'text-base leading-5 font-extrabold text-ui-800',
})``;
