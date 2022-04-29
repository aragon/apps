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
  className: 'max-w-screen-wide mx-auto',
})``;

const CTA = styled.div.attrs({className: 'flex mb-4 mx-auto space-x-3'})`
  width: 1130px;
`;

export default Explore;
