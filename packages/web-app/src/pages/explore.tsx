import React from 'react';
import styled from 'styled-components';
import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';

const Explore: React.FC = () => {
  return (
    <>
      <Container>
        <ExploreNav onWalletClick={() => null} />
        <Hero />
        <div className="h-50"></div>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div.attrs({className: 'max-w-screen-wide h-10'})``;

export default Explore;
