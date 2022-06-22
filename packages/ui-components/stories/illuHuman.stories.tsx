import React from 'react';
import {Meta, Story} from '@storybook/react';
import {
  IllustrationHuman,
  IlluHumanProps,
} from '../src/components/illustrations';

export default {
  title: 'Components/Illustration/Human',
  component: IllustrationHuman,
} as Meta;

const Template: Story<IlluHumanProps> = args => (
  <div className="absolute">
    <IllustrationHuman {...args} />
  </div>
);
export const Default = Template.bind({});
Default.args = {
  body: 'chart',
  expression: 'casual',
  width: 800,
  height: 450,
};
