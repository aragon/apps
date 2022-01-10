import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Modal, IconChevronRight, ListItemText} from '@aragon/ui-components';

import {useTransferModalContext} from 'context/transfersModal';
import {timezones} from './utcData';

const UtcMenu: React.FC = () => {
  const {isUtcOpen, close} = useTransferModalContext();
  const {t} = useTranslation();

  const handleUtcClick = () => {
    close('utc');
  };

  return (
    <Modal
      open={isUtcOpen}
      onClose={() => close('utc')}
      title={t('newWithdraw.configureWithdraw.utcMenu.title') as string}
      data-testid="walletCard"
    >
      <Container>
        <ScrollableDiv>
          {timezones.map((tz: string) => {
            return (
              <ListItemText
                mode="default"
                key={tz}
                title={tz}
                iconRight={<IconChevronRight />}
                onClick={() => handleUtcClick()}
              />
            );
          })}
        </ScrollableDiv>
      </Container>
    </Modal>
  );
};

export default UtcMenu;

const Container = styled.div.attrs({
  className: 'space-y-1 overflow-y-auto',
})``;
const ScrollableDiv = styled.div.attrs({
  className: 'h-25 ',
})``;
