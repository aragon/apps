import React from 'react';
import {Meta, Story} from '@storybook/react';
import {ProgressStatus, ProgressStatusProps} from '../src';

export default {
  title: 'Components/Progress/Status',
  component: ProgressStatus,
} as Meta;

const Template: Story<ProgressStatusProps> = args => (
  <div className="w-1/3">
    <ProgressStatus {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  mode: 'active',
  label: 'hi',
  block: '123,212,122',
};
