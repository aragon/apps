import {AddButton, SearchInput, TransferListItem} from '@aragon/ui-components';
import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {useTransferModalContext} from 'context/transfersModal';
import {PageWrapper} from 'components/wrappers';
import {Transfers} from 'utils/types';

const transfers: Array<Transfers> = [
  {
    title: 'Deposit',
    tokenAmount: 300,
    tokenSymbol: 'DAI',
    transferDate: 'Pending...',
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
    tokenSymbol: 'DAI',
    transferDate: 'Yesterday',
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
        <CenteredFlex>
          <div className="space-y-1">
            <Title>{t('finance.allTransfers')}</Title>
            <SubTitle>$1,002,200.00 {t('finance.totalVolume')}</SubTitle>
          </div>
          <AddButton label={t('finance.newTransfer')} />
        </CenteredFlex>
        <SearchInput placeholder="Type to filter" />
        <div className="space-y-1.5">
          {transfers.map((token, index) => (
            <TransferListItem key={index} {...token} />
          ))}
        </div>
      </PageWrapper>
    </Layout>
  );
};

export default withTransaction('Transfers', 'component')(Transfers);

const Layout = styled.div.attrs({
  className: 'm-auto mt-5 space-y-5 w-8/12',
})``;

const CenteredFlex = styled.div.attrs({
  className: 'flex justify-between items-center',
})``;

const Title = styled.h1.attrs({
  className: 'text-2xl font-bold text-ui-800',
})``;

const SubTitle = styled.h2.attrs({
  className: 'text-lg font-semibold text-ui-500',
})``;
