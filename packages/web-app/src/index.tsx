import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import App from './app';
import {WalletProvider} from 'context/augmentedWallet';
import {APMProvider} from 'context/elasticAPM';
import {WalletMenuProvider} from 'context/walletMenu';
import {GlobalModalsProvider} from 'context/globalModals';
import {ApolloClientProvider} from 'context/apolloClient';
import 'tailwindcss/tailwind.css';
import {ProvidersProvider} from 'context/providers';
import {NetworkProvider} from 'context/network';

ReactDOM.render(
  <React.StrictMode>
    <APMProvider>
      <Router>
        <NetworkProvider>
          <WalletProvider>
            <ProvidersProvider>
              <WalletMenuProvider>
                <GlobalModalsProvider>
                  <ApolloClientProvider>
                    <App />
                  </ApolloClientProvider>
                </GlobalModalsProvider>
              </WalletMenuProvider>
            </ProvidersProvider>
          </WalletProvider>
        </NetworkProvider>
      </Router>
    </APMProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
