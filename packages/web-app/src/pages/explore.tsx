import React from 'react';
import styled from 'styled-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';
import CTACard from 'components/ctaCard';
import {CTACards} from 'components/ctaCard/data';
import {useWallet} from 'hooks/useWallet';
import {useGlobalModalContext} from 'context/globalModals';

const Explore: React.FC = () => {
  const {isConnected, methods} = useWallet();
  const {open} = useGlobalModalContext();
  const navigate = useNavigate();

  const handleWalletButtonClick = () => {
    if (isConnected) {
      open('wallet');
      return;
    }
    methods.selectWallet().catch((err: Error) => {
      // To be implemented: maybe add an error message when
      // the error is different from closing the window
      console.error(err);
    });
  };
  return (
    <>
      <Container>
        <ExploreNav onWalletClick={handleWalletButtonClick} />
        <Hero />
        <Layout>
          <ContentWrapper>
            <Carousel />
          </ContentWrapper>
        </Layout>
        <div className="h-96"></div>
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
