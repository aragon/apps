import {TransferListItem, TransferListItemProps} from '../src';
import React from 'react';
import {Meta, Story} from '@storybook/react';

export default {
  title: 'Components/TransferListItem',
  component: TransferListItem,
} as Meta;

const Template: Story<TransferListItemProps> = args => (
  <TransferListItem {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Deposit',
  transferDate: 'Yesterday',
  tokenAmount: 300,
  tokenSymbol: 'DAI',
  usdValue: '$200.00',
};

export const Pending = Template.bind({});
Pending.args = {
  isPending: true,
  title: 'Deposit',
  transferDate: 'Pending...',
  tokenAmount: 300,
  tokenSymbol: 'DAI',
  usdValue: '$200.00',
};

export const LongReference = Template.bind({});
LongReference.args = {
  title: 'Deposit DAI so I can do whatever I want whenever I want',
  transferDate: 'Yesterday',
  tokenAmount: 300,
  tokenSymbol: 'DAI',
  usdValue: '$200.00',
};
