import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';
import CTACard from 'components/ctaCard';
import {CTACards} from 'components/ctaCard/data';

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <ExploreNav onWalletClick={() => null} />
        <Hero />
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
