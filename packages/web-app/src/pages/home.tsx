import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {ButtonText} from '@aragon/ui-components';
import {useNavigate} from 'react-router-dom';
<<<<<<< HEAD
import {VotingTerminal} from 'containers/votingTerminal';
=======
import {useGlobalModalContext} from 'context/globalModals';
>>>>>>> b272bd4 (modal refactoring completed)

const Home: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {open} = useGlobalModalContext();

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

      {/* This is just a demo, will be removed before merging */}
      <div className="my-4 mx-auto w-11/12 tablet:w-1/2">
        <VotingTerminal />
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
