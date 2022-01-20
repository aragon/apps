import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useEffect, useState} from 'react';
import {HookData} from 'utils/types';

/**
 * NOTE: This file might only be temporary. At the moment it should be used to
 * mock data so we can display the UI. The data structure for the mockdata might
 * be wrong or incomplete. Please feel free to change it if you need.
 */

export function useProposal(
  proposalId: string
): HookData<ProposalData | undefined> {
  const [proposalData, setProposalData] = useState<ProposalData | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    // Fetch data for proposal. This will likely not be necessary, since we'll
    // handle this via Apollo Client. Currently this simply serves static data.
    const proposal = proposals.find(p => p.id === proposalId);
    if (proposal) {
      setProposalData(proposal);
      setError(undefined);
    } else {
      setError(new Error('ProposalNotFOundError'));
    }
    setLoading(false);
  }, [proposalId]);

  return {data: proposalData, isLoading: loading, error};
}

/* DATA STRUCTURE =========================================================== */

type ProposalData = {
  id: string;
  metadata: ProposalMetadata;
  vote: VotingData;
  execution: ExecutionData;
};

type ProposalMetadata = {
  title: string;
  description: string;
  publisher: Address;
  resources?: ProposalResource[];
  published?: BlockChainInteraction;
  executed?: BlockChainInteraction;
};

type ProposalResource = {
  title: string;
  url: string;
};

type BlockChainInteraction = {
  date: string;
  block: string;
};

type VotingData = {
  start: string;
  end: string;
  total: number;
  results: Record<string, number>; // e.g. option -> amount of votes
};

type ExecutionData = {
  from: Address;
  to: Address;
  amount: number;
};

/* MOCK DATA ================================================================ */

const fullProposalData: ProposalData = {
  id: '1',
  metadata: {
    title: 'Proposal: Title',
    description: 'Proposal: Description',
    publisher: '0x1234567890123456789012345678901234567890',
    resources: [
      {
        title: 'Resource title',
        url: 'https://example.com',
      },
    ],
    published: {
      date: '2019-01-01',
      block: '123456789',
    },
    executed: {
      date: '2019-01-01',
      block: '123456789',
    },
  },
  vote: {
    start: '2019-01-01',
    end: '2019-02-01',
    total: 100,
    results: {
      option1: 10,
      option2: 90,
    },
  },
  execution: {
    from: '0x1234567890123456789012345678901234567890',
    to: '0x1234567890123456789012345678901234567890',
    amount: 0,
  },
};
const partialProposalData: ProposalData = {
  id: '2',
  metadata: {
    title: 'Proposal: Title',
    description: 'Proposal: Description',
    publisher: '0x1234567890123456789012345678901234567890',
    published: {
      date: '2019-01-01',
      block: '123456789',
    },
  },
  vote: {
    start: '2019-01-01',
    end: '2019-02-01',
    total: 100,
    results: {},
  },
  execution: {
    from: '0x1234567890123456789012345678901234567890',
    to: '0x1234567890123456789012345678901234567890',
    amount: 0,
  },
};

const proposals: ProposalData[] = [fullProposalData, partialProposalData];
