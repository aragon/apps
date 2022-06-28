import React, {useState} from 'react';
import {DaoCard} from 'components/daoCard';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {useWallet} from 'hooks/useWallet';
import {
  ButtonGroup,
  IconChevronDown,
  Option,
  ButtonText,
} from '@aragon/ui-components';
import {useDaos} from 'hooks/useDaos';

const EXPLORE_FILTER = ['favourite', 'newest', 'popular'] as const;

export type ExploreFilter = typeof EXPLORE_FILTER[number];

export function isExploreFilter(
  filterValue: string
): filterValue is ExploreFilter {
  return EXPLORE_FILTER.some(ef => ef === filterValue);
}

const PAGE_SIZE = 4;

export const DaoExplorer = () => {
  const {t} = useTranslation();
  const [showCount, setShowCount] = useState(PAGE_SIZE);
  const {isConnected} = useWallet();
  const [filterValue, setFilterValue] = useState<ExploreFilter>(
    isConnected ? 'favourite' : 'popular'
  );
  const {data} = useDaos(filterValue);

  const handleShowMoreClick = () => {
    setShowCount(prev => prev + PAGE_SIZE);
  };

  const handleFliterChange = (filterValue: string) => {
    if (isExploreFilter(filterValue)) {
      setFilterValue(filterValue);
      setShowCount(PAGE_SIZE);
    } else throw Error(`${filterValue} is not an acceptable filter value`);
    return;
  };

  return (
    <Container>
      <MainContainer>
        <HeaderWrapper>
          <Title>{t('explore.explorer.title')}</Title>
          <ButtonGroupContainer>
            <ButtonGroup
              defaultValue={filterValue}
              onChange={v => handleFliterChange(v)}
              bgWhite={false}
            >
              {isConnected ? (
                <Option
                  label={t('explore.explorer.myDaos')}
                  value="favourite"
                />
              ) : (
                <></>
              )}
              <Option label={t('explore.explorer.popular')} value="popular" />
              <Option label={t('explore.explorer.newest')} value="newest" />
            </ButtonGroup>
          </ButtonGroupContainer>
        </HeaderWrapper>
        <CardsWrapper>
          {data.slice(0, showCount).map((dao, index) => (
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
      {data.length > 4 && (
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
