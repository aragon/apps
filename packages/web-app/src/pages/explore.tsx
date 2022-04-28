import React from 'react';
import styled from 'styled-components';
import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';

const Explore: React.FC = () => {
  return (
    <>
      <Container>
        <ExploreNav onWalletClick={() => null} />
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div.attrs({className: 'max-w-screen-wide h-10'})``;

export default Explore;
