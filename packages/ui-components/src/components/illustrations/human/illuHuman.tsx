import React from 'react';
import styled from 'styled-components';

import {Accessory, IllustrationAccessory} from './human_accessories';
import {Body, IllustrationBodies} from './human_bodies';
import {Expression, IllustrationExpression} from './human_expressions';
import {Hair, IllustrationHair} from './human_hairs';
import {IllustrationSunglass, Sunglass} from './human_sunglasses';

export type IlluHumanProps = {
  /**
   * The variant of human body used as for the Illustration
   */
  body: Body;
  /**
   * The variant of facial expression used as for the Illustration
   */
  expression: Expression;
  /**
   * The variant of hair style used as for the Illustration. This is prop is
   * optional. If not specified, no hair will be shown.
   */
  hair?: Hair;
  /**
   * The variant of glasses used as for the Illustration. This is prop is
   * optional. If not specified, no glasses will be shown.
   */
  sunglass?: Sunglass;
  /**
   * The variant of accessory used as for the Illustration. This is prop is
   * optional. If not specified, no accessories will be shown.
   */
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
    <div
      data-testid="illu-human"
      style={{width: rest.width, height: rest.height}}
    >
      <Item>
        <IllustrationBodies variant={body} {...rest} />
      </Item>
      <Item>
        <IllustrationExpression variant={expression} {...rest} />
      </Item>
      <Item>
        <IllustrationHair variant={hair} {...rest} />
      </Item>
      <Item>
        <IllustrationSunglass variant={sunglass} {...rest} />
      </Item>
      <Item>
        <IllustrationAccessory variant={accessory} {...rest} />
      </Item>
    </div>
  );
};

const Item = styled.div.attrs({
  className: 'absolute',
})``;

/**
 * Type of any illustration component that makes up an illustration. Comes with
 * the various types (in the sense of "variations") that component can come in,
 * as well as its dimensions.
 */
export type IllustrationComponentProps<T> = {
  variant: T;
} & Dimensions;

/** Add the literal type 'none' to a Type */
export type Noneable<T> = T | 'none';

export type Dimensions = {
  width?: number;
  height?: number;
};

export class UnknownIllustrationVariantError extends Error {
  constructor(variant: string, illustrationComponent: string) {
    super(
      `Unknown variant "${variant}" of ${illustrationComponent} illustration. 
       Make sure to only request variants of illustrations that exist. 
       Also, check that the corresponding component and Type were properly extended in case new variants are introduced.`
    );
  }
}
