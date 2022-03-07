import {InfuraProvider, Web3Provider} from '@ethersproject/providers';
import {Interface, getAddress, hexZeroPad} from 'ethers/lib/utils';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

import {erc20TokenABI} from 'abis/erc20TokenABI';
import {INFURA_PROJECT_ID_ARB} from 'utils/constants';
import {HookData, Nullable} from 'utils/types';

const NW_ARB = {chainId: 42161, name: 'arbitrum'};
const NW_ARB_RINKEBY = {chainId: 421611, name: 'arbitrum-rinkeby'};

type Providers = {
  infura: InfuraProvider;
  web3: Nullable<Web3Provider>;
};

const ProviderContext = createContext<Nullable<Providers>>(null);

type ProviderProviderProps = {
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
export function ProvidersProvider({children}: ProviderProviderProps) {
  const {chainId, ethereum} = useWallet();
  const [web3Provider, setWeb3Provider] = useState(
    ethereum ? new Web3Provider(ethereum) : null
  );

  const [infuraProvider, setInfuraProvider] = useState(
    new InfuraProvider(NW_ARB, INFURA_PROJECT_ID_ARB)
  );

  useEffect(() => {
    // NOTE Passing the chainIds from useWallet doesn't work in the case of
    // arbitrum and arbitrum-rinkeby. They need to be passed as objects.
    // However, I have no idea why this is necessary. Looking at the ethers
    // library, there's no reason why passing the chainId wouldn't work. Also,
    // I've tried it on a fresh project and had no problems there...
    if (chainId === 42161) {
      setInfuraProvider(new InfuraProvider(NW_ARB, INFURA_PROJECT_ID_ARB));
    } else if (chainId === 421611) {
      setInfuraProvider(
        new InfuraProvider(NW_ARB_RINKEBY, INFURA_PROJECT_ID_ARB)
      );
    } else {
      setInfuraProvider(new InfuraProvider(chainId, INFURA_PROJECT_ID_ARB));
    }
  }, [chainId]);

  useEffect(() => {
    setWeb3Provider(ethereum ? new Web3Provider(ethereum) : null);
  }, [ethereum, chainId]);

  return (
    <ProviderContext.Provider
      value={{infura: infuraProvider, web3: web3Provider}}
    >
      {children}
    </ProviderContext.Provider>
  );
}

export function useProviders(): NonNullable<Providers> {
  return useContext(ProviderContext) as Providers;
}

export function useWalletTokensList(): HookData<string[]> {
  const {account} = useWallet();
  const {web3} = useContext(ProviderContext) as Providers;

  const [tokenList, setTokenList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    async function fetchTokenList() {
      setIsLoading(true);

      if (web3 && account) {
        try {
          const erc20Interface = new Interface(erc20TokenABI);
          const latestBlockNumber = await web3.getBlockNumber();

          // Get all transfers sent to the input address
          const transfers = await web3.getLogs({
            fromBlock: 0,
            toBlock: latestBlockNumber,
            topics: [
              erc20Interface.getEventTopic('Transfer'),
              null,
              hexZeroPad(account as string, 32),
            ],
          });
          // Filter unique token contract addresses and convert all events to Contract instances
          const tokens = await Promise.all(
            transfers
              .filter(
                (event, i) =>
                  i ===
                  transfers.findIndex(other => event.address === other.address)
              )
              .map(event => getAddress(event.address))
          );
          setTokenList(tokens);
        } catch (error) {
          setError(new Error('Failed to fetch ENS name'));
          console.error(error);
        }
      } else {
        setTokenList([]);
      }
      setIsLoading(false);
    }

    fetchTokenList();
  }, [account, web3]);

  return {data: tokenList, isLoading, error};
}
