import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import {MenuButton, Popover, WalletButton} from '@aragon/ui-components';

import NavLinks from 'components/navLinks';
import BottomSheet from 'components/bottomSheet';
import MenuDropdown from 'components/menuDropdown';
import DaoSwitcherMenu from 'components/daoSwitcherMenu/daoSwitcherMenu';

const TEMP_ICON =
  'https://banner2.cleanpng.com/20180325/sxw/kisspng-computer-icons-avatar-avatar-5ab7529a8e4e14.9936310115219636745829.jpg';

const TEMP_DAOS = [
  {
    name: 'Axolittle Dao',
    ens: 'axolittle-dao.eth',
    icon: 'x',
  },
  {
    name: 'Skullx Dao',
    ens: 'skullx-dao.eth',
    icon: 'x',
  },
];

const Navbar: React.FC = () => {
  const {t} = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(true);
  const [switcherIsActive, setSwitcherActive] = useState(true);

  const handleShowMobileMenu = () => {
    setShowMobileMenu(true);
  };

  const handleHideMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <NavContainer data-testid="nav">
        <NavigationBar>
          <div className="lg:hidden">
            <MenuButton
              size="small"
              label={t('menu')}
              isOpen={showMobileMenu}
              onClick={handleShowMobileMenu}
              isMobile={true}
            />
          </div>
          <Container>
            <DaoSelectorWrapper>
              {/* TODO: Change popover margin to 0 and with to not required and fit */}
              <StyledPopover
                side="bottom"
                align="start"
                width="320"
                content={<DaoSwitcherMenu daos={TEMP_DAOS} />}
                onOpenChange={setSwitcherActive}
              >
                {/* TODO: replace with avatar and Dao name */}
                <DaoSelector>
                  <TempDaoAvatar>DN</TempDaoAvatar>
                  <DaoIdentifier>Bushido DAO</DaoIdentifier>
                </DaoSelector>
                {/* TODO: replace with avatar and Dao name */}
              </StyledPopover>
            </DaoSelectorWrapper>

            <LinksContainer>
              <NavLinks isMobile={false} />
            </LinksContainer>
          </Container>
          <WalletButton
            src={TEMP_ICON}
            label="punk420.eth"
            onClick={() => null}
          />
        </NavigationBar>
        <TestNetworkIndicator>{t('testnetIndicator')}</TestNetworkIndicator>
      </NavContainer>
    </>
  );
};

export default Navbar;

const NavContainer = styled.div.attrs({
  className: `flex fixed md:static bottom-0 flex-col w-full bg-gradient-to-b md:bg-gradient-to-t
   from-gray-50 md:from-gray-50 backdrop-filter backdrop-blur-xl`,
})``;

const NavigationBar = styled.nav.attrs({
  className: `flex md:order-1 h-12 justify-between items-center px-2 pb-2 pt-1.5 
    md:py-2 md:px-3 lg:py-3 lg:px-5 2xl:px-25 text-ui-600`,
})``;

const Container = styled.div.attrs({
  className: 'flex lg:flex-1 items-center space-x-6',
})``;

const LinksContainer = styled.div.attrs({
  className: 'hidden lg:flex order-1 lg:order-2 space-x-1.5 items-center',
})``;

const DaoSelectorWrapper = styled.div.attrs({
  className:
    'absolute lg:static left-2/4 lg:left-auto transform -translate-x-1/2 lg:-translate-x-0',
})``;

const DaoSelector = styled.div.attrs({
  className: `flex flex-col lg:flex-row items-center pt-1.5 pb-1.5 
    space-y-0.5 space-x-0.5 lg:space-x-1.5 lg:h-6 rounded-lg`,
})``;

const DaoIdentifier = styled.span.attrs({
  className: 'text-base leading-5 font-extrabold text-ui-800',
})``;

const TempDaoAvatar = styled.div.attrs({
  className:
    'flex justify-center items-center w-6 h-6 text-ui-0 bg-primary-700 rounded-xl',
})``;

const TestNetworkIndicator = styled.p.attrs({
  className:
    'p-0.5 text-xs font-extrabold text-center text-primary-100 bg-primary-900',
})``;

const StyledPopover = styled(Popover).attrs({
  className: 'hidden lg:block',
})``;

const Content = styled.div.attrs({className: 'pt-3 pb-2 border'})``;
