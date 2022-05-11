import React from 'react';
import styled from 'styled-components';
import {generatePath, useNavigate} from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {ActionListItem, IconExpand} from '@aragon/ui-components';

import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';
import {Finance} from 'utils/paths';
import Carousel from 'containers/carousel';
import {Layout} from '../app';
import {TemporarySection} from 'components/temporary';

const existingDaos = [
  '0x07de9a02a1c7e09bae5b15b7270e5b1ba2029bfd',
  '0xf1ce79a45615ce1d32af6422ed77b9b7ffc35c88',
];

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <ExploreNav />
        <Hero />
        <Layout>
          <ContentWrapper>
            <Carousel />
            <div className="h-20" />
            <TemporarySection purpose="It allows you to navigate to a mock dao to test daos URLs.">
              {existingDaos.map(dao => (
                <ActionListItem
                  key={dao}
                  title={'Dao: ' + dao}
                  subtitle={'Rinkeby Testnet'}
                  icon={<IconExpand />}
                  background={'white'}
                  onClick={() =>
                    navigate(
                      generatePath(Finance, {network: 'rinkeby', dao: dao})
                    )
                  }
                />
              ))}
              <ActionListItem
                title={'Non-existing dao: 0x1234'}
                subtitle={'Rinkeby testnet'}
                icon={<IconExpand />}
                background={'white'}
                onClick={() =>
                  navigate(
                    generatePath(Finance, {network: 'rinkeby', dao: '0x1234'})
                  )
                }
              />
            </TemporarySection>
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
