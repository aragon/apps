import React from 'react';

import {UnknownIllustrationVariantError} from '..';
import {Action} from './action';
import {App} from './app';
import {Archive} from './archive';
import {Book} from './book';
import {Build} from './build';
import {Chain} from './chain';
import {Database} from './database';
import {Error} from './error';
import {Explore} from './explore';
import {Gas} from './gas';
import {Labels} from './labels';
import {LightBulb} from './lightbulb';
import {MagnifyingGlass} from './magnifyingGlass';
import {Security} from './security';
import {Settings} from './settings';
import {SmartContract} from './smartContract';
import {Users} from './users';
import {Wagmi} from './wagmi';
import {Wallet} from './wallet';

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

export const IlluObject: React.FC<IlluObjectProps> = ({object, ...rest}) => {
  switch (object) {
    case 'action':
      return <Action {...rest} />;
    case 'app':
      return <App {...rest} />;
    case 'archive':
      return <Archive {...rest} />;
    case 'book':
      return <Book {...rest} />;
    case 'build':
      return <Build {...rest} />;
    case 'chain':
      return <Chain {...rest} />;
    case 'database':
      return <Database {...rest} />;
    case 'error':
      return <Error {...rest} />;
    case 'explore':
      return <Explore {...rest} />;
    case 'gas':
      return <Gas {...rest} />;
    case 'labels':
      return <Labels {...rest} />;
    case 'lightbulb':
      return <LightBulb {...rest} />;
    case 'magnifying_glass':
      return <MagnifyingGlass {...rest} />;
    case 'security':
      return <Security {...rest} />;
    case 'settings':
      return <Settings {...rest} />;
    case 'smart_contract':
      return <SmartContract {...rest} />;
    case 'users':
      return <Users {...rest} />;
    case 'wagmi':
      return <Wagmi {...rest} />;
    case 'wallet':
      return <Wallet {...rest} />;
    default:
      throw new UnknownIllustrationVariantError(object, 'expression');
  }
};
