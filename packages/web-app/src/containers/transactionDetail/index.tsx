import {
  ButtonIcon,
  CardText,
  CardToken,
  CardTransfer,
  IconClose,
  IconLinkExternal,
  ListItemAction,
} from '@aragon/ui-components';
import styled from 'styled-components';
import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';

import {chains} from 'use-wallet';
import {Transfer} from 'utils/types';
import {useWallet} from 'context/augmentedWallet';
import {TransferTypes} from 'utils/constants';
import {ChainInformation} from 'use-wallet/dist/cjs/types';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';

type TransactionDetailProps = {
  transfer: Transfer;
  isOpen: boolean;
  onClose: () => void;
};

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  transfer,
  isOpen,
  onClose,
}) => {
  const {t} = useTranslation();
  const {chainId} = useWallet();

  const transactionUrl = useMemo(() => {
    return `${
      (chains.getChainInformation(chainId || 1) as ChainInformation).explorerUrl
    }/tx/${transfer.transaction}`;
  }, [chainId, transfer.transaction]);

  return (
    <ModalBottomSheetSwitcher isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Title>{t('transactionDetail.title')}</Title>
        <ButtonIcon
          mode="secondary"
          size="small"
          bgWhite
          icon={<IconClose />}
          onClick={onClose}
        />
      </ModalHeader>

      <Content>
        <CardTransfer
          {...(transfer.transferType === TransferTypes.Deposit
            ? {to: 'Dao Name', from: transfer.sender}
            : {to: transfer.to, from: 'DaoName'})}
          toLabel={t('labels.to')}
          fromLabel={t('labels.from')}
        />
        <CardToken
          type="transfer"
          tokenName={transfer.tokenName}
          tokenCount={`${
            transfer.transferType === TransferTypes.Deposit ? '+' : '-'
          } ${transfer.tokenAmount}`}
          tokenSymbol={transfer.tokenSymbol}
          tokenImageUrl={transfer.tokenImgUrl}
          treasuryShare={transfer.usdValue}
        />
        {transfer.reference && (
          <CardText
            type="label"
            title={t('labels.reference')}
            content={transfer.reference}
          />
        )}

        <div>
          <a href={transactionUrl} target="_blank" rel="noreferrer">
            <ListItemAction
              title={t('transactionDetail.viewTransaction')}
              iconRight={<IconLinkExternal />}
            />
          </a>
        </div>
      </Content>
    </ModalBottomSheetSwitcher>
  );
};

export default TransactionDetail;

const ModalHeader = styled.div.attrs({
  className:
    'flex items-center space-between h-10 gap-x-3 p-2 bg-ui-0 rounded-xl',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const Content = styled.div.attrs({className: 'p-3 space-y-1.5'})`
  max-width: 448px;
`;

const Title = styled.p.attrs({
  className: 'flex-1 text-ui-800 font-bold',
})``;
