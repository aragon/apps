import {useCallback, useEffect, useState} from 'react';

type PrivacyPolicy = {
  analytics: boolean;
  functional: boolean;
};

const PRIVACY_KEY = 'privacy-policy-preferences';

export const useCookies = () => {
  const [preferences, setPreferences] = useState<PrivacyPolicy>();
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
  const setPrivacyPolicy = useCallback((preference: PrivacyPolicy) => {
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
  const acceptAll = () => {
    setPrivacyPolicy({analytics: true, functional: true});
  };

  // reject all cookies
  const rejectAll = () => {
    setPrivacyPolicy({analytics: false, functional: false});
  };

  // set only functional cookies
  const setFunctionalCookies = () => {
    setPrivacyPolicy({
      analytics: preferences?.analytics || false,
      functional: true,
    });
  };

  // set only analytics cookies
  const setAnalyticsCookies = () => {
    setPrivacyPolicy({
      analytics: true,
      functional: preferences?.functional || false,
    });
  };

  return {
    policyAccepted,
    preferences,
    acceptAll,
    rejectAll,
    setPrivacyPolicy,
    setAnalyticsCookies,
    setFunctionalCookies,
  };
};
