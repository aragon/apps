import React from 'react';
import {Meta, Story} from '@storybook/react';
import {HeaderDao, HeaderDaoProps} from '../src';

export default {
  title: 'Components/Headers/Dao',
  component: HeaderDao,
} as Meta;

const Template: Story<HeaderDaoProps> = args => <HeaderDao {...args} />;

export const Dao = Template.bind({});
Dao.args = {
  daoName: 'DaoName',
  description:
    'We are a community that loves trees and the planet. We track where forestation is increasing (or shrinking), fund people who are growing and protecting trees...',
  created_at: 'March 2022',
  daoChain: 'Arbitrum',
  daoType: 'Wallet Based',
  links: [
    {
      label: 'Website',
      href: 'google.com',
    },
    {
      label: 'Discord',
      href: 'google.com',
    },
    {
      label: 'Forum',
      href: 'google.com',
    },
  ],
};
