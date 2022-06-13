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
  const client = useContext(UseClientContext);
  if (client === null) {
    throw new Error(
      'useClient() can only be used on the descendants of <UseClientProvider />'
    );
  }
  return client;
};

export const UseClientProvider = ({children}: {children: ReactNode}) => {
  const {signer} = useWallet();
  const [erc20Client, setErc20Client] = useState<ClientDaoERC20Voting>();
  const [whitelistClient, setWhitelistClient] =
    useState<ClientDaoWhitelistVoting>();

  useEffect(() => {
    if (signer) {
      const web3Providers = import.meta.env
        .VITE_REACT_APP_SDK_WEB3_PROVIDERS as string;

      const context = new SdkContext({
        network: 'rinkeby', // TODO: remove temporarily hardcoded network
        signer,
        web3Providers: web3Providers
          ? web3Providers.split(',')
          : [
              'https://eth-rinkeby.alchemyapi.io/v2/bgIqe2NxazpzsjfmVmhj3aS3j_HZ9mpr',
            ],
      });

      setErc20Client(new ClientDaoERC20Voting(context));
      setWhitelistClient(new ClientDaoWhitelistVoting(context));
    }
  }, [signer]);

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
