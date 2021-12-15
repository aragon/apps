import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {
  Modal,
  SearchInput,
  ButtonText,
  IconAdd,
  Avatar,
} from '@aragon/ui-components';
import {Wallet} from 'use-wallet/dist/cjs/types';

import {useTransferModalContext} from 'context/transfersModal';
import {networks} from 'utils/network';
import {ChainId as ChainIdType} from 'utils/types';
import {useWallet} from 'context/augmentedWallet';
import {FetchBalance} from 'services/amount';

type TokenProps = {
  tokenAddress: string;
  tokenName: string;
};

function TokenBoxContent({tokenName, tokenAddress}: TokenProps) {
  // const [tokenInfo, setTokenInfo] = useState();
  // const {account, provider} = useWallet();

  console.log('checkit');
  // if (account && tokenAddress) {
  //   const balanse = FetchBalance(tokenAddress, account, provider);
  //   console.log('balanse', balanse);
  // }
  return <div></div>;

  // return (
  //   <TokenBox>
  //     <TokenNameWrapper>
  //       <Avatar
  //         size="small"
  //         src="https://assets.coingecko.com/coins/images/681/small/JelZ58cv_400x400.png?1601449653"
  //       />
  //       <Name>ANT</Name>
  //     </TokenNameWrapper>
  //     <Price>25,302.230 ANT</Price>
  //   </TokenBox>
  // );
}

const TokenMenu: React.FC = () => {
  const {isTokenOpen, close} = useTransferModalContext();
  const {account, provider} = useWallet();

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
          {Object.entries(networks[1].curatedTokens).forEach(
            ([tokenName, tokenAddress]) => {
              const balanse = FetchBalance(tokenAddress, account, provider);
              console.log(
                'balanse',
                balanse.then(data => console.log('seno', data))
              );
            }
          )}
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

const TokenNameWrapper = styled.div.attrs({
  className: 'flex space-x-2',
})``;

const TokensWrapper = styled.div.attrs({
  className: 'space-y-1 mt-1',
})``;

const TokensTitle = styled.h2.attrs({
  className: 'ft-text-lg font-bold',
})``;

const Name = styled.h2.attrs({
  className: 'ft-text-lg text-ui-800 font-bold',
})``;

const Price = styled.h2.attrs({
  className: 'ft-text-lg text-ui-600',
})``;

const WideButton = styled(ButtonText).attrs({
  className: 'w-full justify-center',
})``;
