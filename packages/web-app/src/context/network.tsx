import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useMatch} from 'react-router-dom';
import {isSupportedNetwork, SupportedNetworks} from 'utils/constants';

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
 * Returns the network on which the app operates.
 *
 * Note that, in most cases, the network is determined by the URL. I.e., on any
 * page load, the URL is parsed and the network adapted to the network specified
 * in the URL. If no network is present, the app defaults to mainnet.
 *
 * There exist cases where the app is in a "neutral" state (for example, during
 * DAO creation). In these cases, the url does NOT contain network information.
 * The app therefore also defaults to ethereum mainnet. However, this context
 * exposes a setter that allows to change the network for
 *
 */
export function NetworkProvider({children}: NetworkProviderProps) {
  const urlMatch = useMatch(':network/*');

  const [networkState, setNetworkState] = useState<SupportedNetworks>(() => {
    const networkParam = urlMatch?.params?.network;
    if (!networkParam || !isSupportedNetwork(networkParam)) return 'ethereum';
    else return networkParam;
  });

  const changeNetwork = useCallback(newNetwork => {
    setNetworkState(newNetwork);
  }, []);

  useEffect(() => {
    const networkParam = urlMatch?.params?.network;
    if (!networkParam || !isSupportedNetwork(networkParam))
      setNetworkState('ethereum');
    else setNetworkState(networkParam);
  }, [urlMatch]);

  return (
    <NetworkContext.Provider
      value={{network: networkState, setNetwork: changeNetwork}}
    >
      {children}
    </NetworkContext.Provider>
  );
}

/* CONTEXT CONSUMER ========================================================= */

export function useNetwork(): NonNullable<NetworkContext> {
  return useContext(NetworkContext) as NetworkContext;
}
