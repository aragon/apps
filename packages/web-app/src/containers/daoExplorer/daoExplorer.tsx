import React, {useState} from 'react';
import {DaoCard, DaoType} from 'components/daoCard';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {useWallet} from 'hooks/useWallet';
import {
  ButtonGroup,
  IconChevronDown,
  Option,
  ButtonText,
} from '@aragon/ui-components';

type Dao = {
  name: string;
  description: string;
  logo?: string;
  chainId: number;
  daoType: DaoType;
};

// Just 2 placeholders before the data
// is polled from graph
const placeholderDaos: Dao[] = [
  {
    name: 'The dao 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit enim ac quam porta tempus. Morbi feugiat leo in ultricies commodo. Praesent tempus neque eu tellus pulvinar, suscipit imperdiet erat laoreet. Vivamus interdum risus fermentum magna convallis tristique. Praesent sit amet venenatis nulla, non ornare lectus. Quisque elit tortor, suscipit sed mi id, mattis tempus felis. Praesent bibendum viverra auctor. Cras finibus, mauris at congue cursus, nisl magna semper lorem, quis ornare odio sem id nulla. Vestibulum fermentum commodo tortor, ac vehicula libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc facilisis nisl viverra, fermentum dui non, ultricies dolor. Mauris ornare varius est, eu finibus tellus lobortis quis. Nullam sagittis vulputate mi in tincidunt. Nam tempor lacus lorem, ac consectetur velit malesuada sed. ',
    chainId: 4,
    daoType: 'wallet-based',
  },
  {
    name: 'The dao 2',
    logo: 'https://cdn.vox-cdn.com/thumbor/2l9eryHceOI1AmNOQNSNxXcKLu8=/0x0:1268x845/1400x1400/filters:focal(0x0:1268x845):format(png)/cdn.vox-cdn.com/uploads/chorus_image/image/35813328/Screenshot_2014-07-19_15.24.57.0.png',
    description: 'Lorem ipsum dolor sit amet, ',
    chainId: 1,
    daoType: 'token-based',
  },
];

export const DaoExplorer = () => {
  const {t} = useTranslation();
  const [daos, setDaos] = useState<Dao[]>(placeholderDaos);
  const [filter, setFilter] = useState('popular');
  const {isConnected} = useWallet();

  const handleShowMoreClick = () => {
    setDaos([...daos, ...placeholderDaos]);
  };

  const handleFliterChange = (filterValue: string) => {
    if (filterValue === 'my-daos') {
      setDaos([placeholderDaos[0]]);
      setFilter(filterValue);
      return;
    }
    setFilter(filterValue);
    setDaos([...placeholderDaos]);
  };

  return (
    <Container>
      <MainContainer>
        <HeaderWrapper>
          <Title>{t('explore.explorer.title')}</Title>
          <ButtonGroupContainer>
            <ButtonGroup
              defaultValue={filter}
              onChange={handleFliterChange}
              bgWhite={false}
            >
              {isConnected ? (
                <Option label={t('explore.explorer.myDaos')} value="my-daos" />
              ) : (
                <></>
              )}
              <Option label={t('explore.explorer.popular')} value="popular" />
              <Option label={t('explore.explorer.newest')} value="newest" />
            </ButtonGroup>
          </ButtonGroupContainer>
        </HeaderWrapper>
        <CardsWrapper>
          {daos.map((dao, index) => (
            <DaoCard
              name={dao.name}
              logo={dao.logo}
              description={dao.description}
              chainId={dao.chainId}
              daoType={dao.daoType}
              key={index}
            />
          ))}
        </CardsWrapper>
      </MainContainer>
      {filter !== 'my-daos' && (
        <div>
          <ButtonText
            label={t('explore.explorer.showMore')}
            iconRight={<IconChevronDown />}
            bgWhite
            mode="ghost"
            onClick={handleShowMoreClick}
          />
        </div>
      )}
    </Container>
  );
};

const ButtonGroupContainer = styled.div.attrs({
  className: 'flex',
})``;

const MainContainer = styled.div.attrs({
  className: 'flex flex-col space-y-2 desktop:space-y-3',
})``;
const Container = styled.div.attrs({
  className: 'flex flex-col space-y-1.5',
})``;
const HeaderWrapper = styled.div.attrs({
  className:
    'flex flex-col space-y-2 desktop:flex-row desktop:space-y-0 desktop:justify-between',
})``;
const CardsWrapper = styled.div.attrs({
  className: 'grid grid-cols-1 gap-1.5 desktop:grid-cols-2 desktop:gap-3',
})``;
const Title = styled.p.attrs({
  className: 'font-bold text-xl text-ui-800',
})``;
