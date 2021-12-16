import React from 'react';
import styled from 'styled-components';
import {Modal, SearchInput, ButtonText, IconAdd} from '@aragon/ui-components';

import {useTransferModalContext} from 'context/transfersModal';
import {networks} from 'utils/network';
import TokenBox from './tokenBox';

const TokenMenu: React.FC = () => {
  const {isTokenOpen, close} = useTransferModalContext();

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
          {Object.entries(networks[1].curatedTokens).map(token => {
            return (
              <TokenBox
                tokenName={token[0]}
                tokenAddress={token[1]}
                key={token[1]}
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
