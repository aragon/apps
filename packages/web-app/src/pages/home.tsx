import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '@aragon/ui-components';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {useGlobalModalContext} from 'context/globalModals';

const Home: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const navigate = useNavigate();

  return (
    <div className="col-span-full my-10">
      <div className="text-center">
        <WelcomeMessage>{t('subtitle')}</WelcomeMessage>
        <Title>{t('title.part1')}</Title>
        <Subtitle>{t('title.part2')}</Subtitle>
      </div>

      <ButtonText
        label="Create DAO"
        className="mx-auto"
        size="large"
        onClick={() => navigate('/create-dao')}
      />
      <ButtonText
        label="Open Transaction Modal"
        className="mx-auto mt-3"
        size="large"
        onClick={() => open('transaction')}
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

export default withTransaction('Dashboard', 'component')(Home);
