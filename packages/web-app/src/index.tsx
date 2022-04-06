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
import {TransactionsProvider} from 'context/transactions';

ReactDOM.render(
  <React.StrictMode>
    <APMProvider>
      <WalletProvider>
        <ProvidersProvider>
          <WalletMenuProvider>
            <GlobalModalsProvider>
              <TransactionsProvider>
                <Router>
                  <ApolloClientProvider>
                    <App />
                  </ApolloClientProvider>
                </Router>
              </TransactionsProvider>
            </GlobalModalsProvider>
          </WalletMenuProvider>
        </ProvidersProvider>
      </WalletProvider>
    </APMProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
