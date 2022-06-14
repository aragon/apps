import {InfuraProvider, Web3Provider} from '@ethersproject/providers';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useWallet} from 'hooks/useWallet';

import {INFURA_PROJECT_ID_ARB, SupportedChainID} from 'utils/constants';
import {Nullable} from 'utils/types';

const NW_ARB = {chainId: 42161, name: 'arbitrum'};
const NW_ARB_RINKEBY = {chainId: 421611, name: 'arbitrum-rinkeby'};

/* CONTEXT PROVIDER ========================================================= */

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
  const {chainId, provider} = useWallet();

  const [infuraProvider, setInfuraProvider] = useState(
    new InfuraProvider(NW_ARB, INFURA_PROJECT_ID_ARB)
  );

  useEffect(() => {
    setInfuraProvider(getInfuraProvider(chainId as SupportedChainID));
  }, [chainId]);

  return (
    <ProviderContext.Provider
      value={{infura: infuraProvider, web3: provider || null}}
    >
      {children}
    </ProviderContext.Provider>
  );
}

function getInfuraProvider(givenChainId?: SupportedChainID) {
  // NOTE Passing the chainIds from useWallet doesn't work in the case of
  // arbitrum and arbitrum-rinkeby. They need to be passed as objects.
  // However, I have no idea why this is necessary. Looking at the ethers
  // library, there's no reason why passing the chainId wouldn't work. Also,
  // I've tried it on a fresh project and had no problems there...
  // [VR 07-03-2022]
  if (givenChainId === 42161) {
    return new InfuraProvider(NW_ARB, INFURA_PROJECT_ID_ARB);
  } else if (givenChainId === 421611) {
    return new InfuraProvider(NW_ARB_RINKEBY, INFURA_PROJECT_ID_ARB);
  } else {
    return new InfuraProvider(givenChainId, INFURA_PROJECT_ID_ARB);
  }
}

/**
 * Returns provider based on the given chain id
 * @param chainId network chain is
 * @returns infura provider
 */
export function useSpecificProvider(chainId: SupportedChainID): InfuraProvider {
  const [infuraProvider, setInfuraProvider] = useState(
    getInfuraProvider(chainId)
  );

  useEffect(() => {
    setInfuraProvider(getInfuraProvider(chainId));
  }, [chainId]);

  return infuraProvider;
}

/* CONTEXT CONSUMER ========================================================= */

export function useProviders(): NonNullable<Providers> {
  return useContext(ProviderContext) as Providers;
}
