import React from 'react';

import {IllustrationComponentProps} from '../illuHuman';
import {Angry} from './angry';
import {Casual} from './casual';
import {Crying} from './crying';
import {Decided} from './decided';
import {Excited} from './excited';
import {SadLeft} from './sad_left';
import {SadRight} from './sad_right';
import {Smile} from './smile';
import {SmileWink} from './smile_wink';
import {Surprised} from './surprised';
import {Suspecting} from './suspecting';

export type Expression =
  | 'angry'
  | 'casual'
  | 'crying'
  | 'decided'
  | 'excited'
  | 'sad_left'
  | 'sad_right'
  | 'smile_wink'
  | 'smile'
  | 'surprised'
  | 'suspecting';

export const IllustrationExpression: React.FC<
  IllustrationComponentProps<Expression>
> = ({type, ...rest}) => {
  switch (type) {
    case 'angry':
      return <Angry {...rest} />;
    case 'casual':
      return <Casual {...rest} />;
    case 'crying':
      return <Crying {...rest} />;
    case 'decided':
      return <Decided {...rest} />;
    case 'excited':
      return <Excited {...rest} />;
    case 'sad_left':
      return <SadLeft {...rest} />;
    case 'sad_right':
      return <SadRight {...rest} />;
    case 'smile':
      return <Smile {...rest} />;
    case 'smile_wink':
      return <SmileWink {...rest} />;
    case 'surprised':
      return <Surprised {...rest} />;
    case 'suspecting':
      return <Suspecting {...rest} />;
    default:
      throw new Error(
        'Unknown type of Expression illustration required. Make sure to only request types of illustrations that exist. Also check that the component and Type were extended in case new types are introduced.'
      );
  }
};
