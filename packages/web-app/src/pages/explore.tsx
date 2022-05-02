import React from 'react';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';
import Carousel from 'containers/carousel';
import {Layout} from '../app';

const Explore: React.FC = () => {
  return (
    <>
      <Container>
        <ExploreNav onWalletClick={() => null} />
        <Hero />
        <Layout>
          <ContentWrapper>
            <Carousel />
          </ContentWrapper>
        </Layout>
        <div className="h-20"></div>
        <Footer />
      </Container>
    </>
  );
};

const Container = styled.div.attrs({
  className: 'mx-auto',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'col-span-full desktop:col-start-2 desktop:col-end-12',
})``;

export default Explore;
