import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';

import App from './app';
import {WalletProvider} from 'context/augmentedWallet';
import {APMProvider} from 'context/elasticAPM';
import {WalletMenuProvider} from 'context/walletMenu';
import {GlobalModalsProvider} from 'context/globalModals';
import {ActionsProvider} from 'context/actions';
import {ApolloClientProvider} from 'context/apolloClient';
import 'tailwindcss/tailwind.css';

ReactDOM.render(
  <React.StrictMode>
    <APMProvider>
      <WalletProvider>
        <WalletMenuProvider>
          <GlobalModalsProvider>
            <ActionsProvider>
              <Router>
                <ApolloClientProvider>
                  <App />
                </ApolloClientProvider>
              </Router>
            </ActionsProvider>
          </GlobalModalsProvider>
        </WalletMenuProvider>
      </WalletProvider>
    </APMProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
