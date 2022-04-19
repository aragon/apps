import React from 'react';
import styled from 'styled-components';
import {ActionListItem, CardWallet, IconTurnOff} from '@aragon/ui-components';

import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useWallet} from 'hooks/useWallet';
import {useWalletMenuContext} from 'context/walletMenu';

const WalletMenu: React.FC = () => {
  const {isOpen, close} = useWalletMenuContext();
  const {methods, address, ensName, ensAvatarUrl} = useWallet();

  return (
    <ModalBottomSheetSwitcher
      isOpen={isOpen}
      onClose={close}
      data-testid="walletCard"
    >
      <Container>
        <CardWallet
          wide
          src={ensAvatarUrl || address}
          name={ensName}
          address={address}
        />
        <ActionContainer>
          <ActionListItem
            title="Disconnect Wallet"
            icon={<IconTurnOff />}
            onClick={() => {
              methods.disconnect();
              close();
            }}
          />
        </ActionContainer>
      </Container>
    </ModalBottomSheetSwitcher>
  );
};

export default WalletMenu;

const Container = styled.div.attrs({
  className: 'space-y-3 p-3',
})``;

const ActionContainer = styled.div.attrs({
  className: 'space-y-1.5',
})``;

// const StyledContainer = styled.div.attrs({
//   className: 'desktop:hidden',
// })``;
