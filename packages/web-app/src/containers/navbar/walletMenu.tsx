import React from 'react';
import {
  Avatar,
  ButtonIcon,
  ButtonText,
  IconClose,
  IconCopy,
  IconSwitch,
  IconTurnOff,
} from '@aragon/ui-components';
import {useGlobalModalContext} from 'context/globalModals';
import styled from 'styled-components';
import {useSigner} from 'use-signer';
import {useEnsAvatar, useEnsName} from 'hooks/useEnsData';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {shortenAddress} from '@aragon/ui-components/src/utils/addresses';
import {handleClipboardActions} from 'utils/library';
import useScreen from 'hooks/useScreen';
export const WalletMenu = () => {
  const {close, isWalletOpen} = useGlobalModalContext();
  const {address, methods} = useSigner();
  const {data: ensName} = useEnsName(address || '');
  const {data: ensAvatarUrl} = useEnsAvatar(address || '');
  const {isDesktop} = useScreen();
  const handleDisconnect = () => {
    methods
      .disconnect()
      .then(() => {
        close('wallet');
      })
      .catch((e: Error) => {
        console.error(e);
      });
  };
  return (
    <ModalBottomSheetSwitcher
      onClose={() => close('wallet')}
      isOpen={isWalletOpen}
    >
      <ModalHeader>
        <AvatarAddressContainer>
          <Avatar src={ensAvatarUrl || address || ''} size="small" />
          <AddressContainer>
            {ensName && <Title>{ensName}</Title>}
            <SubTitle>{shortenAddress(address)}</SubTitle>
          </AddressContainer>
        </AvatarAddressContainer>
        <ButtonIcon
          mode="secondary"
          icon={<IconCopy />}
          size="small"
          onClick={() =>
            address ? handleClipboardActions(address, () => null) : null
          }
        />
        {isDesktop && (
          <ButtonIcon
            mode="ghost"
            icon={<IconClose />}
            size="small"
            onClick={() => close('wallet')}
          />
        )}
      </ModalHeader>
      <ModalBody>
        <StyledButtonText
          size="large"
          mode="ghost"
          iconLeft={<IconSwitch />}
          label="View Transactions"
          onClick={() => alert('not implemented')}
        />
        <StyledButtonText
          size="large"
          mode="ghost"
          iconLeft={<IconTurnOff />}
          label="Log Out"
          onClick={handleDisconnect}
        />
      </ModalBody>
    </ModalBottomSheetSwitcher>
  );
};

const ModalHeader = styled.div.attrs({
  className: 'flex p-3 bg-ui-0 rounded-xl gap-2',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;
const Title = styled.div.attrs({
  className: 'flex-1 font-bold text-ui-800',
})``;
const SubTitle = styled.div.attrs({
  className: 'flex-1 font-medium text-ui-500 text-xs',
})``;
const AvatarAddressContainer = styled.div.attrs({
  className: 'flex flex-1 gap-1.5 items-center',
})``;
const AddressContainer = styled.div.attrs({
  className: 'flex flex-col',
})``;
const ModalBody = styled.div.attrs({
  className: 'flex flex-col p-3 gap-1.5',
})``;

const StyledButtonText = styled(ButtonText)`
  justify-content: flex-start;
`;
