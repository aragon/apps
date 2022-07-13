import React from 'react';
import {useTranslation} from 'react-i18next';
import {ButtonText, IconChevronRight} from '@aragon/ui-components';
import CardWithImage from 'components/cardWithImage';
import {useFormStep} from 'components/fullScreenStepper';
import SelectBlockchain from 'public/selectBlockchain.svg';
import DefineMetadata from 'public/defineMetadata.svg';
import SetupCommunity from 'public/setupCommunity.svg';
import ConfigureGovernance from 'public/configureGovernance.svg';

export const OverviewDAOHeader: React.FC = () => {
  const {t} = useTranslation();
  const {next} = useFormStep();

  return (
    <div className="flex items-end p-6 space-x-6 tablet:rounded-xl bg-ui-0">
      <div>
        <h1 className="text-3xl font-bold text-ui-800">
          {t('createDAO.overview.title')}
        </h1>
        <p className="mt-2 text-lg text-ui-600">
          {t('createDAO.overview.description')}
        </p>
      </div>
      <div>
        <ButtonText
          size="large"
          className="whitespace-nowrap"
          iconRight={<IconChevronRight />}
          label={t('createDAO.overview.button')}
          onClick={next}
        />
      </div>
    </div>
  );
};

export const OverviewDAOStep: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className="tablet:flex space-y-3 tablet:space-y-0 tablet:space-x-3">
      <CardWithImage
        imgSrc={SelectBlockchain}
        caption={t('createDAO.step1.label')}
        title={t('createDAO.step1.shortTitle')}
        subtitle={t('createDAO.step1.shortDescription')}
      />
      <CardWithImage
        imgSrc={DefineMetadata}
        caption={t('createDAO.step2.label')}
        title={t('createDAO.step2.shortTitle')}
        subtitle={t('createDAO.step2.shortDescription')}
      />
      <CardWithImage
        imgSrc={SetupCommunity}
        caption={t('createDAO.step3.label')}
        title={t('createDAO.step3.shortTitle')}
        subtitle={t('createDAO.step3.shortDescription')}
      />
      <CardWithImage
        imgSrc={ConfigureGovernance}
        caption={t('createDAO.step4.label')}
        title={t('createDAO.step4.shortTitle')}
        subtitle={t('createDAO.step4.shortDescription')}
      />
    </div>
  );
};
