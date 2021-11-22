import React from 'react';
import styled from 'styled-components';

import NavLinks from 'components/navLinks';

type MenuDropdownProps = {onMenuItemClick?: () => void};

const MenuDropdown: React.FC<MenuDropdownProps> = ({onMenuItemClick}) => {
  return (
    <Container>
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
