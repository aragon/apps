import {AddButton, SearchInput, TokenCard} from '@aragon/ui-components';
import React from 'react';
import {useTranslation} from 'react-i18next';

const tokens = [
  {
    tokenName: 'DAI',
    tokenSymbol: 'DAI',
    tokenImageUrl:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
    treasurySharePercentage: '45%',
    tokenCount: '15,000,230.2323',
    tokenUSDValue: '$1',
    treasuryShare: '$15,000,230.2323',
    changeDuringInterval: '+$150,002.3',
    percentageChangeDuringInterval: '+ 0.01%',
  },
  {
    tokenName: 'Ethereum',
    tokenSymbol: 'ETH',
    tokenImageUrl:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    treasurySharePercentage: '15%',
    tokenCount: '500 ETH',
    tokenUSDValue: '$4777',
    treasuryShare: '$2,388,500',
    changeDuringInterval: '- $12,539.625',
    percentageChangeDuringInterval: '- 7.5%',
  },
];

const Tokens: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className="m-auto mt-5 space-y-5 w-8/12">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-ui-800">
            5 {t('finance.tokens')}
          </h1>
          <h2 className="text-lg font-semibold text-ui-500">
            $469,657.98 Holdings
          </h2>
        </div>
        <AddButton label="New Transfer" />
      </div>
      <SearchInput placeholder="Type to filter" />
      <div className="space-y-1.5">
        {tokens.map((token, index) => (
          <TokenCard key={index} {...token} />
        ))}
      </div>
    </div>
  );
};

export default Tokens;
