import React from 'react';
import {Meta, Story} from '@storybook/react';
import {IlluObject, IlluObjectProps} from '../src/components/illustrations';

export default {
  title: 'Components/Illustration/Object',
  component: IlluObject,
} as Meta;

const Template: Story<IlluObjectProps> = args => <IlluObject {...args} />;

export const Default = Template.bind({});
Default.args = {
  object: 'magnifying_glass',
};
