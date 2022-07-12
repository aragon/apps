import React from 'react';
import {ButtonIcon, ButtonText, IconClose} from '@aragon/ui-components';
import {useGlobalModalContext} from 'context/globalModals';
import styled from 'styled-components';
import {useWallet} from 'hooks/useWallet';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import useScreen from 'hooks/useScreen';
import {useTranslation} from 'react-i18next';
import WalletIcon from 'public/wallet.svg';
import {
  ModalBody,
  StyledImage,
  Title,
  WarningContainer,
  WarningTitle,
} from 'containers/networkErrorMenu';

export const LoginRequired = () => {
  const {close, isWalletOpen} = useGlobalModalContext();
  const {t} = useTranslation();
  const {isDesktop} = useScreen();
  const {methods} = useWallet();

  return (
    <ModalBottomSheetSwitcher
      isOpen={isWalletOpen}
      onClose={() => close('wallet')}
    >
      <ModalHeader>
        <Title>{t('alert.loginRequired.headerTitle')}</Title>
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
        <StyledImage src={WalletIcon} />
        <WarningContainer>
          <WarningTitle>{t('alert.loginRequired.title')}</WarningTitle>
          <WarningDescription>
            {t('alert.loginRequired.description')}
          </WarningDescription>
        </WarningContainer>
        <ButtonText
          label={t('alert.loginRequired.buttonLabel')}
          onClick={() => {
            close('wallet');
            methods.selectWallet().catch((err: Error) => {
              // To be implemented: maybe add an error message when
              // the error is different from closing the window
              console.error(err);
            });
          }}
          size="large"
        />
      </ModalBody>
    </ModalBottomSheetSwitcher>
  );
};

const ModalHeader = styled.div.attrs({
  className:
    'flex justify-between items-center p-3 bg-ui-0 rounded-xl gap-2 sticky top-0',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const WarningDescription = styled.p.attrs({
  className: 'text-base text-ui-500 text-center',
})``;
