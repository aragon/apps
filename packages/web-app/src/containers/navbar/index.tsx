import styled from 'styled-components';
import React, {useMemo} from 'react';
import {matchRoutes, useLocation} from 'react-router-dom';

import MobileNav from './mobile';
import useScreen from 'hooks/useScreen';
import DesktopNav from './desktop';
import {useWallet} from 'context/augmentedWallet';
import {useWalletMenuContext} from 'context/walletMenu';
import {CHAIN_METADATA as chains} from 'utils/constants';
import {NewDeposit, NewWithDraw, CreateDAO} from 'utils/paths';

type NumberIndexed = {[key: number]: {}};
type StringIndexed = {[key: string]: {processLabel: string; returnURL: string}};

const processPaths = [
  {path: NewDeposit},
  {path: NewWithDraw},
  {path: CreateDAO},
];

const processes: StringIndexed = {
  [CreateDAO]: {processLabel: 'Create your DAO', returnURL: '/'},
  [NewDeposit]: {processLabel: 'New Transfer', returnURL: '/ab'},
  [NewWithDraw]: {processLabel: 'New Transfer', returnURL: '/'},
};

const getNetworkStatus = (id: number) => {
  if ((chains.test as NumberIndexed)[id]) return 'testnet';
  if (!(chains.main as NumberIndexed)[id]) return 'unsupported';
  return 'default';
};

const Navbar: React.FC = () => {
  const {open} = useWalletMenuContext();
  const {pathname} = useLocation();
  const {isDesktop} = useScreen();
  const {chainId, connect, isConnected} = useWallet();

  const processName = useMemo(() => {
    const results = matchRoutes(processPaths, pathname);
    if (results) return results[0].route.path;
  }, [pathname]);

  const status = useMemo(() => {
    return isConnected() ? getNetworkStatus(chainId!) : 'default';
  }, [chainId, isConnected]);

  const handleWalletButtonClick = () => {
    isConnected() ? open() : connect('injected');
  };

  return isDesktop ? (
    <DesktopNav
      status={status}
      {...(processName ? {...processes[processName]} : {})}
      onWalletClick={handleWalletButtonClick}
    />
  ) : (
    <MobileNav
      status={status}
      {...(processName ? {...processes[processName]} : {})}
      onWalletClick={handleWalletButtonClick}
    />
  );
};

export default Navbar;

export const NavigationBar = styled.nav.attrs({
  className: `flex tablet:order-1 h-12 justify-between items-center px-2 pb-2 pt-1.5 
    tablet:py-2 tablet:px-3 desktop:py-3 desktop:px-5 wide:px-25 text-ui-600`,
})``;
