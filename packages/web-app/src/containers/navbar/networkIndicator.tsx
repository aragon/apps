import React from 'react';
import {useTranslation} from 'react-i18next';

// TODO: replace with AlertBanner
import {AlertInline} from '@aragon/ui-components';

import {NetworkIndicatorStatus} from 'utils/types';

type IndicatorProps = {
  status?: NetworkIndicatorStatus;
};

const NetworkIndicator: React.FC<IndicatorProps> = ({status = 'default'}) => {
  const {t} = useTranslation();

  switch (status) {
    case 'testnet':
      return <AlertInline label={t('alert.testNet')} />;
    case 'unsupported':
      return <AlertInline label={t('alert.unsupportedNet')} mode="critical" />;
    default:
      return null;
  }
};

export default NetworkIndicator;
