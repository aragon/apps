import React from 'react';
import {Meta, Story} from '@storybook/react';

import {ListItemHeader, ListItemHeaderProps} from '../src/components/listItem';
import {IconFinance} from '../src/components/icons';

export default {
  title: 'Components/ListItem/Header',
  component: ListItemHeader,
} as Meta;

const Template: Story<ListItemHeaderProps> = args => (
  <ListItemHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  buttonText: 'New Transfer',
  icon: <IconFinance />,
  label: 'Treasury Volume',
  value: '$1,000,000.00',
};
