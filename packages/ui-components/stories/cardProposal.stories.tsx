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
  wide: false,
  onClick: () => {
    alert('Pressing this button would allow to change DAO.');
  },
};
