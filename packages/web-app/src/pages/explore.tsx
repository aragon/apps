import React from 'react';
import styled from 'styled-components';
import {generatePath, useNavigate} from 'react-router-dom';
import {ActionListItem, ButtonText, IconExpand} from '@aragon/ui-components';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Hero from 'containers/hero';
import {Dashboard} from 'utils/paths';
import Carousel from 'containers/carousel';
import {TemporarySection} from 'components/temporary';
import {DaoExplorer} from 'containers/daoExplorer';
import ActiveProposalsExplore from 'containers/activeProposalsExplore';
import useScreen from 'hooks/useScreen';
import {GridLayout} from 'components/layout';
import {useGlobalModalContext} from 'context/globalModals';
import ManageWalletsModal from 'containers/manageWalletsModal';

const existingDaos = [
  '0x5aa80e80fd670393d625b70ec57b81226a274646',
  '0xa2e993c4fd68fda9e28405cb9d8411a09117a47c',
];

const Explore: React.FC = () => {
  const navigate = useNavigate();

  // Temporary; for QA-purposes
  const {isMobile} = useScreen();
  const {open} = useGlobalModalContext();

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
            {existingDaos.map(dao => (
              <ActionListItem
                key={dao}
                title={`DAO: ${isMobile ? dao.slice(0, 15) + '...' : dao}`}
                subtitle={'Rinkeby Testnet'}
                icon={<IconExpand />}
                background={'white'}
                onClick={() => {
                  navigate(
                    generatePath(Dashboard, {
                      network: 'rinkeby',
                      dao: dao,
                    })
                  );
                }}
              />
            ))}
            <ActionListItem
              title={
                'DAO with ERC20 voting package to check proposal creation: 0xcf319af7c7b564c8f742b00af5cf19b4a1e1fe41'
              }
              subtitle={'Rinkeby testnet'}
              icon={<IconExpand />}
              background={'white'}
              onClick={() =>
                navigate(
                  generatePath(Dashboard, {
                    network: 'rinkeby',
                    dao: '0xcf319af7c7b564c8f742b00af5cf19b4a1e1fe41',
                  })
                )
              }
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
          {/* Button and ManageWalletsModal are here for demo purposes only. will be removed before merging */}
          <ButtonText
            label="Open Manage Wallet Modal"
            onClick={() => open('manageWallet')}
            className="mx-auto"
          />
          <ManageWalletsModal
            addWalletCallback={wallets => console.log(wallets)}
            resetOnClose
          />
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
