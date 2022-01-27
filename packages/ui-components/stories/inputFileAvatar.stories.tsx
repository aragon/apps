import React from 'react';
import {Meta, Story} from '@storybook/react';
import {FileAvatarInput, FileAvatarInputProps} from '../src';

export default {
  title: 'Components/Input/Avatar',
  component: FileAvatarInput,
} as Meta;

const Template: Story<FileAvatarInputProps> = args => (
  <FileAvatarInput {...args} />
);

export const Avatar = Template.bind({});
Avatar.args = {
  onChange: () => null,
  onError: () =>
    alert(
      'Please provide a squared image (PNG, SVG, JPG or GIF) with maximum of 5MB and size between 256px and 2400 px on each side'
    ),
};
