import React from 'react';
import {Meta, Story} from '@storybook/react';
import {Option, ButtonGroup, ButtonGroupProps} from '../src';

export default {
  title: 'Components/Buttons/Group',
  component: ButtonGroup,
} as Meta;

const Template: Story<ButtonGroupProps> = args => (
  <ButtonGroup {...args}>
    <Option value="1D">1D</Option>
    <Option value="1W">1W</Option>
    <Option value="1M">1M</Option>
    <Option value="1Y">1Y</Option>
    <Option value="Max">Max</Option>
  </ButtonGroup>
);

export const Default = Template.bind({});
Default.args = {
  bgWhite: true,
  defaultValue: 'Max',
  onChange: value => console.log(value),
};
