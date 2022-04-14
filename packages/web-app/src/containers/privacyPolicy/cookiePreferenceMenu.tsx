import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {ButtonIcon, ButtonText, IconClose} from '@aragon/ui-components';

import {useCookies} from 'hooks/useCookies';
import {useGlobalModalContext} from 'context/globalModals';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';

const CookiePreferenceMenu: React.FC = () => {
  const {t} = useTranslation();
  const {setFunctionalCookies} = useCookies();
  const {close, isCookiePreferenceOpen} = useGlobalModalContext();

  return (
    <ModalBottomSheetSwitcher
      isOpen={isCookiePreferenceOpen}
      onClose={() => close('cookiePreference')}
      onOpenAutoFocus={e => e.preventDefault()}
    >
      <ModalHeader>
        <Title>{t('cookiePreferences.title')}</Title>
        <ButtonIcon
          mode="secondary"
          size="small"
          icon={<IconClose />}
          onClick={() => close('cookiePreference')}
          bgWhite
        />
      </ModalHeader>
      <BottomSheetContentContainer>
        <Text>{t('cookiePreferences.content')}</Text>
        <div className="flex space-x-2">
          <ButtonText
            className="flex-1"
            label={t('cookiePreferences.accept')}
            size="large"
            onClick={setFunctionalCookies}
          />
          <ButtonText
            className="flex-1"
            label={t('cookiePreferences.cancel')}
            size="large"
            mode="secondary"
          />
        </div>
      </BottomSheetContentContainer>
    </ModalBottomSheetSwitcher>
  );
};

export default CookiePreferenceMenu;

const Title = styled.div.attrs({
  className: 'flex-1 font-bold text-ui-800',
})``;

const ModalHeader = styled.div.attrs({
  className: 'flex items-center p-2 space-x-2 bg-ui-0 rounded-xl',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const BottomSheetContentContainer = styled.div.attrs({
  className: 'py-3 px-2 space-y-3',
})``;

const Text = styled.div.attrs({
  className: 'flex-1 desktop:text-sm text-ui-600',
})``;
