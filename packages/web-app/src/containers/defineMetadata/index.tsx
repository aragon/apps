import React from 'react';
import styled from 'styled-components';
import {Label} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

const DefineMetadata: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Container>
      <FormItem>
        <Label
          label={t('labels.daoName')}
          helpText={t('createDao.defineMetadata.nameSubtitle')}
        />
      </FormItem>
    </Container>
  );
};

export default DefineMetadata;

const Container = styled.div.attrs({})``;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
