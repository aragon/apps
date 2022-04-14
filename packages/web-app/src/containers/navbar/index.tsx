import styled from 'styled-components';
import React, {useMemo} from 'react';
import {matchRoutes, useLocation} from 'react-router-dom';

import {
  CreateDAO,
  Dashboard,
  Finance,
  Governance,
  NewDeposit,
  NewProposal,
  NewWithDraw,
} from 'utils/paths';
import {i18n} from '../../../i18n.config';
import MobileNav from './mobile';
import useScreen from 'hooks/useScreen';
import DesktopNav from './desktop';
import {CHAIN_METADATA} from 'utils/constants';
import {useNetwork} from 'context/network';
import {useWallet} from 'hooks/useWallet';
import {useGlobalModalContext} from 'context/globalModals';

type StringIndexed = {[key: string]: {processLabel: string; returnURL: string}};

const processPaths = [
  {path: NewDeposit},
  {path: NewWithDraw},
  {path: CreateDAO},
  {path: NewProposal},
];

const processes: StringIndexed = {
  [CreateDAO]: {processLabel: i18n.t('createDAO.title'), returnURL: Dashboard},
  [NewDeposit]: {
    processLabel: i18n.t('allTransfer.newTransfer'),
    returnURL: Finance,
  },
  [NewWithDraw]: {
    processLabel: i18n.t('allTransfer.newTransfer'),
    returnURL: Finance,
  },
  [NewProposal]: {
    processLabel: i18n.t('newProposal.title'),
    returnURL: Governance,
  },
};

const Navbar: React.FC = () => {
  const {open} = useGlobalModalContext();
  const {pathname} = useLocation();
  const {isDesktop} = useScreen();
  const {network} = useNetwork();
  const {methods, isConnected} = useWallet();

  const processName = useMemo(() => {
    const results = matchRoutes(processPaths, pathname);
    if (results) return results[0].route.path;
  }, [pathname]);

  // NOTE: Since the wallet is no longer the determining factor for the app's
  // network, this logic needs to be reconsidered. Currently, the app can no
  // longer be on an "unsupported network" (the user would be redirected to a
  // "not found" page instead). So the status currently really just shows
  // whether the app operates on a testnet or on a mainnet ("default").
  const status = useMemo(() => {
    if (CHAIN_METADATA[network].testnet) {
      return 'testnet';
    } else {
      return 'default';
    }
  }, [network]);

  const handleWalletButtonClick = () => {
    if (isConnected) {
      open('wallet');
      return;
    }
    methods.selectWallet().catch((err: Error) => {
      // To be implemented: maybe add an error message when
      // the error is different from closing the window
      console.error(err);
    });
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
      isProcess={processName !== undefined}
      onWalletClick={handleWalletButtonClick}
    />
  );
};

export default Navbar;

export const NavigationBar = styled.nav.attrs({
  className: `flex tablet:order-1 h-12 justify-between items-center px-2 pb-2 pt-1.5
    tablet:py-2 tablet:px-3 desktop:py-3 desktop:px-5 wide:px-25 text-ui-600`,
})``;
