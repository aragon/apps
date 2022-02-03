import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {ButtonText, ListItemLink} from '@aragon/ui-components';
import {useNavigate} from 'react-router-dom';
import DescriptionList, {Dl, Dt, Dd} from 'components/descriptionList';

const Home: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <WelcomeMessage>{t('subtitle')}</WelcomeMessage>
          <Title>{t('title.part1')}</Title>
          <Subtitle>{t('title.part2')}</Subtitle>
        </div>
      </div>
      <div className="flex justify-center">
        <ButtonText
          label="Create DAO"
          size="large"
          onClick={() => navigate('/create-dao')}
        />
      </div>

      {/* TODO: This is just a demo. Will be removed merging */}
      <div className="my-16 mx-auto w-11/12 tablet:w-1/2">
        <DescriptionList.Container
          title="DAO Metadata"
          onEditClick={() => alert('edit clicked')}
          onChecked={() => alert('checkbox clicked')}
        >
          <Dl>
            <Dt>Name</Dt>
            <Dd>Aragon DAO</Dd>
          </Dl>

          <Dl>
            <Dt>Summary</Dt>
            <Dd>
              This is a short description of your DAO, so please look that it’s
              not that long as wished. 👀
            </Dd>
          </Dl>

          <Dl>
            <Dt>Links</Dt>
            <Dd>
              <div className="space-y-1.5">
                <ListItemLink label="Forum" href="https://url.com" />
                <ListItemLink label="Discord" href="https://url.com" />
              </div>
            </Dd>
          </Dl>
        </DescriptionList.Container>
      </div>
    </>
  );
};

const WelcomeMessage = styled.h2.attrs({
  className: 'text-base font-semibold tracking-wide text-blue-600 uppercase',
})``;
const Title = styled.p.attrs({
  className:
    'my-3 text-4xl sm:text-5xl desktop:text-6xl font-bold sm:tracking-tight text-gray-900',
})``;
const Subtitle = styled.p.attrs({
  className:
    'my-3 text-4xl sm:text-5xl desktop:text-6xl font-bold sm:tracking-tight text-gray-900',
})``;

export default withTransaction('Dashboard', 'component')(Home);
