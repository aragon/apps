import styled from 'styled-components';
import React, { useMemo } from 'react';
import { matchRoutes, useLocation } from 'react-router-dom';

import {
  CreateDAO,
  Dashboard,
  Finance,
  Governance,
  NewDeposit,
  NewProposal,
  NewWithDraw,
} from 'utils/paths';
import { i18n } from '../../../i18n.config';
import MobileNav from './mobile';
import useScreen from 'hooks/useScreen';
import DesktopNav from './desktop';
import { useWallet } from 'context/augmentedWallet';
import { useWalletMenuContext } from 'context/walletMenu';
import { CHAIN_METADATA as chains } from 'utils/constants';
import { useSigner } from 'use-signer';
import { useGlobalModalContext } from 'context/globalModals';
import { Modal } from '@aragon/ui-components';

type NumberIndexed = { [key: number]: {} };
type StringIndexed = { [key: string]: { processLabel: string; returnURL: string } };

const processPaths = [
  { path: NewDeposit },
  { path: NewWithDraw },
  { path: CreateDAO },
  { path: NewProposal },
];

const processes: StringIndexed = {
  [CreateDAO]: { processLabel: i18n.t('createDAO.title'), returnURL: Dashboard },
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

const getNetworkStatus = (id: number) => {
  if ((chains.test as NumberIndexed)[id]) return 'testnet';
  if (!(chains.main as NumberIndexed)[id]) return 'unsupported';
  return 'default';
};

const Navbar: React.FC = () => {
  // const { open } = useWalletMenuContext();
  const { open, isWalletOpen } = useGlobalModalContext();
  const { pathname } = useLocation();
  const { isDesktop } = useScreen();
  // const {chainId, connect, isConnected} = useWallet();
  const { chainId, status: walletStatus, methods } = useSigner();
  const isConnected = walletStatus === 'connected';

  const processName = useMemo(() => {
    const results = matchRoutes(processPaths, pathname);
    if (results) return results[0].route.path;
  }, [pathname]);

  const status = useMemo(() => {
    return isConnected ? getNetworkStatus(chainId!) : 'default';
  }, [chainId, isConnected]);

  const handleWalletButtonClick = () => {
    if (isConnected) {
      console.log(isWalletOpen)
      open('wallet')
      return;
    }
    methods.selectWallet().catch((err: Error) => {
      // TODO: maybe add an error message when
      // the error is different from closing the window
      console.error(err);
    });
  };

  return isDesktop ? (
    <DesktopNav
      status={status}
      {...(processName ? { ...processes[processName] } : {})}
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
