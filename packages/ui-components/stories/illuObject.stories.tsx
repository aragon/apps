import React from 'react';
import {Meta, Story} from '@storybook/react';
import {
  IlluObject,
  Props,
} from '../src/components/illustrations/object/illuObject';

export default {
  title: 'Components/Illustration',
  component: IlluObject,
} as Meta;

const Template: Story<Props> = args => <IlluObject {...args} />;

export const Default = Template.bind({});
Default.args = {
  object: 'magnifying_glass',
};
