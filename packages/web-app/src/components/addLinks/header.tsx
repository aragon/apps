import React from 'react';
import {Label} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

import {Row, RowItemWrapper} from './row';

const AddLinksHeader: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Row>
      <RowItemWrapper>
        <Label label={t('labels.label')} />
      </RowItemWrapper>
      <RowItemWrapper>
        <Label label={t('labels.link')} />
      </RowItemWrapper>
      <div className="w-6" />
    </Row>
  );
};

export default AddLinksHeader;
