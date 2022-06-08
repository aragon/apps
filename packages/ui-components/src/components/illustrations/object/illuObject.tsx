import React from 'react';

import {IconType} from '../../icons';

export type Props = {
  object:
    | 'action'
    | 'app'
    | 'archive'
    | 'book'
    | 'build'
    | 'chain'
    | 'database'
    | 'error'
    | 'explore'
    | 'gas'
    | 'labels'
    | 'lightbulb'
    | 'magnifying_glass'
    | 'security'
    | 'settings'
    | 'smart_contract'
    | 'users'
    | 'wagmi'
    | 'wallet';
};

export const IlluObject: React.FC<Props> = ({object}) => {
  const Module: IconType = require('./')[object];
  return <Module />;
};
