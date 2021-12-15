import React from 'react';
import {Meta, Story} from '@storybook/react';
import {LinearProgress} from '../src';

export default {
  title: 'Components/LinearProgress',
  component: LinearProgress,
} as Meta;

const Template: Story = args => <LinearProgress {...args} />;

export const Default = Template.bind({});
Default.args = {
  max: 100,
  value: 20
};
