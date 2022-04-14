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

  return {policyAccepted, preferences, acceptAll, rejectAll, setPrivacyPolicy};
};
