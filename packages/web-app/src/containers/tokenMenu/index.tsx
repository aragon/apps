import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {Modal, SearchInput, ButtonText, IconAdd} from '@aragon/ui-components';
import {Wallet} from 'use-wallet/dist/cjs/types';
import {useTranslation} from 'react-i18next';
import {useForm, Controller} from 'react-hook-form';

import {useWallet} from 'context/augmentedWallet';
import {useTransferModalContext} from 'context/transfersModal';
import {curatedTokens} from 'utils/network';
import TokenBox from './tokenBox';
import {useTokenInfo} from 'hooks/useTokenInformation';
import {BaseTokenInfo} from 'utils/types';

type TokenMenuProps = {
  onTokenSelect: (token: BaseTokenInfo) => void;
};

const TokenMenu: React.FC<TokenMenuProps> = ({onTokenSelect}) => {
  const {isTokenOpen, close} = useTransferModalContext();
  const [searchValue, setSearchValue] = useState('');
  const {chainId}: Wallet = useWallet();
  const {t} = useTranslation();

  const curatedTokenAddresses = useMemo(
    () => Object.entries(curatedTokens[chainId || 4].curatedTokens),
    [chainId]
  );

  const tokenBalances = useMemo(
    () =>
      curatedTokenAddresses.map(value => ({
        address: value[1],
        count: BigInt(0),
      })),
    [curatedTokenAddresses]
  );

  const {data: tokens} = useTokenInfo(tokenBalances);

  const handleTokenClick = (token: BaseTokenInfo) => {
    onTokenSelect(token);
    close('token');
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // console.log(info);

  // const filterValidator = useCallback(
  //   (token: any) => {
  //     console.log(token);
  //     if (searchValue !== '') {
  //       const re = new RegExp(searchValue, 'i');
  //       // return token[0].match(re);
  //     }
  //     return true;
  //   },
  //   [searchValue]
  // );

  const renderResult = () => {
    const tokenList = tokens;

    return tokenList.length !== 0 ? (
      <>
        <TokenTitle>{t('TokenModal.yourTokens')}</TokenTitle>
        {tokenList.map(token => (
          <div key={token.address} onClick={() => handleTokenClick(token)}>
            <TokenBox
              tokenName={token.name}
              tokenLogo={token.imgUrl}
              tokenSymbol={token.symbol}
              tokenAddress={token.address}
            />
          </div>
        ))}
      </>
    ) : (
      <NoTokenWrapper>
        <TokenTitle>{t('TokenModal.tokenNotFoundTitle')}</TokenTitle>
        <TokenSubtitle>{t('TokenModal.tokenNotFoundSubtitle')}</TokenSubtitle>
      </NoTokenWrapper>
    );
  };

  //TODO: tokenLogo should be automate using coingeko api
  //TODO: Cross Icon should added in the next released
  return (
    <Modal
      open={isTokenOpen}
      onClose={() => close('token')}
      data-testid="TokenMenu"
    >
      <Container>
        <SearchInput />
        <TokensWrapper>{renderResult()}</TokensWrapper>
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

const TokenTitle = styled.h2.attrs({
  className: 'text-base font-bold',
})``;

const TokenSubtitle = styled.h2.attrs({
  className: 'text-sm',
})``;

const WideButton = styled(ButtonText).attrs({
  className: 'w-full justify-center',
})``;

const NoTokenWrapper = styled.div.attrs({
  className: 'space-y-0.5',
})``;
