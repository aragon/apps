import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {Client, Context as SdkContext} from '@aragon/sdk-client';
import {useWallet} from './useWallet';

const UseClientContext = createContext<Client | undefined>({} as Client);

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
  const [client, setClient] = useState<Client>();

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
        daoFactoryAddress: '0xF4433059cb12E224EF33510a3bE3329c8c750fD8', // TODO: remove temporary until SDK updates
      });

      setClient(new Client(context));
    }
  }, [signer]);

  const value: Client | undefined = client;

  return (
    <UseClientContext.Provider value={value}>
      {children}
    </UseClientContext.Provider>
  );
};
