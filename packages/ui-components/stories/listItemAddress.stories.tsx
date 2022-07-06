import React from 'react';
import {Meta, Story} from '@storybook/react';

import {ListItemAddress, ListItemAddressProps} from '../src';

export default {
  title: 'Components/ListItem/Address',
  component: ListItemAddress,
} as Meta;

const Template: Story<ListItemAddressProps> = args => (
  <ListItemAddress {...args} />
);

export const Wallet = Template.bind({});
Wallet.args = {
  label: '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70',
  src: '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70',
};

export const Token = Template.bind({});
Token.args = {
  src: '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70',
  label: '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70',
  tokenInfo: {
    amount: 0.1,
    symbol: 'ETH',
    percentage: 0.1,
  },
};
