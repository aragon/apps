import React from 'react';
import {TransferListItem} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {Transfer} from 'utils/types';

// types might come from subgraph - not adding any now
type TransferListProps = {
  transfers: Array<Transfer>;
  onTransferClick: (transfer: Transfer) => void;
};

const TransferList: React.FC<TransferListProps> = ({
  transfers,
  onTransferClick,
}) => {
  const {t} = useTranslation();

  if (transfers.length === 0)
    return <p data-testid="transferList">{t('allTransfer.noTransfers')}</p>;

  return (
    <div className="space-y-2" data-testid="transferList">
      {transfers.map(transfer => {
        return (
          <TransferListItem
            key={transfer.id}
            {...transfer}
            onClick={() => onTransferClick(transfer)}
          />
        );
      })}
    </div>
  );
};

export default TransferList;
