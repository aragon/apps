import {
  Badge,
  Breadcrumb,
  ButtonText,
  CardExecution,
  IconChevronDown,
  IconGovernance,
  IconChevronUp,
  Link,
  ProgressStatusProps,
  WidgetStatus,
} from '@aragon/ui-components';
import styled from 'styled-components';
import useScreen from 'hooks/useScreen';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {useEditor} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TipTapLink from '@tiptap/extension-link';
import {useQuery} from '@apollo/client';
import {generatePath, useNavigate, useParams} from 'react-router-dom';
import React, {useState, useEffect} from 'react';

import ResourceList from 'components/resourceList';
import {StyledEditorContent} from 'containers/reviewProposal';
import {VotingTerminal} from 'containers/votingTerminal';
import {useMappedBreadcrumbs} from 'hooks/useMappedBreadcrumbs';
import {useNetwork} from 'context/network';
import {ERC20VOTING_PROPOSAL_DETAILS} from 'queries/proposals';
import {
  erc20VotingProposal,
  erc20VotingProposalVariables,
} from 'queries/__generated__/erc20VotingProposal';
import {NotFound} from 'utils/paths';
import {useDaoParam} from 'hooks/useDao';
import {Loading} from 'components/temporary';

/* MOCK DATA ================================================================ */

// TODO: This is just some mock data. Remove this while integration
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

const proposalTags = ['Finance', 'Withdraw'];

/* PROPOSAL COMPONENT ======================================================= */

const Proposal: React.FC = () => {
  const {data: daoId, loading: daoIdLoading, error: daoIdError} = useDaoParam();
  const {network} = useNetwork();
  const {breadcrumbs} = useMappedBreadcrumbs();
  const {t} = useTranslation();
  const {id} = useParams();
  const navigate = useNavigate();
  const {isDesktop} = useScreen();

  let proposalId = '';
  if (!id) navigate(NotFound);
  else proposalId = id;

  const {
    data: proposalData,
    loading: proposalLoading,
    error: proposalError,
  } = useQuery<erc20VotingProposal, erc20VotingProposalVariables>(
    ERC20VOTING_PROPOSAL_DETAILS,
    {variables: {id: proposalId}}
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [metadata, setMetadata] = useState<Record<string, any> | undefined>();
  const [expandedProposal, setExpandedProposal] = useState(false);

  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
      TipTapLink.configure({
        openOnClick: false,
      }),
    ],
  });

  useEffect(() => {
    if (!proposalLoading && proposalData) {
      setMetadata(JSON.parse(proposalData.erc20VotingProposals[0].metadata));
      editor?.commands.setContent(metadata?.proposal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalLoading, proposalData]);

  // TODO Do we still need this? [VR 10-05-2022]
  // const publisher (publisherAddress === account) ? 'you' : shortenAddress(publisherAddress);
  const publisher = 'you';

  if (proposalLoading || daoIdLoading) {
    return <Loading />;
  }

  if (proposalError || daoIdError) {
    return <p>Error. Check console</p>;
  }

  if (!editor) {
    return null;
  }

  return (
    <Container>
      {/* Proposal Header */}
      <HeaderContainer>
        {!isDesktop && (
          <Breadcrumb
            onClick={(path: string) =>
              navigate(generatePath(path, {network, daoId}))
            }
            crumbs={breadcrumbs}
            icon={<IconGovernance />}
          />
        )}
        <ProposalTitle>{metadata?.title}</ProposalTitle>
        <ContentWrapper>
          <BadgeContainer>
            {proposalTags.map(tag => (
              <Badge label={tag} key={tag} />
            ))}
          </BadgeContainer>
          <ProposerLink>
            {t('governance.proposals.publishedBy')}{' '}
            <Link
              external
              label={publisher}
              // href={`${explorers[chainId]}${publisherAddress}`}
            />
          </ProposerLink>
        </ContentWrapper>
        <SummaryText>{metadata?.summary}</SummaryText>

        {metadata?.proposal && !expandedProposal && (
          <ButtonText
            className="w-full tablet:w-max"
            size="large"
            label={t('governance.proposals.buttons.readFullProposal')}
            mode="secondary"
            iconRight={<IconChevronDown />}
            onClick={() => setExpandedProposal(true)}
          />
        )}
      </HeaderContainer>

      <ContentContainer expandedProposal={expandedProposal}>
        <ProposalContainer>
          {metadata?.proposal && expandedProposal && (
            <>
              <StyledEditorContent editor={editor} />

              <ButtonText
                className="mt-3 w-full tablet:w-max"
                label={t('governance.proposals.buttons.closeFullProposal')}
                mode="secondary"
                iconRight={<IconChevronUp />}
                onClick={() => setExpandedProposal(false)}
              />
            </>
          )}

          <VotingTerminal />

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
        </ProposalContainer>

        <AdditionalInfoContainer>
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
        </AdditionalInfoContainer>
      </ContentContainer>
    </Container>
  );
};

export default withTransaction('Proposal', 'component')(Proposal);

const Container = styled.div.attrs({
  className: 'col-span-full desktop:col-start-2 desktop:col-end-12',
})``;

const HeaderContainer = styled.div.attrs({
  className: 'flex flex-col gap-y-2 desktop:p-0 px-2 tablet:px-3 pt-2',
})``;

const ProposalTitle = styled.p.attrs({
  className: 'font-bold text-ui-800 text-3xl',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'flex flex-col tablet:flex-row gap-x-3 gap-y-1.5',
})``;

const BadgeContainer = styled.div.attrs({
  className: 'flex flex-wrap gap-x-1.5',
})``;

const ProposerLink = styled.p.attrs({
  className: 'text-ui-500',
})``;

const SummaryText = styled.p.attrs({
  className: 'text-lg text-ui-600',
})``;

const ProposalContainer = styled.div.attrs({
  className: 'space-y-3 tablet:w-3/5',
})``;

const AdditionalInfoContainer = styled.div.attrs({
  className: 'space-y-3 tablet:w-2/5',
})``;

type ContentContainerProps = {
  expandedProposal: boolean;
};

const ContentContainer = styled.div.attrs(
  ({expandedProposal}: ContentContainerProps) => ({
    className: `${
      expandedProposal ? 'tablet:mt-5' : 'tablet:mt-8'
    } mt-3 tablet:flex tablet:space-x-3 space-y-3 tablet:space-y-0`,
  })
)<ContentContainerProps>``;
