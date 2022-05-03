import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import {
  PageWrapper,
  TokenSectionWrapper,
  TransferSectionWrapper,
} from 'components/wrappers';
import TokenList from 'components/tokenList';
import {TEST_DAO} from 'utils/constants';
import {Transfer} from 'utils/types';
import {sortTokens} from 'utils/tokens';
import TransferList from 'components/transferList';
import {useDaoVault} from 'hooks/useDaoVault';
import TransactionDetail from 'containers/transactionDetail';
import {useGlobalModalContext} from 'context/globalModals';
import TransferMenu from 'containers/transferMenu';
import styled from 'styled-components';
import {useDaoExists} from 'hooks/data/useDaoExists';

const Finance: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {tokens, totalAssetChange, totalAssetValue, transfers} =
    useDaoVault(TEST_DAO);
  const {data} = useDaoExists('0x07de9a02a1c7e09bae5b15b7270e5b1ba2029bfd');

  // Transaction detail
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer>(
    {} as Transfer
  );
  const [showTransactionDetail, setShowTransactionDetail] =
    useState<boolean>(false);

  sortTokens(tokens, 'treasurySharePercentage');
  const displayedTokens = tokens.slice(0, 5);

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/
  const handleTransferClicked = useCallback((transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setShowTransactionDetail(true);
  }, []);

  return (
    <>
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
          <ListContainer>
            <TokenList tokens={displayedTokens} />
          </ListContainer>
        </TokenSectionWrapper>
        <div className={'h-4'} />
        <TransferSectionWrapper title={t('finance.transferSection')} showButton>
          <ListContainer>
            <TransferList
              transfers={transfers}
              onTransferClick={handleTransferClicked}
            />
          </ListContainer>
        </TransferSectionWrapper>
        <div className="p-2 m-5 space-y-1 bg-primary-100">
          <p>
            This is a temporarily added section for demonstration purposes. It
            tests querying of existence of daos.
          </p>
          {data ? <p>DAO exists</p> : <p>DAO does not exist</p>}
        </div>
      </PageWrapper>
      <TransactionDetail
        isOpen={showTransactionDetail}
        onClose={() => setShowTransactionDetail(false)}
        transfer={selectedTransfer}
      />
      <TransferMenu />
    </>
  );
};

const ListContainer = styled.div.attrs({
  className: 'py-2 space-y-2',
})``;

export default withTransaction('Finance', 'component')(Finance);
