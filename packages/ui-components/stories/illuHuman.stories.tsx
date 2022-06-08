import React from 'react';
import {Meta, Story} from '@storybook/react';
import {IlluHuman, IlluHumanHairProps} from '../src/components/illustrations';

export default {
  title: 'Components/Illustration/Human',
  component: IlluHuman,
} as Meta;

const Template: Story<IlluHumanHairProps> = args => <IlluHuman {...args} />;

export const Default = Template.bind({});
Default.args = {
  body: 'Chart',
  expression: 'casual',
  hair: 'long',
  sunglass: 'big-rounded',
};
