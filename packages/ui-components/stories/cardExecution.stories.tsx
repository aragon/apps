import React from 'react';
import {Meta, Story} from '@storybook/react';
import {CardExecution, CardExecutionProps} from '../src';

export default {
  title: 'Components/Card/execution',
  component: CardExecution,
} as Meta;

const Template: Story<CardExecutionProps> = args => <CardExecution {...args} />;

export const Default = Template.bind({});
Default.args = {
  to: 'Patito DAO',
  from: '0x3430008404144CD5000005A44B8ac3f4DB2a3434',
  toLabel: 'To',
  fromLabel: 'From',
};
