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
