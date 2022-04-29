import React from 'react';
import styled from 'styled-components';
import {ButtonText, ActionListItem, IconExpand} from '@aragon/ui-components';
import {generatePath, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';

import {CreateDAO, Finance} from 'utils/paths';

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
      <div className="m-10 space-y-1 ">
        <ActionListItem
          title={'Dao: 0x1234'}
          subtitle={'ethereum mainnet'}
          icon={<IconExpand />}
          background={'white'}
          onClick={() =>
            navigate(
              generatePath(Finance, {network: 'ethereum', dao: '0x1234'})
            )
          }
        />
        <ActionListItem
          title={'Dao: 0x1234'}
          subtitle={'Rinkeby testnet'}
          icon={<IconExpand />}
          background={'white'}
          onClick={() =>
            navigate(generatePath(Finance, {network: 'rinkeby', dao: '0x1234'}))
          }
        />
      </div>

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

export default withTransaction('Dashboard', 'component')(Home);
