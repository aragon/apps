import React from 'react';
import {Meta, Story} from '@storybook/react';
import {VotingTerminal} from '../src';

export default {
  title: 'Components/Widget/VotingTerminal',
  component: VotingTerminal,
} as Meta;

const Template: Story<any> = args => <VotingTerminal {...args} />;

export const Default = Template.bind({});
Default.args = {};
