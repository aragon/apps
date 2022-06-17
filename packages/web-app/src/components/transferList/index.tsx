import React from 'react';
import {TransferListItem} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {Transfer} from 'utils/types';
import {abbreviateTokenAmount} from 'utils/tokens';

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
      {transfers.map(({tokenAmount, ...rest}) => (
        <TransferListItem
          key={rest.id}
          tokenAmount={abbreviateTokenAmount(tokenAmount)}
          {...rest}
          onClick={() => onTransferClick({tokenAmount, ...rest})}
        />
      ))}
    </div>
  );
};

export default TransferList;
