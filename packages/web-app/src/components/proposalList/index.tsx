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
        return (
          <CardProposal
            title={'Title eventually coming from Metadata'}
            description={'Summary eventually coming from Metadata'}
            onClick={() => {
              navigate('proposals/' + proposal.id);
            }}
            process={proposal.type}
            chainId={chainId}
            voteTitle={t('governance.proposals.voteTitle') as string}
            // {...(proposal.type === 'active' && {
            //   voteProgress: getVoteResults(proposal.vote).toString(),
            //   voteLabel: proposal.yea.toString(),
            //   tokenAmount: proposal.total.toString(),
            //   tokenSymbol: proposal.vote.tokenSymbol,
            // })}
            publishLabel={t('governance.proposals.publishedBy') as string}
            publisherAddress={proposal.creator}
            stateLabel={[
              t('governance.proposals.states.draft'),
              t('governance.proposals.states.pending'),
              t('governance.proposals.states.active'),
              t('governance.proposals.states.executed'),
              t('governance.proposals.states.succeeded'),
              t('governance.proposals.states.defeated'),
            ]}
            {...(AlertMessage && {AlertMessage})}
            key={proposal.id}
          />
        );
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
