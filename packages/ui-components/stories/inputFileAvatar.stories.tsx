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
  onClick: () => null,
};
