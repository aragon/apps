import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useState} from 'react';

import BottomSheet from 'components/bottomSheet';
import {Dashboard, Community, Finance, Governance} from 'utils/paths';

const Navbar: React.FC = () => {
  const {t} = useTranslation();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(true);
  };

  const handleHideMenu = () => {
    setShowMenu(false);
  };

  const renderNavLinks = useCallback(() => {
    // TODO: Investigate string interpolation with react-i18next
    return (
      <>
        <StyledNavLink to={Dashboard} exact={true} onClick={handleHideMenu}>
          {t('navLinks.dashboard')}
        </StyledNavLink>
        <StyledNavLink to={Governance} exact={true} onClick={handleHideMenu}>
          {t('navLinks.governance')}
        </StyledNavLink>
        <StyledNavLink to={Finance} exact={true} onClick={handleHideMenu}>
          {t('navLinks.finance')}
        </StyledNavLink>
        <StyledNavLink to={Community} exact={true} onClick={handleHideMenu}>
          {t('navLinks.community')}
        </StyledNavLink>
      </>
    );
  }, [t]);

  return (
    <>
      <NavContainer data-testid="nav">
        <NavigationBar>
          <button className="lg:hidden border-2" onClick={handleShowMenu}>
            # Menu
          </button>
          <Container>
            <DaoSelectorWrapper>
              <DaoSelector>
                <TempDaoAvatar>DN</TempDaoAvatar>
                <DaoIdentifier>Bushido DAO</DaoIdentifier>
              </DaoSelector>
            </DaoSelectorWrapper>
            <LinksContainer>{renderNavLinks()}</LinksContainer>
          </Container>
          <AccountButton>
            <p className="hidden md:block">punk420.eth</p>
            <TempAvatar />
          </AccountButton>
        </NavigationBar>
        <TestNetworkIndicator>{t('testnetIndicator')}</TestNetworkIndicator>
      </NavContainer>

      {/* TODO: BottomSheet should probably moved to the root of the application and set as hook(?) */}
      <BottomSheet
        isOpen={showMenu}
        onOpen={handleShowMenu}
        onClose={handleHideMenu}
      >
        {renderNavLinks()}
      </BottomSheet>
    </>
  );
};

export default Navbar;

const NavContainer = styled.div.attrs({
  className: `flex fixed md:static bottom-0 flex-col w-full bg-gradient-to-b md:bg-gradient-to-t
   from-gray-50 md:from-gray-50 backdrop-filter backdrop-blur-xl`,
})``;

const NavigationBar = styled.nav.attrs({
  className: `flex md:order-1 h-[96px] justify-between items-center px-2 pb-2 pt-1.5 
    md:py-2 md:px-3 lg:py-3 lg:px-5 2xl:px-25 text-ui-600`,
})`
  height: 96px;
`;

const Container = styled.div.attrs({
  className: 'flex lg:flex-1 items-center space-x-6',
})``;

const LinksContainer = styled.div.attrs({
  className: 'hidden lg:flex order-1 lg:order-2 space-x-1.5 items-center',
})``;

const roundedButtonClasses = 'flex items-center h-6 py-1.5 px-2 rounded-lg';

// TODO: investigate NavLink for activeClassName
const StyledNavLink = styled(NavLink).attrs({
  className: `${roundedButtonClasses} `,
})`
  &.active {
    color: #003bf5;
    background: #ffffff;
  }
`;

const DaoSelectorWrapper = styled.div.attrs({
  className:
    'absolute lg:static left-2/4 lg:left-auto transform -translate-x-1/2 lg:-translate-x-0',
})``;

const DaoSelector = styled.div.attrs({
  className: `flex flex-col order-2 lg:order-1 lg:flex-row items-center pt-1.5 pb-1.5 
    space-y-0.5 space-x-0.5 lg:space-x-1.5 lg:h-6 rounded-lg`,
})``;

const DaoIdentifier = styled.span.attrs({
  className: 'text-base leading-5 font-extrabold text-ui-800',
})``;

const TempDaoAvatar = styled.div.attrs({
  className:
    'flex justify-center items-center w-6 h-6 text-ui-0 bg-primary-700 rounded-xl',
})``;

const AccountButton = styled.button.attrs({
  className:
    'flex items-center h-6 py-1.5 px-2 rounded-lg md:space-x-1.5 bg-ui-0',
})``;

const TempAvatar = styled.div.attrs({
  className: 'w-3 h-3 rounded-full bg-primary-700',
})``;

const TestNetworkIndicator = styled.p.attrs({
  className:
    'p-0.5 text-xs font-extrabold text-center text-primary-100 bg-primary-900',
})``;
