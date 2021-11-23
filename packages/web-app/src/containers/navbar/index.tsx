import {
  DaoSelector,
  IconClose,
  IconMenu,
  IconOnlyButton,
  MenuButton,
  Popover,
  WalletButton,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import withBreadCrumbs, {BreadcrumbsRoute} from 'react-router-breadcrumbs-hoc';

import {routes} from 'routes';
import NavLinks from 'components/navLinks';
import Breadcrumbs from 'components/breadcrumbs';
import {Dashboard} from 'utils/paths';
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

type NavbarProps = {breadcrumbs: React.ReactNode[]};
const Navbar: React.FC<NavbarProps> = ({breadcrumbs}) => {
  //FIXME: Ignore all not found routes on breadcrumb
  const {t} = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCrumbPopover, setShowCrumbPopover] = useState(false);
  const [showSwitcherPopover, setShowSwitcherPopover] = useState(false);

  const handleShowMobileMenu = () => {
    setShowMobileMenu(true);
  };

  //TODO: wire up to bottomsheet menuitem click
  const handleHideMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const handleHideCrumbPopover = () => {
    setShowCrumbPopover(false);
  };

  return (
    <>
      <NavContainer data-testid="nav">
        <NavigationBar>
          <div className="desktop:hidden">
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
              {/* TODO: investigate popover trigger nested button warning */}
              <StyledPopover
                open={showSwitcherPopover} // Using open so that clicking on DAO name closes the popover
                side="bottom"
                align="start"
                width={320}
                content={<DaoSwitcherMenu daos={TEMP_DAOS} />}
                onOpenChange={setShowSwitcherPopover}
              >
                <DaoSelector
                  src={TEMP_ICON}
                  label="Bushido Dao"
                  isSelected={showSwitcherPopover}
                  onClick={() => null}
                />
              </StyledPopover>
            </DaoSelectorWrapper>

            <LinksContainer>
              {breadcrumbs.length > 1 ? (
                <>
                  <Popover
                    open={showCrumbPopover} // Using open so that clicking on MenuItem closes the popover
                    side="bottom"
                    align="start"
                    width={320}
                    content={
                      <MenuDropdown
                        selected={
                          (breadcrumbs[0] as BreadcrumbsRoute)?.match.url
                        }
                        onMenuItemClick={handleHideCrumbPopover}
                      />
                    }
                    onOpenChange={setShowCrumbPopover}
                  >
                    <div className="border">
                      <IconOnlyButton
                        icon={showCrumbPopover ? <IconClose /> : <IconMenu />}
                        isActive={showCrumbPopover}
                      />
                    </div>
                  </Popover>
                  <div className="border">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                  </div>
                </>
              ) : (
                <NavLinks isMobile={false} />
              )}
            </LinksContainer>
          </Container>
          <div className="border">
            <WalletButton
              src={TEMP_ICON}
              label="punk420.eth"
              onClick={() => null}
            />
          </div>
        </NavigationBar>
        <TestNetworkIndicator>{t('testnetIndicator')}</TestNetworkIndicator>
      </NavContainer>
    </>
  );
};

export default withBreadCrumbs(routes, {excludePaths: [Dashboard]})(Navbar);

const NavContainer = styled.div.attrs({
  className: `flex fixed tablet:static bottom-0 flex-col w-full bg-gradient-to-b tablet:bg-gradient-to-t
   from-gray-50 tablet:from-gray-50 backdrop-filter backdrop-blur-xl`,
})``;

const NavigationBar = styled.nav.attrs({
  className: `flex tablet:order-1 h-12 justify-between items-center px-2 pb-2 pt-1.5 
    tablet:py-2 tablet:px-3 desktop:py-3 desktop:px-5 wide:px-25 text-ui-600 border`,
})``;

const Container = styled.div.attrs({
  className: 'flex desktop:flex-1 items-center space-x-6 border',
})``;

const LinksContainer = styled.div.attrs({
  className:
    'hidden desktop:flex order-1 desktop:order-2 space-x-1.5 items-center',
})``;

const DaoSelectorWrapper = styled.div.attrs({
  className:
    'absolute flex items-center desktop:static left-2/4 dekstop:left-auto transform -translate-x-1/2 desktop:-translate-x-0 border',
})``;

const TestNetworkIndicator = styled.p.attrs({
  className:
    'p-0.5 text-xs font-extrabold text-center text-primary-100 bg-primary-900',
})``;

const StyledPopover = styled(Popover).attrs({
  className: 'hidden desktop:block',
})``;
