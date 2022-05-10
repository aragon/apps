import React from 'react';
import {Meta, Story} from '@storybook/react';
import {CardProposal, CardProposalProps} from '../src';

export default {
  title: 'Components/Cards/Proposal',
  component: CardProposal,
} as Meta;

const Template: Story<CardProposalProps> = args => <CardProposal {...args} />;

export const Default = Template.bind({});
Default.args = {
  process: 'pending',
  title: 'Title',
  description: 'Description',
  voteTitle: 'Winning Option',
  voteProgress: 70,
  voteLabel: 'Yes',
  tokenAmount: '3.5M',
  tokenSymbol: 'DNT',
  publishLabel: 'Published by',
  publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
  alertMessage: 'Starts in x days y hours',
  StateLabel: [
    'state',
    'Pending',
    'Active',
    'Executed',
    'Succeeded',
    'Defeated',
  ],
  onClick: () => {
    alert('Pressing this button would allow to change DAO.');
  },
};

export const Explore = Template.bind({});
Default.args = {
  type: 'explore',
  process: 'active',
  title: 'Title',
  description: 'Description',
  voteTitle: 'Winning Option',
  voteProgress: 70,
  voteLabel: 'Yes',
  tokenAmount: '3.5M',
  tokenSymbol: 'DNT',
  publishLabel: 'Published by',
  daoName: 'Bob DAO',
  publisherAddress: '0x374d444487A4602750CA00EFdaC5d22B21F130E1',
  alertMessage: 'Starts in x days y hours',
  stateLabel: [
    'state',
    'Pending',
    'Active',
    'Executed',
    'Succeeded',
    'Defeated',
  ],
};
