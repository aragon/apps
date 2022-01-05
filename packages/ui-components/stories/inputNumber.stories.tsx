import React from 'react';
import {Meta, Story} from '@storybook/react';
import {NumericInput, NumericInputProps} from '../src';

export default {
  title: 'Components/Input/Number',
  component: NumericInput,
} as Meta;

const Template: Story<NumericInputProps> = args => <NumericInput {...args} />;

export const Number = Template.bind({});
Number.args = {
  mode: 'default',
  disabled: false,
};
