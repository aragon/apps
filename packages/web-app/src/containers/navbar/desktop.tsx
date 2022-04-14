import {Breadcrumb, ButtonWallet, CardDao} from '@aragon/ui-components';
import styled from 'styled-components';
import NavLinks from 'components/navLinks';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import React, {useMemo, useState} from 'react';

import {useWallet} from 'hooks/useWallet';
import {selectedDAO} from 'context/apolloClient';
import NetworkIndicator from './networkIndicator';
import {useReactiveVar} from '@apollo/client';
import {BreadcrumbDropdown} from './breadcrumbDropdown';
import {replaceNetworkParam} from 'utils/paths';
import {useNetwork} from 'context/network';
import {useMappedBreadcrumbs} from 'hooks/useMappedBreadcrumbs';

const MIN_ROUTE_DEPTH_FOR_BREADCRUMBS = 2;

type DesktopNavProp = {
  returnURL?: string;
  processLabel?: string;
  onDaoSelect: () => void;
  onWalletClick: () => void;
};

const DesktopNav: React.FC<DesktopNavProp> = props => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const selectedDao = useReactiveVar(selectedDAO);
  const {breadcrumbs, icon} = useMappedBreadcrumbs();
  const {address, ensName, ensAvatarUrl, isConnected} = useWallet();

  const [showCrumbMenu, setShowCrumbMenu] = useState(false);

  const isProcess = useMemo(
    () => props.returnURL && props.processLabel,
    [props.processLabel, props.returnURL]
  );

  const clickHandler = (path: string) => {
    navigate(replaceNetworkParam(path, network));
  };

  if (isProcess) {
    return (
      <Container data-testid="navbar">
        <NetworkIndicator />
        <Menu>
          <Breadcrumb
            crumbs={{label: props.processLabel!, path: props.returnURL!}}
            onClick={clickHandler}
          />

          <ButtonWallet
            src={ensAvatarUrl || address}
            onClick={props.onWalletClick}
            isConnected={isConnected}
            label={
              isConnected ? ensName || address : t('navButtons.connectWallet')
            }
          />
        </Menu>
      </Container>
    );
  }

  return (
    <Container data-testid="navbar">
      <NetworkIndicator />
      <Menu>
        <Content>
          <CardDao
            daoName={selectedDao.daoName}
            daoAddress={selectedDao.daoAddress}
            onClick={props.onDaoSelect}
          />

          <LinksWrapper>
            {breadcrumbs.length < MIN_ROUTE_DEPTH_FOR_BREADCRUMBS ? (
              <NavLinks />
            ) : (
              <>
                <BreadcrumbDropdown
                  open={showCrumbMenu}
                  icon={icon}
                  crumbs={breadcrumbs}
                  onClose={() => setShowCrumbMenu(false)}
                  onCrumbClick={clickHandler}
                  onOpenChange={setShowCrumbMenu}
                />
                <Breadcrumb
                  icon={icon}
                  crumbs={breadcrumbs}
                  onClick={clickHandler}
                />
              </>
            )}
          </LinksWrapper>
        </Content>

        <ButtonWallet
          src={ensAvatarUrl || address}
          onClick={props.onWalletClick}
          isConnected={isConnected}
          label={
            isConnected ? ensName || address : t('navButtons.connectWallet')
          }
        />
      </Menu>
    </Container>
  );
};

export default DesktopNav;

const Container = styled.header.attrs({
  className: 'sticky top-0 w-full',
})``;

const Menu = styled.nav.attrs({
  className: `flex mx-auto justify-between items-center max-w-screen-wide
     px-5 wide:px-10 py-3`,
})`
  background: linear-gradient(
    180deg,
    rgba(245, 247, 250, 1) 0%,
    rgba(245, 247, 250, 0) 100%
  );
  backdrop-filter: blur(24px);
`;

const Content = styled.div.attrs({
  className: 'flex items-center space-x-6',
})``;

const LinksWrapper = styled.div.attrs({
  className: 'flex items-center space-x-1.5',
})``;
