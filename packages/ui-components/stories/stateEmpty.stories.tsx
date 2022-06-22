import React from 'react';
import {Meta, Story} from '@storybook/react';
import {StateEmpty, StateEmptyProps} from '../src';

export default {
  title: 'Components/StateEmpty',
  component: StateEmpty,
} as Meta;

const Template: Story<StateEmptyProps> = args => <StateEmpty {...args} />;

export const Default = Template.bind({});
Default.args = {
  body: 'voting',
  expression: 'casual',
  hair: 'middle',
  sunglass: 'big_rounded',
  accessory: 'earrings_rhombus',
  title: 'title',
  description: 'description',
  buttonLabelPrimary: 'button text',
  buttonLabelSecondary: 'button text',
  width: 800,
  height: 450,
};
