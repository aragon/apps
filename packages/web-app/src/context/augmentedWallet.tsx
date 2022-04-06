// Workarounds are used that necessitate the any escape hatch

import React, {useContext, useEffect, useMemo} from 'react';
import {UseWalletProvider, useWallet} from 'use-wallet';
import {Wallet} from 'use-wallet/dist/cjs/types';

import {identifyUser} from 'services/analytics';
import {updateAPMContext, useAPM} from './elasticAPM';
import {useNetwork} from './network';

export type WalletAugmented = Wallet & {
  isOnCorrectNetwork: boolean;
};

// Any is a workaround so TS doesn't ask for a filled out default
const WalletAugmentedContext = React.createContext<WalletAugmented | any>({});

function useWalletAugmented(): WalletAugmented {
  return useContext(WalletAugmentedContext);
}

const WalletAugmented: React.FC<unknown> = ({children}) => {
  const wallet = useWallet();
  const {network} = useNetwork();

  const isOnCorrectNetwork = useMemo(() => {
    // This is necessary as long as we're using useWallet. Once we switch to
    // web3modal entirely, we'll no longer need to rely on the chains defined in
    // useWallet. Instead we'll be rely entirely on the data defined in
    // constants/chains.tsx
    switch (wallet.networkName) {
      case 'main':
        return network === 'ethereum';
      default:
        break;
    }
  }, [wallet]);

  // TODO this should be moved into a separate hook and then called from within
  // the app component. Afterwards, the wallet should no longer need to be
  // augmented and this whole component should be removed.
  useEffect(() => {
    if (
      wallet.status === 'connected' &&
      typeof wallet.account === 'string' &&
      wallet.connector &&
      wallet.networkName
    ) {
      identifyUser(wallet.account, wallet.networkName, wallet.connector);
    }
  }, [wallet.networkName, wallet.connector, wallet.status, wallet.account]);

  const contextValue = useMemo(() => {
    return {
      isOnCorrectNetwork,
      ...wallet,
    };
  }, [wallet]);

  const {apm} = useAPM();
  useEffect(() => {
    updateAPMContext(apm, wallet.networkName!);
  }, [apm, wallet.networkName]);

  return (
    <WalletAugmentedContext.Provider value={contextValue}>
      {children}
    </WalletAugmentedContext.Provider>
  );
};

export const connectors = [
  {
    id: 'injected',
    properties: {
      chainId: [1, 4, 137, 80001, 42161, 421611],
    },
  },
  {
    id: 'frame',
    properties: {
      chainId: [1, 4, 137, 80001, 42161, 421611],
    },
  },
];

const useWalletConnectors = connectors.reduce(
  (current: any, connector: any) => {
    current[connector.id] = connector.properties || {};
    return current;
  },
  {}
);

const WalletProvider: React.FC<unknown> = ({children}) => {
  return (
    <UseWalletProvider connectors={useWalletConnectors}>
      <WalletAugmented>{children}</WalletAugmented>
    </UseWalletProvider>
  );
};

export {useWalletAugmented as useWallet, WalletProvider};
