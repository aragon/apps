import {
  ButtonText,
  IconChevronRight,
  IconFinance,
  ListItemHeader,
  TransferListItem,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useNavigate, generatePath} from 'react-router-dom';

import {useNetwork} from 'context/network';
import {AllTransfers} from 'utils/paths';
import {useGlobalModalContext} from 'context/globalModals';
import {useTransactionDetailContext} from 'context/transactionDetail';
import {Transfer} from 'utils/types';

type Props = {
  dao: string;
  transfers: Transfer[];
  totalAssetValue: number;
};

const TreasurySnapshot: React.FC<Props> = ({
  dao,
  transfers,
  totalAssetValue,
}) => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {handleTransferClicked} = useTransactionDetailContext();

  if (transfers.length === 0) {
    return (
      <div className="flex flex-1 justify-center items-center border">
        Empty State Placeholder
      </div>
    );
  }

  return (
    <Container>
      <ListItemHeader
        icon={<IconFinance />}
        value={new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(totalAssetValue)}
        label={t('labels.treasuryValue')}
        buttonText={t('allTransfer.newTransfer')}
        orientation="vertical"
        onClick={() => open()}
      />
      {transfers.slice(0, 3).map(transfer => (
        <TransferListItem
          key={transfer.id}
          {...transfer}
          onClick={() => handleTransferClicked(transfer)}
        />
      ))}
      <ButtonText
        mode="secondary"
        size="large"
        iconRight={<IconChevronRight />}
        label={t('labels.seeAll')}
        onClick={() => navigate(generatePath(AllTransfers, {network, dao}))}
      />
    </Container>
  );
};

export default TreasurySnapshot;

const Container = styled.div.attrs({
  className: 'space-y-1.5 desktop:space-y-2',
})``;
