import React from 'react';
import {
  Avatar,
  ButtonIcon,
  ButtonText,
  IconClose,
  IconCopy,
} from '@aragon/ui-components';
import {useGlobalModalContext} from 'context/globalModals';
import styled from 'styled-components';
import {useWallet} from 'hooks/useWallet';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {shortenAddress} from '@aragon/ui-components/src/utils/addresses';
import {handleClipboardActions} from 'utils/library';
import useScreen from 'hooks/useScreen';
import {useTranslation} from 'react-i18next';
import WrongNetwork from 'public/wrongNetwork.svg';
import {useNetwork} from 'context/network';

const NetworkErrorMenu = () => {
  const {isNetworkOpen, close} = useGlobalModalContext();
  const {network, switchWalletNetwork} = useNetwork();
  const {address, ensName, ensAvatarUrl, provider} = useWallet();
  const {isDesktop} = useScreen();
  const {t} = useTranslation();

  return (
    <ModalBottomSheetSwitcher
      onClose={() => close('network')}
      isOpen={isNetworkOpen}
    >
      <ModalHeader>
        <AvatarAddressContainer>
          <Avatar src={ensAvatarUrl || address || ''} size="small" />
          <AddressContainer>
            <Title>{ensName ? ensName : shortenAddress(address)}</Title>
            {ensName && <SubTitle>{shortenAddress(address)}</SubTitle>}
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
            onClick={() => close('network')}
          />
        )}
      </ModalHeader>
      <ModalBody>
        <StyledImage src={WrongNetwork} />
        <WarningContainer>
          <WarningTitle>{t('alert.wrongNetwork.title')}</WarningTitle>
          <WarningDescription>
            {t('alert.wrongNetwork.description')}
          </WarningDescription>
        </WarningContainer>
        {provider?.connection.url === 'metamask' && (
          <ButtonText
            label={t('alert.wrongNetwork.buttonLabel', {
              network: network,
            })}
            onClick={() => {
              switchWalletNetwork();
              close('network');
            }}
            size="large"
          />
        )}
      </ModalBody>
    </ModalBottomSheetSwitcher>
  );
};

export default NetworkErrorMenu;

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
  className: 'flex-1 font-medium text-ui-500 text-sm',
})``;

const AvatarAddressContainer = styled.div.attrs({
  className: 'flex flex-1 gap-1.5 items-center',
})``;

const AddressContainer = styled.div.attrs({
  className: 'flex flex-col',
})``;

const ModalBody = styled.div.attrs({
  className: 'flex flex-col px-3 pb-3',
})``;

const StyledImage = styled.img.attrs({
  className: 'h-20',
})``;

const WarningContainer = styled.div.attrs({
  className: 'flex flex-col justify-center items-center space-y-1.5 mb-3',
})``;

const WarningTitle = styled.h2.attrs({
  className: 'text-xl font-bold text-ui-800',
})``;

const WarningDescription = styled.p.attrs({
  className: 'text-sm text-ui-500 text-center',
})``;
