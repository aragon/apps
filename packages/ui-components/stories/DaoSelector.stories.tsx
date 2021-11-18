import React from 'react';
import {Meta, Story} from '@storybook/react';
import {DaoSelector, DaoSelectorProps} from '../src';

export default {
  title: 'Components/DaoSelector',
  component: DaoSelector,
} as Meta;

const Template: Story<DaoSelectorProps> = args => <DaoSelector {...args} />;

export const Test = Template.bind({});
Test.args = {
  src:
    'https://banner2.cleanpng.com/20180325/sxw/kisspng-computer-icons-avatar-avatar-5ab7529a8e4e14.9936310115219636745829.jpg',
  label: 'test',
};
