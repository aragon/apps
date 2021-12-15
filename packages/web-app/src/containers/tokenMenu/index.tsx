import React, {useMemo} from 'react';
import styled from 'styled-components';
import {
  Modal,
  SearchInput,
  ButtonText,
  IconAdd,
  Avatar,
} from '@aragon/ui-components';

import {useTransferModalContext} from 'context/transfersModal';

const TokenMenu: React.FC = () => {
  const {isTokenOpen, close} = useTransferModalContext();

  const Tokens = useMemo(() => {
    return (
      <>
        <TokenBox>
          <Avatar
            size="small"
            src="https://assets.coingecko.com/coins/images/681/small/JelZ58cv_400x400.png?1601449653"
          />
        </TokenBox>
        <TokenBox>
          <Avatar
            size="small"
            src="https://assets.coingecko.com/coins/images/681/small/JelZ58cv_400x400.png?1601449653"
          />
        </TokenBox>
        <TokenBox>
          <Avatar
            size="small"
            src="https://assets.coingecko.com/coins/images/681/small/JelZ58cv_400x400.png?1601449653"
          />
        </TokenBox>
      </>
    );
  }, []);

  return (
    <Modal open={true} onClose={() => close('token')} data-testid="TokenMenu">
      <Container>
        <SearchInput placeholder="Type to filter ..." />
        <TokensWrapper>
          <TokensTitle>Your Tokens</TokensTitle>
          {Tokens}
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

const TokenBox = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2 bg-white rounded-xl',
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
