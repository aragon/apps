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
import {useWallet} from 'hooks/useWallet';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {shortenAddress} from '@aragon/ui-components/src/utils/addresses';
import {handleClipboardActions} from 'utils/library';
import useScreen from 'hooks/useScreen';
import {CHAIN_METADATA} from 'utils/constants';
import {useTranslation} from 'react-i18next';
import WalletIcon from 'public/wallet.svg';

export const LoginWallet = () => {
  const {t} = useTranslation();
  const {isDesktop} = useScreen();

  return (
    <ModalBottomSheetSwitcher isOpen={false} onClose={() => {}}>
      <ModalHeader>
        <Title>Login to continue</Title>
        {isDesktop && (
          <ButtonIcon mode="ghost" icon={<IconClose />} size="small" />
        )}
      </ModalHeader>
      <ModalBody>
        <StyledImage src={WalletIcon} />
        <WarningContainer>
          <WarningTitle>{t('alert.wrongNetwork.title')}</WarningTitle>
          <WarningDescription>
            To continue with this action, a wallet must be connected.
          </WarningDescription>
        </WarningContainer>
        <ButtonText label={'Login Now'} onClick={() => {}} size="large" />
      </ModalBody>
    </ModalBottomSheetSwitcher>
  );
};

const ModalHeader = styled.div.attrs({
  className: 'flex justify-between items-center p-3 bg-ui-0 rounded-xl gap-2',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const ModalBody = styled.div.attrs({
  className: 'flex flex-col px-3 pb-3',
})``;

const Title = styled.div.attrs({
  className: 'flex-1 font-bold text-ui-800',
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
  className: 'text-base text-ui-500 text-center',
})``;
