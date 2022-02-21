import React from 'react';
import {Meta, Story} from '@storybook/react';

import {ListItemDao, ListItemDaoProps} from '../src/components/listItem';

export default {
  title: 'Components/ListItem/Dao',
  component: ListItemDao,
} as Meta;

const Template: Story<ListItemDaoProps> = args => <ListItemDao {...args} />;

export const Dao = Template.bind({});

Dao.args = {
  daoName: 'ABC Very long long dao name ',
  daoAddress: 'abc.dao.eth',
};
