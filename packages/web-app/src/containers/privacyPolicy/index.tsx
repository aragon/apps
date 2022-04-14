import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';

import useScreen from 'hooks/useScreen';
import BottomSheet from 'components/bottomSheet';
import {useCookies} from 'hooks/useCookies';
import CookieSettingsMenu from './cookieSettingsMenu';
import PrivacyPolicyContent from './privacyPolicyContent';

const PrivacyPolicy: React.FC = () => {
  const {t} = useTranslation();
  const {isDesktop} = useScreen();
  const [showCookieSettings, setShowCookieSettings] = useState<boolean>(false);
  const {policyAccepted, setPrivacyPolicy, acceptAll, rejectAll} = useCookies();

  if (policyAccepted) return null;

  return (
    <>
      {isDesktop ? (
        <div className="fixed bottom-5 w-full">
          <Container>
            <PrivacyPolicyContent
              isDesktop={true}
              onAcceptAll={acceptAll}
              onRejectAll={rejectAll}
              onShowCookieSettings={() => setShowCookieSettings(true)}
            />
          </Container>
        </div>
      ) : (
        // TODO: make sure bottom sheet cannot close until user accepts one of the options
        <BottomSheet
          title={t('privacyPolicy.title')}
          isOpen={!policyAccepted}
          onClose={() => null}
          closeOnDrag={false}
        >
          <BottomSheetContentContainer>
            <PrivacyPolicyContent
              isDesktop={false}
              onAcceptAll={acceptAll}
              onRejectAll={rejectAll}
              onShowCookieSettings={() => setShowCookieSettings(true)}
            />
          </BottomSheetContentContainer>
        </BottomSheet>
      )}
      <CookieSettingsMenu
        show={showCookieSettings}
        onClose={() => setShowCookieSettings(false)}
        onAcceptClick={setPrivacyPolicy}
        onRejectAllClick={rejectAll}
      />
    </>
  );
};

export default PrivacyPolicy;

const Container = styled.div.attrs({
  className:
    'flex desktop:mx-5 wide:w-190 wide:mx-auto items-center p-3 space-x-3 bg-ui-0 rounded-xl',
})`
  box-shadow: 0px 10px 20px rgba(31, 41, 51, 0.04),
    0px 2px 6px rgba(31, 41, 51, 0.04), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const BottomSheetContentContainer = styled.div.attrs({
  className: 'py-3 px-2 space-y-3 tablet:w-56',
})``;
