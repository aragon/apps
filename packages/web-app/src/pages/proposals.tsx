import React from 'react';
import styled from 'styled-components';
import {withTransaction} from '@elastic/apm-rum-react';
import {useNavigate, useParams} from 'react-router-dom';

import {useProposal} from '../hooks/useProposal';
import * as paths from 'utils/paths';
import {
  Badge,
  ButtonText,
  CardExecution,
  IconChevronDown,
  ProgressStatusProps,
  WidgetStatus,
} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {Link} from '@aragon/ui-components';
import ResourceList from 'components/resourceList';

const publishedDone: ProgressStatusProps = {
  label: 'Published',
  mode: 'done',
  date: '2021/11/16 4:30 PM UTC+2',
  block: '132,123,231',
};

const stepDataRunning: ProgressStatusProps[] = [
  publishedDone,
  {
    label: 'Running',
    date: '2021/11/16 4:30 PM UTC+2',
    mode: 'active',
  },
];

const Proposal: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {id} = useParams();
  if (!id) {
    navigate(paths.NotFound);
  }
  const definedId = id as string;
  const {
    data: proposalData,
    isLoading,
    error,
  } = useProposal('0x0000000000', definedId);

  return (
    <Content>
      <Header>Proposal {id}</Header>
      {/* <p>This page contains the overview for proposal {id}</p>
      <br />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <p>{JSON.stringify(proposalData, null, 2)}</p>
      )} */}
      <div className="flex items-center mt-3 space-x-1.5">
        <Badge label="Finance" />
        <Badge label="Withdraw" />
        <p className="pl-1.5 text-sm text-ui-500">
          {t('governance.proposals.publishedBy')}{' '}
          <Link
            external
            label={'you'}
            // label={shortenAddress(publisherAddress || '')}
            // href={`${explorers[chainId]}${publisherAddress}`}
            className="text-sm"
          />
        </p>
      </div>
      <div className="my-3">
        {/* TODO: Render content using Tiptap https://tiptap.dev/guide/output#option-1-read-only-instance-of-tiptap */}
        As most community members know, Aragon has strived to deploy its
        products to more cost-efficient blockchain networks to facilitate more
        adoption. Since Aragon is building products on Arbitrum which will use
        Aragon Court, it seems to be a natural chain of choice for L2
        deployment.
      </div>
      <ButtonText
        label="Read Full Proposal"
        mode="secondary"
        iconRight={<IconChevronDown />}
      />
      <div className="flex mt-8 space-x-3">
        <div className="space-y-3 w-3/5">
          <div className="p-4 h-96 bg-white rounded-xl">
            Voting table placeholder
          </div>
          <CardExecution
            title="Execution"
            description="These smart actions are executed when the proposal reaches sufficient support. Find out which actions are executed."
            to="Patito DAO"
            from="0x3430008404144CD5000005A44B8ac3f4DB2a3434"
            toLabel="To"
            fromLabel="From"
            tokenName="DAI"
            tokenImageUrl="https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png"
            tokenSymbol="DAI"
            tokenCount="15,000,230.2323"
            treasuryShare="$1000.0"
          />
        </div>
        <div className="space-y-3 w-2/5">
          <ResourceList
            links={[
              {
                label: 'Draft of Proposal',
                href: 'https://docs.google.com/spreadsheets/d/1qpUXGUrR3LXed4VkONYzRQhic0ahMb9wJxOzSLiuoYs/edit#gid=289257943',
              },
              {
                label: 'Thread in discord',
                href: 'https://discord.com/channels/672466989217873929/910124501264658442/936598604804685884',
              },
            ]}
          />
          <WidgetStatus steps={stepDataRunning} />
        </div>
      </div>
    </Content>
  );
};

export default withTransaction('Proposal', 'component')(Proposal);

const Content = styled.div.attrs({className: 'tablet:w-4/5 mx-auto mt-3'})``;
const Header = styled.p.attrs({className: 'font-bold text-ui-800 text-3xl'})``;
