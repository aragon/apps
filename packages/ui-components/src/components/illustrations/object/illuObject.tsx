import React from 'react';

import {IconType} from '../../icons';

export type IlluObjectProps = {
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

export const IlluObject: React.FC<IlluObjectProps> = ({object}) => {
  const Module: IconType = require('./')[object];
  return <Module data-testid="illu-object" />;
};
