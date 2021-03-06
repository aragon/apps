import React from 'react';
import styled from 'styled-components';
import {generatePath, useNavigate} from 'react-router-dom';
import {ActionListItem, IconExpand} from '@aragon/ui-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Hero from 'containers/hero';
import {Dashboard} from 'utils/paths';
import Carousel from 'containers/carousel';
import {TemporarySection} from 'components/temporary';
import {DaoExplorer} from 'containers/daoExplorer';
import ActiveProposalsExplore from 'containers/activeProposalsExplore';
import {GridLayout} from 'components/layout';

const Explore: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <GridLayout>
        <ContentWrapper>
          <Carousel />
          <DaoExplorer />
          <ActiveProposalsExplore />
          <div className="h-20" />
          <TemporarySection purpose="It allows you to navigate to a mock dao to test daos URLs.">
            <ActionListItem
              title={'ERC20Voting DAO'}
              subtitle={'Rinkeby Testnet'}
              icon={<IconExpand />}
              background={'white'}
              onClick={() => {
                navigate(
                  generatePath(Dashboard, {
                    network: 'rinkeby',
                    dao: '0x663ac3c648548eb8ccd292b41a8ff829631c846d',
                  })
                );
              }}
            />
            <ActionListItem
              title={'WhiteListVoting DAO'}
              subtitle={'Rinkeby Testnet'}
              icon={<IconExpand />}
              background={'white'}
              onClick={() => {
                navigate(
                  generatePath(Dashboard, {
                    network: 'rinkeby',
                    dao: '0xb2af1aab06a01dd3e4c4f420f91bda89efe15531',
                  })
                );
              }}
            />

            <ActionListItem
              title={'Non-existing dao: 0x1234'}
              subtitle={'Rinkeby testnet'}
              icon={<IconExpand />}
              background={'white'}
              onClick={() =>
                navigate(
                  generatePath(Dashboard, {network: 'rinkeby', dao: '0x1234'})
                )
              }
            />
          </TemporarySection>
        </ContentWrapper>
      </GridLayout>
    </>
  );
};

const ContentWrapper = styled.div.attrs({
  className:
    'col-span-full desktop:col-start-2 desktop:col-end-12 space-y-5 desktop:space-y-9 mb-5 desktop:mb-10 pb-5',
})``;

export default Explore;
