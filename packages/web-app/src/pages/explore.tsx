import React from 'react';
import styled from 'styled-components';
import {generatePath, useNavigate} from 'react-router-dom';

import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';
import CTACard from 'components/ctaCard';
import {CTACards} from 'components/ctaCard/data';
import {ActionListItem, IconExpand} from '@aragon/ui-components';
import {Finance} from 'utils/paths';

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <ExploreNav onWalletClick={() => null} />
        <Hero />
        <div className="space-y-1 m-5 p-2 bg-primary-100">
          <p>
            This is a temporarily added section for demonstration purposes. It
            allows you to navigate to a mock dao to test daos URLs.
          </p>
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
              navigate(
                generatePath(Finance, {network: 'rinkeby', dao: '0x1234'})
              )
            }
          />
        </div>
        <div className="h-20"></div>
        <CTA>
          {CTACards.map(card => (
            <CTACard
              key={card.title}
              {...card}
              className="flex-1"
              onClick={navigate}
            />
          ))}
        </CTA>
        <div className="h-20"></div>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div.attrs({
  className: 'mx-auto',
})``;

const CTA = styled.div.attrs({
  className: 'flex desktop:flex-row flex-col mb-4 space-x-3 max-w-fit px-10',
})``;

export default Explore;
