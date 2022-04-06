import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {ActionListItem, IconChevronRight} from '@aragon/ui-components';

import {useWallet} from 'context/augmentedWallet';
import {NewDeposit, NewWithDraw, replaceNetworkParam} from 'utils/paths';
import {useGlobalModalContext} from 'context/globalModals';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useNetwork} from 'context/network';

type Action = 'deposit' | 'withdraw';

const TransferMenu: React.FC = () => {
  const {isTransferOpen, close} = useGlobalModalContext();
  const {t} = useTranslation();
  const {network} = useNetwork();
  const navigate = useNavigate();
  const {isConnected} = useWallet();

  const handleClick = (action: Action) => {
    // TODO: change alert to proper error reporting mechanism,
    // Move to proper placing
    if (isConnected()) {
      if (action === 'deposit')
        navigate(replaceNetworkParam(NewDeposit, network));
      else navigate(replaceNetworkParam(NewWithDraw, network));
      close('default');
    } else alert('Please connect your wallet');
  };

  return (
    <ModalBottomSheetSwitcher
      isOpen={isTransferOpen}
      onClose={() => close('default')}
      title={t('TransferModal.newTransfer') as string}
    >
      <Container>
        <ActionListItem
          title={t('TransferModal.item1Title') as string}
          subtitle={t('TransferModal.item1Subtitle') as string}
          icon={<IconChevronRight />}
          onClick={() => handleClick('deposit')}
        />
        <ActionListItem
          title={t('TransferModal.item2Title') as string}
          subtitle={t('TransferModal.item2Subtitle') as string}
          icon={<IconChevronRight />}
          onClick={() => handleClick('withdraw')}
        />
      </Container>
    </ModalBottomSheetSwitcher>
  );
};

export default TransferMenu;

const Container = styled.div.attrs({
  className: 'space-y-1.5 p-3',
})``;
