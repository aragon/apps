import React from 'react';
import {Meta, Story} from '@storybook/react';
import {HeaderDao, HeaderDaoProps} from '../src';

export default {
  title: 'Components/Headers/Dao',
  component: HeaderDao,
} as Meta;

const Template: Story<HeaderDaoProps> = args => <HeaderDao {...args} />;

export const Default = Template.bind({});
Default.args = {
  daoName: 'DaoName',
  description:
    'We are a community that loves trees and the planet. We track where forestation is increasing (or shrinking), fund people who are growing and protecting trees...',
  created_at: 'March 2022',
  daoChain: 'Arbitrum',
  daoType: 'wallet-based',
  discordLink: 'google.com',
  websiteLink: 'google.com',
  forumLink: 'google.com',
};
