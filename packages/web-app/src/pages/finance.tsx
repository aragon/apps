import React from 'react';
import styled from 'styled-components';
import {constants} from 'ethers';
import {TokenCard} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

import {
  TokenSectionWrapper,
  TransferSectionWrapper,
} from 'components/sectionWrapper';
import usePollTokens from 'hooks/usePollTokens';

// Temporary, should be gotten from subgraph or as props
const TEMP_TOKENS = [
  {
    name: 'Ethereum',
    address: constants.AddressZero,
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    count: 0.255555,
    symbol: 'ETH',
    decimals: 18,
  },
  {
    name: 'Aragon',
    address: '0xa117000000f279d81a1d3cc75430faa017fa5a2e',
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1680.png',
    count: 6,
    symbol: 'ANT',
  },
  {
    name: 'Dai',
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
    count: 245,
    symbol: 'DAI',
  },
  {
    name: 'Patito DAO TOken',
    address: 'randomAddress',
    imgUrl: '',
    count: 500000,
    symbol: 'PDT',
    decimals: 18,
  },
  {
    name: 'Tether',
    address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
    count: 344578,
    symbol: 'USDT',
    decimals: 6,
  },
];

const POLL_TOKEN_LIST = TEMP_TOKENS.map(({address, decimals}) => ({
  address,
  decimals,
}));

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 4,
});

const Finance: React.FC = () => {
  const {t} = useTranslation();
  const {prices} = usePollTokens(POLL_TOKEN_LIST);

  return (
    <div className={'m-auto mt-4 w-8/12'}>
      <h1 className={'text-2xl font-bold text-center'}>Finance Page</h1>
      <div className={'h-4'} />
      <TokenSectionWrapper title={t('finance.tokenSection')}>
        <div className="py-2 space-y-2 border-solid">
          {prices &&
            TEMP_TOKENS.map(token => {
              return (
                <TokenCard
                  key={token.name}
                  tokenName={token.name}
                  tokenCount={numberFormatter.format(token.count)}
                  tokenSymbol={token.symbol}
                  tokenImageUrl={token.imgUrl}
                  changeDuringInterval="+$150,002.3"
                  treasurySharePercentage="20%"
                  percentageChangeDuringInterval="+ 0.01%"
                  tokenUSDValue={
                    prices[token.address]
                      ? usdFormatter.format(Number(prices[token.address]))
                      : t('finance.unknownUSDValue')
                  }
                  treasuryShare={
                    prices[token.address]
                      ? usdFormatter.format(
                          Number(prices[token.address]) * token.count
                        )
                      : t('finance.unknownUSDValue')
                  }
                />
              );
            })}
        </div>
      </TokenSectionWrapper>
      <div className={'h-4'} />
      <TransferSectionWrapper title={t('finance.transferSection')}>
        <div className="my-2 space-y-2 border-solid">
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
        </div>
      </TransferSectionWrapper>
    </div>
  );
};

export default Finance;

const ColoredDiv = styled.div.attrs({className: 'h-6 w-full bg-blue-100'})``;
