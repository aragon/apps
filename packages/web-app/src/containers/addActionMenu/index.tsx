import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {ActionListItem, IconChevronRight} from '@aragon/ui-components';

import {useGlobalModalContext} from 'context/globalModals';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';

const AddActionMenu: React.FC = () => {
  const {isAddActionOpen, close} = useGlobalModalContext();
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
        />
        <ActionListItem
          title={t('AddActionModal.mintTokens')}
          subtitle={t('AddActionModal.mintTokensSubtitle')}
          icon={<IconChevronRight />}
        />
        <ActionListItem
          title={t('AddActionModal.withdrawAssets')}
          subtitle={t('AddActionModal.withdrawAssetsSubtitle')}
          icon={<IconChevronRight />}
        />
        <ActionListItem
          title={t('AddActionModal.externalContract')}
          subtitle={t('AddActionModal.externalContractSubtitle')}
          icon={<IconChevronRight />}
        />
      </Container>
    </ModalBottomSheetSwitcher>
  );
};

export default AddActionMenu;

const Container = styled.div.attrs({
  className: 'space-y-1.5 p-3',
})``;
