import React from 'react';
import {Meta, Story} from '@storybook/react';

import {
  AvatarWallet,
  AvatarWalletProps,
} from '../src/components/avatar/avatarWallet';

export default {
  title: 'Components/Avatar/AvatarWallet',
  component: AvatarWallet,
} as Meta;

const Template: Story<AvatarWalletProps> = args => <AvatarWallet {...args} />;

export const Initials = Template.bind({});
Initials.args = {
  src: 'https://eu.ui-avatars.com/api/?name=Dao+Name+three&background=0037D2&color=fff',
};

export const Identicon = Template.bind({});
Identicon.args = {
  src: '0x6720000000000000000000000000000000007739',
};
