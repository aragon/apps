import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '@aragon/ui-components';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import {CreateDAO} from 'utils/paths';

import CTACard from 'components/ctaCard';
import learnImg from '../public/learn.svg';
import buildFaster from '../public/buildFaster.svg';
import createDaoImg from '../public/createDao.svg';

// temporary for review
const CTACards = [
  {
    actionAvailable: true,
    actionLabel: 'Create a DAO',
    path: CreateDAO,
    imgSrc: createDaoImg,
    subtitle:
      'Create your Decentralized Autonomous Organization on open-source infrastructure with governance plugins.',
    title: 'Create a DAO',
  },
  {
    actionAvailable: false,
    actionLabel: 'Coming soon',
    path: '',
    imgSrc: learnImg,
    subtitle:
      'Explore and learn through our “How-to Guides”, DAO Education, Educational Articles and more!',
    title: 'Learn about DAO',
  },
  {
    actionAvailable: false,
    actionLabel: 'Coming soon',
    path: '',
    imgSrc: buildFaster,
    subtitle:
      'Build something something on open-source infrastructure with governance plugins.',
    title: 'Build faster',
  },
];

const Home: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="col-span-full my-10">
      <div className="text-center">
        <WelcomeMessage>{t('subtitle')}</WelcomeMessage>
        <Title>{t('title.part1')}</Title>
        <Subtitle>{t('title.part2')}</Subtitle>
      </div>

      <CTA>
        {CTACards.map(card => (
          <CTACard
            key={card.actionLabel}
            {...card}
            className="flex-1"
            onClick={navigate}
          />
        ))}
      </CTA>

      <ButtonText
        label="Create DAO"
        className="mx-auto"
        size="large"
        onClick={() => navigate(CreateDAO)}
      />
    </div>
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

const CTA = styled.div.attrs({className: 'flex mb-4 mx-auto space-x-3'})`
  width: 1140px;
`;

export default withTransaction('Dashboard', 'component')(Home);
