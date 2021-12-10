import React from 'react';
import styled from 'styled-components';
import {Modal, ActionListItem, IconChevronRight} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

import {useTransferModalContext} from 'context/transfersModal';

const TransferMenu: React.FC = () => {
  const {isOpen, close} = useTransferModalContext();
  const {t} = useTranslation();

  return (
    <Modal
      open={isOpen}
      onClose={close}
      title={t('TransferModal.newTransfer')}
      data-testid="walletCard"
      background="ui-50"
    >
      <Container>
        <ActionListItem
          title={t('TransferModal.item1Title')}
          subtitle={t('TransferModal.item1Subtitle')}
          icon={<IconChevronRight />}
          background="white"
        />
        <ActionListItem
          title={t('TransferModal.item2Title')}
          subtitle={t('TransferModal.item2Subtitle')}
          icon={<IconChevronRight />}
          background="white"
        />
      </Container>
    </Modal>
  );
};

export default TransferMenu;

const Container = styled.div.attrs({
  className: 'space-y-3 pb-4 pt-1',
})``;
