import {
  AlertInline,
  Label,
  TextareaSimple,
  TextInput,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

const DefineMetadata: React.FC = () => {
  const {t} = useTranslation();

  return (
    <Container>
      {/* Name */}
      <FormItem>
        <Label
          label={t('labels.daoName')}
          helpText={t('createDao.defineMetadata.nameSubtitle')}
        />
        <>
          <TextInput placeholder={t('placeHolders.daoName')} />
          <AlertInline label="Wire up field error message" mode="critical" />
        </>
      </FormItem>

      {/* Logo */}
      <FormItem>
        <Label
          label={t('labels.logo')}
          helpText={t('createDao.defineMetadata.logoSubtitle')}
          isOptional
          badgeLabel={t('labels.optional')}
        />
        <>
          {/* TODO: replace with proper logo component */}
          <div className="w-8 h-8 border-dashed">Logo</div>
          <AlertInline label="Wire up field error message" mode="critical" />
        </>
      </FormItem>

      {/* Summary */}
      <FormItem>
        <Label
          label={t('labels.description')}
          helpText={t('createDao.defineMetadata.descriptionSubtitle')}
        />
        <>
          <TextareaSimple placeholder={t('placeHolders.daoDescription')} />
          <AlertInline label="Wire up field error message" mode="critical" />
        </>
      </FormItem>

      {/* Links */}
      <FormItem>
        <Label
          label={t('labels.links')}
          helpText={t('createDao.defineMetadata.linksSubtitle')}
        />
        <>
          {/* TODO: replace with proper logo component */}
          <div className="bg-ui-0">Placeholder links component</div>
          <AlertInline label="Wire up field error message" mode="critical" />
        </>
      </FormItem>
    </Container>
  );
};

export default DefineMetadata;

const Container = styled.div.attrs({})``;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
