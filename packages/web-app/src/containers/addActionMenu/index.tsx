import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {ActionListItem, IconChevronRight} from '@aragon/ui-components';

import {useGlobalModalContext} from 'context/globalModals';
import {useActionsContext} from 'context/actions';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';

export enum AddActionItems {
  ADD_REMOVE_TOKENS = 'add_remove_address',
  MINT_TOKENS = 'mint_token',
  WITHDRAW_ASSETS = 'withdraw_assets',
  EXTERNAL_CONTRACT = 'external_contract',
}

const actionsInputs = {
  [AddActionItems.WITHDRAW_ASSETS]: [
    {
      type: 'address',
      name: 'To',
      value: '',
    },
    {
      type: 'address',
      name: 'Token',
      value: '',
    },
    {
      type: 'uint',
      name: 'Amount',
      value: '',
    },
  ],
};

const AddActionMenu: React.FC = () => {
  const {isAddActionOpen, close} = useGlobalModalContext();
  const {setAction} = useActionsContext();
  const {t} = useTranslation();

  return (
    <ModalBottomSheetSwitcher
      isOpen={isAddActionOpen}
      onClose={() => close('addAction')}
      title={t('AddActionModal.title')}
    >
      <Container>
        <ActionListItem
          title={t('AddActionModal.addRemoveAddresses')}
          subtitle={t('AddActionModal.addRemoveAddressesSubtitle')}
          icon={<IconChevronRight />}
          onClick={() => alert(AddActionItems.ADD_REMOVE_TOKENS)}
        />
        <ActionListItem
          title={t('AddActionModal.mintTokens')}
          subtitle={t('AddActionModal.mintTokensSubtitle')}
          icon={<IconChevronRight />}
          onClick={() => alert(AddActionItems.MINT_TOKENS)}
        />
        <ActionListItem
          title={t('AddActionModal.withdrawAssets')}
          subtitle={t('AddActionModal.withdrawAssetsSubtitle')}
          icon={<IconChevronRight />}
          onClick={() => {
            setAction({
              name: AddActionItems.WITHDRAW_ASSETS,
              inputs: actionsInputs[AddActionItems.WITHDRAW_ASSETS],
            });
            close('addAction');
          }}
        />
        <ActionListItem
          title={t('AddActionModal.externalContract')}
          subtitle={t('AddActionModal.externalContractSubtitle')}
          icon={<IconChevronRight />}
          onClick={() => alert(AddActionItems.EXTERNAL_CONTRACT)}
        />
      </Container>
    </ModalBottomSheetSwitcher>
  );
};

export default AddActionMenu;

const Container = styled.div.attrs({
  className: 'space-y-1.5 p-3',
})``;
