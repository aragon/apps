import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ClientDaoERC20Voting,
  ClientDaoWhitelistVoting,
  Context as SdkContext,
} from '@aragon/sdk-client';
import {useWallet} from './useWallet';

interface ClientContext {
  erc20?: ClientDaoERC20Voting;
  whitelist?: ClientDaoWhitelistVoting;
}
const UseClientContext = createContext<ClientContext>({} as ClientContext);

export const useClient = () => {
  const ctx = useContext(UseClientContext);
  if (ctx === null) {
    throw new Error(
      'useClient() can only be used on the descendants of <UseClientProvider />'
    );
  }
  return ctx;
};
export const UseClientProvider = ({children}: {children: ReactNode}) => {
  const {chainId, signer} = useWallet();
  const [erc20Client, setErc20Client] = useState<ClientDaoERC20Voting>();
  const [whitelistClient, setWhitelistClient] =
    useState<ClientDaoWhitelistVoting>();

  useEffect(() => {
    if (signer) {
      const web3Providers = import.meta.env
        .VITE_REACT_APP_SDK_WEB3_PROVIDERS as string;
      const context = new SdkContext({
        network: chainId,
        web3Providers: web3Providers
          ? web3Providers.split(',')
          : [
              'https://eth-rinkeby.alchemyapi.io/v2/bgIqe2NxazpzsjfmVmhj3aS3j_HZ9mpr',
            ],
        daoFactoryAddress:
          (import.meta.env.VITE_REACT_APP_SDK_DAO_FACTORY_ADDRESS as string) ||
          '0xa0b2B729DE73cd22406d3D5A31816985c04A7cdD',
        signer: signer,
      });
      setErc20Client(new ClientDaoERC20Voting(context));
      setWhitelistClient(new ClientDaoWhitelistVoting(context));
    }
  }, [signer, chainId]);

  const value: ClientContext = {
    erc20: erc20Client,
    whitelist: whitelistClient,
  };
  return (
    <UseClientContext.Provider value={value}>
      {children}
    </UseClientContext.Provider>
  );
};