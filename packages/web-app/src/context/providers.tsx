import {InfuraProvider, Web3Provider} from '@ethersproject/providers';
import {providers as EthersProviders} from 'ethers';
import {Interface, getAddress, hexZeroPad} from 'ethers/lib/utils';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

import {erc20TokenABI} from 'abis/erc20TokenABI';
import {INFURA_PROJECT_ID} from 'utils/constants';
import {HookData, Nullable} from 'utils/types';

type Providers = {
  infura: InfuraProvider;
  web3: Nullable<Web3Provider>;
};

const ProviderContext = createContext<Nullable<Providers>>(null);

type ProviderProviderProps = {
  children: React.ReactNode;
};

export function ProvidersProvider({children}: ProviderProviderProps) {
  const {ethereum, chainId} = useWallet();

  const [web3Provider, setWeb3Provider] = useState(
    ethereum ? new EthersProviders.Web3Provider(ethereum) : null
  );

  const [infuraProvider, setInfuraProvider] = useState(
    new EthersProviders.InfuraProvider(chainId, INFURA_PROJECT_ID)
  );

  useEffect(() => {
    setInfuraProvider(
      new EthersProviders.InfuraProvider(chainId, INFURA_PROJECT_ID)
    );
  }, [chainId]);

  useEffect(() => {
    setWeb3Provider(
      ethereum ? new EthersProviders.Web3Provider(ethereum) : null
    );
  }, [ethereum]);

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

export function useWalletTokens(): HookData<string[]> {
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
