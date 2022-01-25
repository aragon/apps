import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import CardWithImage from 'components/cardWithImage';

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
      </div>

      {/* This whole thing is just for a demo, will be removed before merging */}
      <div className="tablet:flex mx-3 tablet:mx-40 space-y-3 tablet:space-y-0 tablet:space-x-3">
        <CardWithImage
          caption="Step 1"
          title="Select Blockchain"
          subtitle="Decide which blockchain the DAO should be at home on."
        />
        <CardWithImage
          caption="Step 2"
          title="Select"
          subtitle="Decide which blockchain the DAO should be at home on."
        />
        <CardWithImage
          caption="Step 3"
          title="Blockchain"
          subtitle="Decide which blockchain the DAO should be at home on."
        />
        <CardWithImage
          caption="Step 4"
          title="Configure Governance"
          subtitle="How are decisions made in the DAO? How long may a proposal be open for voting? Decide which blockchain the DAO should be at home on."
        />
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
