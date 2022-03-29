import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {SupportedNetworks} from 'utils/constants/chains';

import {Nullable} from 'utils/types';

/* CONTEXT PROVIDER ========================================================= */

type NetworkContext = {
  network: SupportedNetworks;
  setNetwork: (network: SupportedNetworks) => void;
};

const NetworkContext = createContext<Nullable<NetworkContext>>(null);

type NetworkProviderProps = {
  children: React.ReactNode;
};

/**
 * Returns two blockchain providers.
 *
 * The infura provider is always available, regardless of whether or not a
 * wallet is connected.
 *
 * The web3 provider, however, is based on the conencted and wallet and will
 * therefore be null if no wallet is connected.
 */
export function NetworkProvider({children}: NetworkProviderProps) {
  const {pathname} = useLocation();
  const {networkParam} = useParams();

  const initialNetwork = networkParam
    ? (networkParam as SupportedNetworks)
    : 'ethereum';

  const [network, setNetwork] = useState<SupportedNetworks>(initialNetwork);

  const changeNetwork = useCallback(newNetwork => {
    setNetwork(newNetwork);
  }, []);

  useEffect(() => {
    if (networkParam) {
      changeNetwork(networkParam);
    }
  }, [networkParam]);

  return (
    <NetworkContext.Provider value={{network, setNetwork}}>
      {children}
    </NetworkContext.Provider>
  );
}

/* CONTEXT CONSUMER ========================================================= */

export function useNetwork(): NonNullable<NetworkContext> {
  return useContext(NetworkContext) as NetworkContext;
}
