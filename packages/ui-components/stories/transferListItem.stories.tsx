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
  transferDate: '',
};
