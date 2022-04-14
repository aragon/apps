import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {Nullable} from 'utils/types';
import PrivacyPolicy from 'containers/privacyPolicy';
import CookiePreferenceMenu from 'containers/privacyPolicy/cookiePreferenceMenu';

export type PrivacyPreferences = {
  analytics: boolean;
  functional: boolean;
};

type PrivacyContextType = {
  preferences?: Nullable<PrivacyPreferences>;
  policyAccepted: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  setPrivacyPolicy: (preferences: PrivacyPreferences) => void;
  setAnalyticsCookies: () => void;
  setFunctionalCookies: () => void;
  handleWithFunctionalPreferenceMenu: (
    onAccept: () => void,
    onReject?: () => void
  ) => void;
};

const PrivacyContext = createContext<PrivacyContextType | null>(null);

const PRIVACY_KEY = 'privacy-policy-preferences';

const PrivacyContextProvider: React.FC = ({children}) => {
  // 'cache' for the privacy preferences to reduce storage usage and increase speed
  const [preferences, setPreferences] = useState<PrivacyPreferences>();
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);

  // cookie preference menu state
  const [showPreferenceMenu, setShowPreferenceMenu] = useState<boolean>(false);
  const [preferenceMenuCallbacks, setPreferenceMenuCallbacks] = useState({
    onAccept: () => setShowPreferenceMenu(true),
    onReject: () => setShowPreferenceMenu(false),
  });

  useEffect(() => {
    // get preferences from storage on first load
    const value = localStorage.getItem(PRIVACY_KEY);

    // set state
    if (value) {
      setPolicyAccepted(true);
      setPreferences(JSON.parse(value));
    }
  }, []);

  /*************************************************
   *              Methods and handlers             *
   *************************************************/
  // Set the privacy preferences in local storage and update context state
  const setPrivacyPolicy = useCallback((preference: PrivacyPreferences) => {
    if (preference.analytics || preference.functional) {
      localStorage.setItem(
        PRIVACY_KEY,
        JSON.stringify({optIn: true, ...preference})
      );
      setPreferences({...preference});
    } else {
      localStorage.setItem(PRIVACY_KEY, JSON.stringify({optIn: false}));
    }

    setPolicyAccepted(true);
  }, []);

  // accept all cookies
  const acceptAll = useCallback(() => {
    setPrivacyPolicy({analytics: true, functional: true});
  }, [setPrivacyPolicy]);

  // reject all cookies
  const rejectAll = useCallback(() => {
    setPrivacyPolicy({analytics: false, functional: false});
  }, [setPrivacyPolicy]);

  // set only functional cookies
  const setFunctionalCookies = useCallback(() => {
    setPrivacyPolicy({
      analytics: preferences?.analytics || false,
      functional: true,
    });
  }, [preferences?.analytics, setPrivacyPolicy]);

  // set only analytics cookies
  const setAnalyticsCookies = useCallback(() => {
    setPrivacyPolicy({
      analytics: true,
      functional: preferences?.functional || false,
    });
  }, [preferences?.functional, setPrivacyPolicy]);

  /**
   * Handle the cookie preference menu
   *
   * @param onAccept callback to be called when the user accepts the cookies
   * @param onReject callback to be called when the user rejects the cookies or closes the menu
   */
  const handleWithFunctionalPreferenceMenu = useCallback(
    (onAccept: () => void, onReject?: () => void) => {
      if (preferences?.functional) {
        onAccept();
        return;
      }

      setShowPreferenceMenu(true);
      setPreferenceMenuCallbacks({
        onAccept: () => {
          setFunctionalCookies();
          setShowPreferenceMenu(false);
          onAccept();
        },
        onReject: () => {
          setShowPreferenceMenu(false), onReject?.();
        },
      });
    },
    [preferences?.functional, setFunctionalCookies]
  );

  const value = useMemo(
    () => ({
      preferences,
      policyAccepted,
      acceptAll,
      rejectAll,
      setPrivacyPolicy,
      setAnalyticsCookies,
      setFunctionalCookies,
      handleWithFunctionalPreferenceMenu,
    }),
    [
      acceptAll,
      handleWithFunctionalPreferenceMenu,
      policyAccepted,
      preferences,
      rejectAll,
      setAnalyticsCookies,
      setFunctionalCookies,
      setPrivacyPolicy,
    ]
  );

  return (
    <PrivacyContext.Provider value={value}>
      {children}
      <PrivacyPolicy
        showPolicy={!policyAccepted}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onAcceptPolicy={setPrivacyPolicy}
      />
      <CookiePreferenceMenu
        show={showPreferenceMenu}
        onClose={preferenceMenuCallbacks.onReject}
        onAccept={preferenceMenuCallbacks.onAccept}
      />
    </PrivacyContext.Provider>
  );
};

function usePrivacyContext(): PrivacyContextType {
  return useContext(PrivacyContext) as PrivacyContextType;
}

export {PrivacyContextProvider, usePrivacyContext};
