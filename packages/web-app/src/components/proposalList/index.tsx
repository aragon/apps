import React from 'react';
import {CardProposal} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

import {translateProposalDate} from 'utils/date';
import {useWallet} from 'hooks/useWallet';
import {CategorizedProposal} from 'pages/governance';

type ProposalListProps = {
  proposals: Array<CategorizedProposal>;
};

const ProposalList: React.FC<ProposalListProps> = ({proposals}) => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {chainId} = useWallet();

  if (proposals.length === 0)
    return <p data-testid="proposalList">{t('governance.noProposals')}</p>;

  return (
    <div className="space-y-3" data-testid="proposalList">
      {proposals.map(proposal => {
        const AlertMessage = translateProposalDate(
          proposal.type,
          proposal.startDate,
          proposal.endDate
        );
        try {
          const metadata = JSON.parse(proposal.metadata);

          return (
            <CardProposal
              title={metadata.title}
              description={metadata.summary}
              onClick={() => {
                navigate('proposals/' + proposal.id);
              }}
              state={proposal.type}
              chainId={chainId}
              voteTitle={t('governance.proposals.voteTitle') as string}
              // Rakesh: Vote results seem to be aggregated in the subgraph. So after confirming that the
              // below logic might change and also the function commented at the end of this file

              // {...(categorizedProposal.type === 'active' && {
              // voteProgress: getVoteResults(proposal.vote).toString(),
              // voteLabel: proposal.yea.toString(),
              // tokenAmount: proposal.total.toString(),
              // tokenSymbol: proposal.vote.tokenSymbol,
              // })}
              publishLabel={t('governance.proposals.publishedBy') as string}
              publisherAddress={proposal.creator}
              StateLabel={[
                t('governance.proposals.states.draft'),
                t('governance.proposals.states.pending'),
                t('governance.proposals.states.active'),
                t('governance.proposals.states.executed'),
                t('governance.proposals.states.succeeded'),
                t('governance.proposals.states.defeated'),
              ]}
              {...(AlertMessage && {AlertMessage})}
              buttonLabel={[
                t('governance.proposals.buttons.read'),
                t('governance.proposals.buttons.vote'),
                t('governance.proposals.buttons.execute'),
                t('governance.proposals.buttons.edit'),
              ]}
              key={proposal.id}
            />
          );
        } catch {
          return null;
        }
      })}
    </div>
  );
};

// function getVoteResults(votes: VotingData) {
//   if (votes.results.total === 0) {
//     return 0;
//   }
//   return Math.round((votes.results.yes / votes.total) * 100);
// }

export default ProposalList;
