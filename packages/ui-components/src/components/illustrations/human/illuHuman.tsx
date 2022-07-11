import React from 'react';
import styled from 'styled-components';
import {Dimensions} from '../../../utils/illustrations';

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
