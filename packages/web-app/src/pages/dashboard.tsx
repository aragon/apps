import React from 'react';
import styled from 'styled-components';
import {withTransaction} from '@elastic/apm-rum-react';

import {Loading} from 'components/temporary';
import {useDaoParam} from 'hooks/useDaoParam';
import ProposalSnapshot from 'containers/proposalSnapshot';
import TreasurySnapshot from 'containers/treasurySnapshot';

const Dashboard: React.FC = () => {
  const {data: dao, loading} = useDaoParam();

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container>
        <ProposalSnapshot dao={dao} />
        <TreasurySnapshot dao={dao} />
      </Container>
    </Layout>
  );
};

export default withTransaction('Dashboard', 'component')(Dashboard);

const Layout = styled.div.attrs({
  className: 'flex py-3 col-span-full desktop:col-start-2 desktop:col-end-12',
})``;

const Container = styled.div.attrs({
  className:
    'flex flex-col desktop:flex-row desktop:gap-x-6 gap-y-5 desktop:justify-between mt-3 desktop:mt-6 w-full',
})``;
