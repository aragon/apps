import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useEffect, useState} from 'react';

import useScreen from 'hooks/useScreen';
import BottomSheet from 'components/bottomSheet';
import PrivacyPolicyContent from './privacyPolicyContent';
import CookieSettingsMenu, {CookiesType} from './cookieSettingsMenu';

const STORAGE_KEY = 'privacy-policy-preferences';

const PrivacyPolicy: React.FC = () => {
  const {t} = useTranslation();
  const {isDesktop} = useScreen();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState<boolean>(true);
  const [showCookieSettings, setShowCookieSettings] = useState<boolean>(false);

  /*************************************************
   *                   Effects                     *
   *************************************************/
  useEffect(() => {
    const object = localStorage.getItem(STORAGE_KEY);

    // If there is an object in the local storage, assume
    // that user has already accepted/rejected the privacy policy
    if (object && JSON.parse(object)?.optIn !== undefined) {
      setShowPrivacyPolicy(false);
    }
  }, [setShowPrivacyPolicy]);

  /*************************************************
   *                   Handlers                    *
   *************************************************/
  const handleAcceptAll = useCallback(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({optIn: true, analytics: true, functional: true})
    );
    setShowPrivacyPolicy(false);
  }, []);

  // Accept one or more cookies
  const handleAccept = useCallback(({analytics, functional}: CookiesType) => {
    if (analytics || functional) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          optIn: true,
          analytics,
          functional,
        })
      );
    } else localStorage.setItem(STORAGE_KEY, JSON.stringify({optIn: false}));

    setShowPrivacyPolicy(false);
  }, []);

  // Reject all cookies but still add the opt-in so that the user doesn't
  // see the privacy policy again
  const handleRejectAll = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({optIn: false}));
    setShowPrivacyPolicy(false);
  }, []);

  /*************************************************
   *                    Render                     *
   *************************************************/
  if (!showPrivacyPolicy) return null;

  return (
    <>
      {isDesktop ? (
        <div className="fixed bottom-5 w-full">
          <Container>
            <PrivacyPolicyContent
              isDesktop={true}
              onAcceptAll={handleAcceptAll}
              onRejectAll={handleRejectAll}
              onShowCookieSettings={() => setShowCookieSettings(true)}
            />
          </Container>
        </div>
      ) : (
        // TODO: make sure bottom sheet cannot close until user accepts one of the options
        <BottomSheet
          title={t('privacyPolicy.title')}
          isOpen={showPrivacyPolicy}
          onClose={() => null}
          closeOnDrag={false}
        >
          <BottomSheetContentContainer>
            <PrivacyPolicyContent
              isDesktop={false}
              onAcceptAll={handleAcceptAll}
              onRejectAll={handleRejectAll}
              onShowCookieSettings={() => setShowCookieSettings(true)}
            />
          </BottomSheetContentContainer>
        </BottomSheet>
      )}
      <CookieSettingsMenu
        show={showCookieSettings}
        onClose={() => setShowCookieSettings(false)}
        onAcceptClick={handleAccept}
        onRejectAllClick={handleRejectAll}
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
