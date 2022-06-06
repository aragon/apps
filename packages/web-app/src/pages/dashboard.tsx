import React from 'react';
import styled from 'styled-components';
import {withTransaction} from '@elastic/apm-rum-react';

import {Loading} from 'components/temporary';
import {useDaoParam} from 'hooks/useDaoParam';
import ProposalSnapshot from 'containers/proposalSnapshot';
import TreasurySnapshot from 'containers/treasurySnapshot';
import {HeaderDao} from '@aragon/ui-components';

const Dashboard: React.FC = () => {
  const {data: dao, loading} = useDaoParam();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <HeaderDao
        daoName={'DaoName'}
        description={
          'We are a community that loves trees and the planet. We track where forestation is increasing (or shrinking), fund people who are growing and protecting trees...'
        }
        created_at={'March 2022'}
        daoChain={'Arbitrum'}
        daoType={'Wallet Based'}
        links={[
          {
            label: 'Website',
            href: 'https://google.com',
          },
          {
            label: 'Discord',
            href: 'https://google.com',
          },
          {
            label: 'Forum',
            href: 'https://google.com',
          },
        ]}
      />
      <Container>
        <ProposalSnapshot dao={dao} />
        <TreasurySnapshot dao={dao} />
      </Container>
    </Layout>
  );
};

export default withTransaction('Dashboard', 'component')(Dashboard);

const Layout = styled.div.attrs({
  className:
    'flex flex-col py-3 col-span-full desktop:col-start-2 desktop:col-end-12',
})``;

const Container = styled.div.attrs({
  className:
    'flex flex-col desktop:flex-row desktop:gap-x-6 gap-y-5 desktop:justify-between mt-3 desktop:mt-6 w-full',
})``;
