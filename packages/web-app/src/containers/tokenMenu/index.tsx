import React from 'react';
import styled from 'styled-components';
import {Modal, SearchInput, ButtonText, IconAdd} from '@aragon/ui-components';
import {Wallet} from 'use-wallet/dist/cjs/types';

import {useWallet} from 'context/augmentedWallet';
import {useTransferModalContext} from 'context/transfersModal';
import {networks} from 'utils/network';
import TokenBox from './tokenBox';

const TokenMenu: React.FC = () => {
  const {isTokenOpen, close} = useTransferModalContext();
  const {chainId}: Wallet = useWallet();

  return (
    <Modal
      open={isTokenOpen}
      onClose={() => close('token')}
      data-testid="TokenMenu"
    >
      <Container>
        <SearchInput placeholder="Type to filter ..." />
        <TokensWrapper>
          <TokensTitle>Your Tokens</TokensTitle>
          {Object.entries(networks[chainId || 4].curatedTokens).map(token => {
            // Build Token box based on each token address
            return (
              <TokenBox
                tokenName={token[0] as string}
                tokenAddress={token[1] as string}
                //TODO: This one should be automate using coinkego api
                tokenLogo={
                  'https://assets.coingecko.com/coins/images/681/small/JelZ58cv_400x400.png?1601449653'
                }
                key={token[1] as string}
              />
            );
          })}
        </TokensWrapper>
        <WideButton
          mode="secondary"
          size="large"
          label="Add Custom Token"
          iconLeft={<IconAdd />}
        />
      </Container>
    </Modal>
  );
};

export default TokenMenu;

const Container = styled.div.attrs({
  className: 'space-y-3 pb-4 pt-3',
})``;

const TokensWrapper = styled.div.attrs({
  className: 'space-y-1 mt-1',
})``;

const TokensTitle = styled.h2.attrs({
  className: 'ft-text-lg font-bold',
})``;

const WideButton = styled(ButtonText).attrs({
  className: 'w-full justify-center',
})``;
