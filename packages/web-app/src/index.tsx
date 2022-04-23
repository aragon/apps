import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import App from './app';
import {WalletProvider} from 'context/augmentedWallet';
import {APMProvider} from 'context/elasticAPM';
import {WalletMenuProvider} from 'context/walletMenu';
import {GlobalModalsProvider} from 'context/globalModals';
import {ApolloClientProvider} from 'context/apolloClient';
import {ProvidersProvider} from 'context/providers';
import {NetworkProvider} from 'context/network';
import {UseSignerProvider} from 'use-signer';
import {IProviderOptions} from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';
import 'tailwindcss/tailwind.css';
import {UseCacheProvider} from 'hooks/useCache';
import {UseClientProvider} from 'hooks/useClient';

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
    <APMProvider>
      <Router>
        <NetworkProvider>
          <WalletProvider>
            <UseSignerProvider providerOptions={providerOptions}>
              <UseClientProvider>
                <UseCacheProvider>
                  <ProvidersProvider>
                    <WalletMenuProvider>
                      <GlobalModalsProvider>
                        <ApolloClientProvider>
                          <App />
                        </ApolloClientProvider>
                      </GlobalModalsProvider>
                    </WalletMenuProvider>
                  </ProvidersProvider>
                </UseCacheProvider>
              </UseClientProvider>
            </UseSignerProvider>
          </WalletProvider>
        </NetworkProvider>
      </Router>
    </APMProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
