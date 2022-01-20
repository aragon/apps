import React from 'react';
import styled from 'styled-components';
import {withTransaction} from '@elastic/apm-rum-react';
import {useParams} from 'react-router-dom';

const Proposal: React.FC = () => {
  const {id} = useParams();
  const {proposalData} = useProposalData(id);

  return (
    <Content>
      <Header>Proposal {id}</Header>
      <p>This page contains the overview for proposal {id}</p>
    </Content>
  );
};

export default withTransaction('Proposal', 'component')(Proposal);

const Content = styled.div.attrs({className: 'tablet:w-2/3 m-auto'})``;
const Header = styled.p.attrs({className: 'text-bold text-xl'})``;
