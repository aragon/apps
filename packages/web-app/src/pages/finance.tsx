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
import {useGlobalModalContext} from 'context/globalModals';

const Finance: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {tokens, totalAssetChange, totalAssetValue, transfers} = useDaoVault(
    '0x51c3ddb42529bfc24d4c13192e2e31421de459bc'
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
          <TransferList transfers={transfers} />
        </div>
      </TransferSectionWrapper>
    </PageWrapper>
  );
};

export default withTransaction('Finance', 'component')(Finance);
