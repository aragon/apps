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
      {proposals.map(p => {
        const totalVoteCount = p.abstain + p.yea + p.nay;

        const AlertMessage = translateProposalDate(
          p.type,
          p.startDate,
          p.endDate
        );
        return (
          <CardProposal
            title={'Title eventually coming from Metadata'}
            description={'Summary eventually coming from Metadata'}
            onClick={() => {
              navigate('proposals/' + p.id);
            }}
            process={p.type}
            chainId={chainId}
            voteTitle={t('governance.proposals.voteTitle') as string}
            {...(p.type === 'active' && {
              voteProgress: relativeVoteCount(
                p.yea || 0,
                totalVoteCount
              ).toString(),
              voteLabel: p.yea?.toString(),
              tokenAmount: totalVoteCount.toString(),
              tokenSymbol: p.pkg.token?.symbol || undefined,
            })}
            publishLabel={t('governance.proposals.publishedBy') as string}
            publisherAddress={p.creator}
            stateLabel={[
              t('governance.proposals.states.draft'),
              t('governance.proposals.states.pending'),
              t('governance.proposals.states.active'),
              t('governance.proposals.states.executed'),
              t('governance.proposals.states.succeeded'),
              t('governance.proposals.states.defeated'),
            ]}
            {...(AlertMessage && {AlertMessage})}
            key={p.id}
          />
        );
      })}
    </div>
  );
};

function relativeVoteCount(optionCount: number, totalCount: number) {
  if (totalCount === 0) {
    return 0;
  }
  return Math.round((optionCount / totalCount) * 100);
}

export default ProposalList;
