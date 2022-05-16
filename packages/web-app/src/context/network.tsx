import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useMatch, useNavigate} from 'react-router-dom';

import {
  CHAIN_METADATA,
  isSupportedNetwork,
  SupportedNetworks,
} from 'utils/constants';
import {toHex} from 'utils/library';
import {NotFound} from 'utils/paths';

/* CONTEXT PROVIDER ========================================================= */

type NetworkContext = {
  network: SupportedNetworks;
  setNetwork: (network: SupportedNetworks) => void;
  switchWalletNetwork: () => Promise<void>;
};

const NetworkContext = createContext<NetworkContext>({
  network: 'ethereum',
  setNetwork: () => {},
  switchWalletNetwork: async () => {},
});

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
  const urlNetworkMatch = useMatch(':network/*');
  const urlNotFoundMatch = useMatch('not-found');
  const urlCreateMatch = useMatch('create');
  const navigate = useNavigate();

  const [isNetworkFlexible, setIsNetworkFlexible] = useState<boolean>(false);
  const [networkState, setNetworkState] =
    useState<SupportedNetworks>('ethereum');

  const changeNetwork = useCallback(
    newNetwork => {
      if (isNetworkFlexible) setNetworkState(newNetwork);
      else console.error('Network may not be changed on this page');
    },
    [isNetworkFlexible]
  );

  const switchNetwork = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: toHex(CHAIN_METADATA[networkState].id)}], // chainId must be in hexadecimal numbers
        });
      } catch (error: any) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: CHAIN_METADATA[networkState].name,
                  chainId: toHex(CHAIN_METADATA[networkState].id),
                  rpcUrls: CHAIN_METADATA[networkState].rpc,
                  nativeCurrency: CHAIN_METADATA[networkState].nativeCurrency,
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      // if no window.ethereum then MetaMask is not installed
      alert(
        'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
      );
    }
  };

  useEffect(() => {
    const networkParam = urlNetworkMatch?.params?.network;
    const isNotFound = urlNotFoundMatch !== null;
    const isCreate = urlCreateMatch !== null;

    if (isNotFound || isCreate || !networkParam) {
      setIsNetworkFlexible(true);
    } else if (!isSupportedNetwork(networkParam)) {
      console.warn('network not found');
      navigate(NotFound, {replace: true});
    } else {
      setNetworkState(networkParam);
    }
  }, [urlNetworkMatch, urlNotFoundMatch, navigate, urlCreateMatch]);

  return (
    <NetworkContext.Provider
      value={{
        network: networkState,
        setNetwork: changeNetwork,
        switchWalletNetwork: switchNetwork,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}

/* CONTEXT CONSUMER ========================================================= */

export function useNetwork(): NonNullable<NetworkContext> {
  return useContext(NetworkContext) as NetworkContext;
}
