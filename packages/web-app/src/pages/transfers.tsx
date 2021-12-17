import React from 'react';
import styled from 'styled-components';
import {SearchInput} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import TransferList from 'components/transferList';
import {PageWrapper} from 'components/wrappers';
import {useTransferModalContext} from 'context/transfersModal';

import type {Transfer} from 'utils/types';

const allTransfers: Array<Transfer> = [
  {
    title: 'Deposit',
    tokenAmount: 300,
    transferDate: 'Pending...',
    tokenSymbol: 'DAI',
    transferType: 'Deposit',
    usdValue: '$200.00',
    isPending: true,
  },
  {
    title: 'Deposit DAI so I can do whatever I want whenever I want',
    tokenAmount: 300,
    tokenSymbol: 'DAI',
    transferDate: 'Yesterday',
    transferType: 'Deposit',
    usdValue: '$200.00',
  },
  {
    title: 'Withdraw',
    tokenAmount: 300,
    transferDate: 'Yesterday',
    tokenSymbol: 'DAI',
    transferType: 'Withdraw',
    usdValue: '$200.00',
  },
];

const Transfers: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();

  return (
    <Layout>
      <PageWrapper
        title={t('TransferModal.allTransfers') as string}
        buttonLabel={t('TransferModal.newTransfer') as string}
        subtitle={'$1,002,200.00 Total Volume'}
        onClick={open}
      >
        <SearchInput placeholder="Type to filter" />
        <TransferList transfers={allTransfers} />
      </PageWrapper>
    </Layout>
  );
};

export default withTransaction('Transfers', 'component')(Transfers);

const Layout = styled.div.attrs({
  className: 'm-auto mt-5 space-y-5 w-8/12',
})``;
