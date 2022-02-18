import {
  ButtonIcon,
  ButtonWallet,
  CardDao,
  IconClose,
  IconMenu,
  IconMenuVertical,
  Popover,
} from '@aragon/ui-components';
import styled from 'styled-components';
import NavLinks from 'components/navLinks';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {useTranslation} from 'react-i18next';
import React, {useMemo, useState} from 'react';

import {useWallet} from 'context/augmentedWallet';
import Breadcrumbs from 'components/breadcrumbs';
import {useWalletProps} from 'containers/walletMenu';
import NetworkIndicator from './networkIndicator';
import {Dashboard, NotFound} from 'utils/paths';
import {NetworkIndicatorStatus} from 'utils/types';

const MIN_ROUTE_DEPTH_FOR_BREADCRUMBS = 2;

type DesktopNavProp = {
  status?: NetworkIndicatorStatus;
  returnURL?: string;
  processLabel?: string;
  onWalletClick: () => void;
};

const DesktopNav: React.FC<DesktopNavProp> = props => {
  const {t} = useTranslation();
  const [showCrumbMenu, setShowCrumbMenu] = useState(false);
  const {isConnected, account, ensName, ensAvatarUrl}: useWalletProps =
    useWallet();

  const isProcess = useMemo(
    () => props.returnURL && props.processLabel,
    [props.processLabel, props.returnURL]
  );

  const breadcrumbs = useBreadcrumbs(undefined, {
    excludePaths: [Dashboard, NotFound, 'governance/proposals'],
  });

  if (isProcess) {
    return (
      <Container>
        <NetworkIndicator status={props.status} />
        <Menu>
          <ProcessMenuItems>
            <div>Bread crumb</div>
            <ButtonIcon
              mode="secondary"
              size="large"
              icon={<IconMenuVertical />}
            />
          </ProcessMenuItems>
          <ButtonWallet
            src={ensAvatarUrl || account}
            onClick={props.onWalletClick}
            isConnected={isConnected()}
            label={
              isConnected() ? ensName || account : t('navButtons.connectWallet')
            }
          />
        </Menu>
      </Container>
    );
  }

  return (
    <Container>
      <NetworkIndicator status={props.status} />
      <Menu>
        <div className="flex items-center space-x-6">
          <div className="">
            <CardDao
              daoName="DAO Name"
              daoAddress="patito.eth.dao"
              onClick={() => null}
              src="https://banner2.cleanpng.com/20180325/sxw/kisspng-computer-icons-avatar-avatar-5ab7529a8e4e14.9936310115219636745829.jpg"
            />
          </div>
          <div className="flex items-center space-x-1.5">
            {breadcrumbs.length >= MIN_ROUTE_DEPTH_FOR_BREADCRUMBS ? (
              <>
                <Popover
                  open={showCrumbMenu}
                  onOpenChange={setShowCrumbMenu}
                  side="bottom"
                  align="start"
                  width={240}
                  content={<NavLinks parent="dropdown" />}
                >
                  <ButtonIcon
                    mode="secondary"
                    size="large"
                    icon={showCrumbMenu ? <IconClose /> : <IconMenu />}
                    isActive={showCrumbMenu}
                  />
                </Popover>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
              </>
            ) : (
              <NavLinks />
            )}
          </div>
        </div>

        <ButtonWallet
          src={ensAvatarUrl || account}
          onClick={props.onWalletClick}
          isConnected={isConnected()}
          label={
            isConnected() ? ensName || account : t('navButtons.connectWallet')
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
     px-5 py-3 bg-gradient-to-b from-ui-50 to-transparent backdrop-blur-xl`,
})``;

const ProcessMenuItems = styled.div.attrs({
  className: 'flex space-x-1.5',
})``;
