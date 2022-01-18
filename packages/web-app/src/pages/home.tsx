import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

/* Temporary: to be removed before merge */
import ResourceList from 'components/resourceList';

const Home: React.FC = () => {
  const {t} = useTranslation();

  return (
    <>
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="text-center">
          <WelcomeMessage>{t('subtitle')}</WelcomeMessage>
          <Title>{t('title.part1')}</Title>
          <Subtitle>{t('title.part2')}</Subtitle>
        </div>

        {/* Temporary: to be removed before merge */}
        <div style={{width: '438px'}}>
          <ResourceList
            links={[
              {href: 'https://client.aragon.org/', label: 'Client'},
              {href: 'https://govern.aragon.org/', label: 'Govern'},
            ]}
          />
        </div>
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
