import React from 'react';
import styled from 'styled-components';
import {generatePath, useNavigate} from 'react-router-dom';
import {ActionListItem, IconExpand} from '@aragon/ui-components';

import Footer from 'containers/exploreFooter';
import ExploreNav from 'containers/navbar/exploreNav';
import Hero from 'containers/hero';
import { Finance } from 'utils/paths';
import Carousel from 'containers/carousel';
import {Layout} from '../app';
import {useWallet} from 'hooks/useWallet';
import {useGlobalModalContext} from 'context/globalModals';
import {DaoExplorer} from 'containers/daoExplorer';
import { DaoCard } from 'components/daoCard';
import ActiveProposalsExplore from 'containers/activeProposalsExplore';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
            <ActiveProposalsExplore />
            <div className="h-20"></div>
            <div className="p-2 m-5 space-y-1 bg-primary-100">
              <p>
                This is a temporarily added section for demonstration purposes.
                It allows you to navigate to a mock dao to test daos URLs.
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
          </ContentWrapper>

            <DaoWrapper>
              <DaoExplorer />
            </DaoWrapper>
          </SectionWrapper>
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
const SectionWrapper = styled.div.attrs({
  className: 'col-span-full space-y-5 desktop:space-y-9',
})``;

const DaoWrapper = styled.div.attrs({
  className:
    'col-span-full desktop:col-start-2 desktop:col-end-12 flex flex-row space-x-4',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'col-span-full desktop:col-start-2 desktop:col-end-12',
})``;

export default Explore;
