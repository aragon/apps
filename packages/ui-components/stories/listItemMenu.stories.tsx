import React from 'react';
import {Meta, Story} from '@storybook/react';

import {IconFinance} from '../src/components/icons';
import {ListItemMenu, ListItemMenuProps} from '../src/components/listItem';

export default {
  title: 'Components/ListItem/Menu',
  component: ListItemMenu,
} as Meta;

const Template: Story<ListItemMenuProps> = args => <ListItemMenu {...args} />;

export const Menu = Template.bind({});
Menu.args = {
  disabled: false,
  icon: <IconFinance />,
  label: 'Finance',
  parent: 'nav',
};
