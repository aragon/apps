import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';

import App from './app';
import {APMProvider} from 'context/elasticAPM';
import {WalletProvider} from 'context/augmentedWallet';
import {WalletMenuProvider} from 'context/walletMenu';
import {GlobalModalsProvider} from 'context/globalModals';
import {ProvidersProvider} from 'context/providers';
import {NetworkProvider} from 'context/network';
import {UseSignerProvider} from 'use-signer';
import {IProviderOptions} from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';
import {client, rinkebyClient} from 'context/apolloClient';
import 'tailwindcss/tailwind.css';
import {UseCacheProvider} from 'hooks/useCache';
import {UseClientProvider} from 'hooks/useClient';
import {PrivacyContextProvider} from 'context/privacyContext';
import {TransactionDetailProvider} from 'context/transactionDetail';

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId:
        import.meta.env.VITE_REACT_APP_RPC || 'mainnet.eth.aragon.network',
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <PrivacyContextProvider>
      <APMProvider>
        <Router>
          <NetworkProvider>
            <WalletProvider>
              <UseSignerProvider providerOptions={providerOptions}>
                <UseClientProvider>
                  <UseCacheProvider>
                    <ProvidersProvider>
                      <TransactionDetailProvider>
                        <WalletMenuProvider>
                          <GlobalModalsProvider>
                            {/* By default, rinkeby client is chosen, each useQuery needs to pass the network client it needs as argument
                      For REST queries using apollo, there's no need to pass a different client to useQuery  */}
                            <ApolloProvider
                              client={client['rinkeby'] || rinkebyClient} //TODO remove fallback when all clients are defined
                            >
                              <App />
                            </ApolloProvider>
                          </GlobalModalsProvider>
                        </WalletMenuProvider>
                      </TransactionDetailProvider>
                    </ProvidersProvider>
                  </UseCacheProvider>
                </UseClientProvider>
              </UseSignerProvider>
            </WalletProvider>
          </NetworkProvider>
        </Router>
      </APMProvider>
    </PrivacyContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
