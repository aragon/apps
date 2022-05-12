import React, {useState} from 'react';
import {
  AvatarDao,
  ButtonGroup,
  ListItemLink,
  Option,
} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {DescriptionListContainer, Dl, Dt, Dd} from 'components/descriptionList';

const CompareSettings: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState('new');
  const {t} = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex">
        <ButtonGroup
          bgWhite={false}
          defaultValue={selectedButton}
          onChange={setSelectedButton}
        >
          <Option value="new" label={t('settings.newSettings')} />
          <Option value="old" label={t('settings.oldSettings')} />
        </ButtonGroup>
      </div>

      <DescriptionListContainer title={t('labels.review.daoMetadata')}>
        <Dl>
          <Dt>{t('labels.logo')}</Dt>
          <Dd>
            <AvatarDao daoName="Aragon" />
          </Dd>
        </Dl>
        <Dl>
          <Dt>{t('labels.daoName')}</Dt>
          <Dd>Aragon DAO</Dd>
        </Dl>
        <Dl>
          <Dt>{t('labels.description')}</Dt>
          <Dd>
            This is a short description of your DAO, so please look that
            it&apos;s not that long as wished. 👀
          </Dd>
        </Dl>
        <Dl>
          <Dt>{t('labels.links')}</Dt>
          <Dd>
            <div className="space-y-1.5">
              <ListItemLink label="Forum" href="https://forum.aragon.org" />
              <ListItemLink label="Discord" href="https://discord.com" />
            </div>
          </Dd>
        </Dl>
      </DescriptionListContainer>

      <DescriptionListContainer title={t('labels.review.governance')}>
        <Dl>
          <Dt>{t('labels.minimumApproval')}</Dt>
          <Dd>15% (150 TKN)</Dd>
        </Dl>
        <Dl>
          <Dt>{t('labels.minimumSupport')}</Dt>
          <Dd>50%</Dd>
        </Dl>
        <Dl>
          <Dt>{t('labels.minimumDuration')}</Dt>
          <Dd>5 Days 12 Hours 30 Minutes</Dd>
        </Dl>
      </DescriptionListContainer>
    </div>
  );
};

export default CompareSettings;
