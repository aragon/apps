import React from 'react';
import {Meta, Story} from '@storybook/react';

import {
  ListItemBlockchain,
  ListItemBlockchainProps,
} from '../src/components/listItem';

export default {
  title: 'Components/ListItem/Blockchain',
  component: ListItemBlockchain,
} as Meta;

const Template: Story<ListItemBlockchainProps> = args => (
  <ListItemBlockchain {...args} />
);

export const Default = Template.bind({});
Default.args = {
  name: 'Ethereum',
  domain: 'L1 Blockchain',
  tag: 'Cheapest',
  logo: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
};
