import PrivacyPolicy from 'containers/privacyPolicy';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Nullable} from 'utils/types';

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
};

const PrivacyContext = createContext<PrivacyContextType | null>(null);

const PRIVACY_KEY = 'privacy-policy-preferences';

const PrivacyContextProvider: React.FC = ({children}) => {
  const [preferences, setPreferences] = useState<PrivacyPreferences>();
  const [policyAccepted, setPolicyAccepted] = useState<boolean>(false);

  useEffect(() => {
    // get preferences from storage
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
  const setPrivacyPolicy = useCallback((preference: PrivacyPreferences) => {
    if (preference.analytics || preference.functional) {
      localStorage.setItem(
        PRIVACY_KEY,
        JSON.stringify({optIn: true, ...preference})
      );
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

  const value = useMemo(
    () => ({
      preferences,
      policyAccepted,
      acceptAll,
      rejectAll,
      setPrivacyPolicy,
      setAnalyticsCookies,
      setFunctionalCookies,
    }),
    [
      acceptAll,
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
    </PrivacyContext.Provider>
  );
};

function usePrivacyContext(): PrivacyContextType {
  return useContext(PrivacyContext) as PrivacyContextType;
}

export {PrivacyContextProvider, usePrivacyContext};
