import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Modal, SearchInput, ButtonText, IconAdd} from '@aragon/ui-components';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import TokenBox from './tokenBox';
import {useWallet} from 'context/augmentedWallet';
import {formatUnits} from 'utils/library';
import {useTokenInfo} from 'hooks/useTokenInformation';
import {fetchBalance} from 'utils/tokens';
import {curatedTokens} from 'utils/network';
import {BaseTokenInfo} from 'utils/types';
import {useTransferModalContext} from 'context/transfersModal';

type TokenMenuProps = {
  onTokenSelect: (token: BaseTokenInfo) => void;
};

const TokenMenu: React.FC<TokenMenuProps> = ({onTokenSelect}) => {
  const {t} = useTranslation();
  const [tokens, setTokens] = useState<BaseTokenInfo[]>([]);
  const {isTokenOpen, close} = useTransferModalContext();
  const {chainId, account, provider} = useWallet();
  const [searchValue, setSearchValue] = useState('');

  /*************************************************
   *                     Hooks                     *
   *************************************************/
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

  const {data} = useTokenInfo(tokenBalances);

  useEffect(() => {
    // fetch token balances
    async function fetchBalances() {
      if (account) {
        const allPromise = Promise.all(
          tokenBalances.map(({address}) => {
            return fetchBalance(address, account, provider, false);
          })
        );

        const balances = await allPromise;
        setTokens(
          data.map((token, index) => {
            return {...token, count: balances[index]} as BaseTokenInfo;
          })
        );
      }
    }

    fetchBalances();
  }, [account, data, provider, tokenBalances]);

  /*************************************************
   *             Functions and Handlers            *
   *************************************************/
  const handleTokenClick = (token: BaseTokenInfo) => {
    onTokenSelect(token);
    close('token');
  };

  const filterValidator = useCallback(
    (token: BaseTokenInfo) => {
      if (searchValue !== '') {
        const re = new RegExp(searchValue, 'i');
        return token.name.match(re) || token.symbol.match(re);
      }
      return true;
    },
    [searchValue]
  );

  const renderTokens = () => {
    const tokenList = tokens.filter(filterValidator);

    return tokenList.length !== 0 ? (
      <>
        <TokenTitle>{t('TokenModal.yourTokens')}</TokenTitle>
        {tokenList.map(token => (
          <div key={token.address} onClick={() => handleTokenClick(token)}>
            <TokenBox
              tokenName={token.name}
              tokenLogo={token.imgUrl}
              tokenSymbol={token.symbol}
              tokenBalance={formatUnits(token.count, token.decimals)}
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

  /*************************************************
   *                    Render                     *
   *************************************************/
  //TODO: Cross Icon should added in the next released
  return (
    <Modal
      open={isTokenOpen}
      onClose={() => close('token')}
      data-testid="TokenMenu"
    >
      <Container>
        <SearchInput
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />
        <TokensWrapper>{renderTokens()}</TokensWrapper>
        <WideButton
          mode="secondary"
          size="large"
          label="Add Custom Token"
          iconLeft={<IconAdd />}
          onClick={() =>
            handleTokenClick({
              address: '',
              count: BigInt(0),
              decimals: 18,
              imgUrl: '',
              symbol: searchValue,
              name: '',
            })
          }
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
