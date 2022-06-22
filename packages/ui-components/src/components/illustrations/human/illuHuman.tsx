import React from 'react';
import styled from 'styled-components';

import {Accessory, IllustrationAccessory} from './human_accessories';
import {Body, IllustrationBodies} from './human_bodies';
import {Expression, IllustrationExpression} from './human_expressions';
import {Hair, IllustrationHair} from './human_hairs';
import {IllustrationSunglass, Sunglass} from './human_sunglasses';

export type IlluHumanProps = {
  body: Body;
  expression: Expression;
  hair?: Hair;
  sunglass?: Sunglass;
  accessory?: Accessory;
} & Dimensions;

export const IllustrationHuman: React.FC<IlluHumanProps> = ({
  body,
  expression,
  hair = 'none',
  sunglass = 'none',
  accessory = 'none',
  ...rest
}) => {
  return (
    <Container data-testid="illu-human">
      <Item>
        <IllustrationBodies type={body} {...rest} />
      </Item>
      <Item>
        <IllustrationExpression type={expression} {...rest} />
      </Item>
      <Item>
        <IllustrationHair type={hair} {...rest} />
      </Item>
      <Item>
        <IllustrationSunglass type={sunglass} {...rest} />
      </Item>
      <Item>
        <IllustrationAccessory type={accessory} {...rest} />
      </Item>
    </Container>
  );
};

const Container = styled.div.attrs({
  className: 'relative bottom-1/2 right-1/2',
})``;

const Item = styled.div.attrs({
  className: 'absolute',
})``;

/**
 * Type of any illustration component that makes up an illustration. Comes with
 * the various types (in the sense of "variations") that component can come in,
 * as well as its dimensions.
 */
export type IllustrationComponentProps<T> = {
  type: T;
} & Dimensions;

/** Add the literal type 'none' to a Type */
export type Noneable<T> = T | 'none';

export type Dimensions = {
  height?: number;
  width?: number;
};
