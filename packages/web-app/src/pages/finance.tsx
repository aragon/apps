import React from 'react';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import {
  PageWrapper,
  TokenSectionWrapper,
  TransferSectionWrapper,
} from 'components/wrappers';
import TokenList from 'components/tokenList';
import {sortTokens} from 'utils/tokens';
import TransferList from 'components/transferList';
import {useDaoVault} from 'hooks/useDaoVault';
import {useDaoTransfers} from 'hooks/useDaoTransfers';
import {TransferTypes} from 'utils/constants';
import type {Transfer} from 'utils/types';
import {useGlobalModalContext} from 'context/globalModals';

// TODO remove this. Instead use first x transfers returned by categorized
// transfers hook.
const TEMP_TRANSFERS: Transfer[] = [
  {
    title: 'Deposit',
    tokenAmount: 300,
    tokenSymbol: 'DAI',
    transferDate: 'Pending...',
    transferType: TransferTypes.Deposit,
    usdValue: '$200.00',
    isPending: true,
  },
  {
    title:
      'Deposit DAI so I can do whatever I want whenever I want and I really want this reference to be long',
    tokenAmount: 300,
    tokenSymbol: 'DAI',
    transferDate: 'Yesterday',
    transferType: TransferTypes.Deposit,
    usdValue: '$200.00',
  },
  {
    title: 'Withdraw',
    tokenAmount: 300,
    tokenSymbol: 'DAI',
    transferDate: 'Yesterday',
    transferType: TransferTypes.Withdraw,
    usdValue: '$200.00',
  },
];

const Finance: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {tokens, totalAssetChange, totalAssetValue} = useDaoVault(
    '0x79fde96a6182adbd9ca4a803ba26f65a893fbf4f'
  );

  useDaoTransfers();

  sortTokens(tokens, 'treasurySharePercentage');
  const displayedTokens = tokens.slice(0, 5);

  return (
    <PageWrapper
      title={new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(totalAssetValue)}
      buttonLabel={t('TransferModal.newTransfer')}
      subtitle={new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'always',
      }).format(totalAssetChange)}
      sign={Math.sign(totalAssetChange)}
      timePeriod="24h" // temporarily hardcoded
      onClick={open}
    >
      <div className={'h-4'} />
      <TokenSectionWrapper title={t('finance.tokenSection')}>
        <div className="py-2 space-y-2 border-solid">
          <TokenList tokens={displayedTokens} />
        </div>
      </TokenSectionWrapper>
      <div className={'h-4'} />
      <TransferSectionWrapper title={t('finance.transferSection')} showButton>
        <div className="py-2 space-y-2">
          <TransferList transfers={TEMP_TRANSFERS} />
        </div>
      </TransferSectionWrapper>
    </PageWrapper>
  );
};

export default withTransaction('Finance', 'component')(Finance);
