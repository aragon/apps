/**
 * Stub hook for querying subgraph to get dao proposals
 * @returns List of proposals and the top ten proposals
 */
export const useDaoProposals = () => {
  return {topTen: proposals};
};

const proposals = [
  {
    process: 'pending',
    title: 'New Founding for Lorex Lab SubDao',
    description:
      'As most community members know, Aragon has strived to deploy its products to more cost-efficient blockchain networks to facilitate ...',
    voteTitle: 'Winning Option',
    voteProgress: 70,
    voteLabel: 'Yes',
    tokenAmount: '3.5M',
    tokenSymbol: 'DNT',
    publishLabel: 'Published by',
    publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
    alertMessage: 'Starts in 3 days 5 hours',
    stateLabel: [
      'Draft',
      'Pending',
      'Active',
      'Executed',
      'Succeeded',
      'Defeated',
    ],
  },
  {
    process: 'succeeded',
    title: 'Aragon Court deployment on Arbitrum',
    description:
      'As most community members know, Aragon has strived to deploy its products to more cost-efficient blockchain networks to facilitate ...',
    voteTitle: 'Winning Option',
    voteProgress: 70,
    voteLabel: 'Yes',
    tokenAmount: '3.5M',
    tokenSymbol: 'DNT',
    publishLabel: 'Published by',
    publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
    alertMessage: 'Starts in 3 days 5 hours',
    stateLabel: [
      'Draft',
      'Pending',
      'Active',
      'Executed',
      'Succeeded',
      'Defeated',
    ],
  },
  {
    process: 'defeated',
    title: 'New Founding for Lorex Lab SubDao',
    description:
      'As most community members know, Aragon has strived to deploy its products to more cost-efficient blockchain networks to facilitate ...',
    voteTitle: 'Winning Option',
    voteProgress: 70,
    voteLabel: 'Yes',
    tokenAmount: '3.5M',
    tokenSymbol: 'DNT',
    publishLabel: 'Published by',
    publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
    alertMessage: 'Starts in x days y hours',
    stateLabel: [
      'Draft',
      'Pending',
      'Active',
      'Executed',
      'Succeeded',
      'Defeated',
    ],
  },
  {
    process: 'executed',
    title: 'New Founding for Tree Lovers SubDao',
    description:
      'As most community members know, Aragon has strived to deploy its products to more cost-efficient blockchain networks to facilitate ...',
    voteTitle: 'Winning Option',
    voteProgress: 70,
    voteLabel: 'Yes',
    tokenAmount: '3.5M',
    tokenSymbol: 'DNT',
    publishLabel: 'Published by',
    publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
    alertMessage: 'Starts in x days y hours',
    stateLabel: [
      'Draft',
      'Pending',
      'Active',
      'Executed',
      'Succeeded',
      'Defeated',
    ],
  },
];
