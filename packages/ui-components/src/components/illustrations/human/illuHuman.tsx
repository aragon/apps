import React from 'react';
import styled from 'styled-components';

import {IconType} from '../../icons';

export type IlluHumanHairProps = {
  hair?:
    | 'long'
    | 'afro'
    | 'bald'
    | 'bun'
    | 'cool'
    | 'curly_bangs'
    | 'curly'
    | 'informal'
    | 'middle'
    | 'oldschool'
    | 'punk'
    | 'short';
  body:
    | 'relaxed'
    | 'aragon'
    | 'blocks'
    | 'chart'
    | 'computer_correct'
    | 'computer'
    | 'correct'
    | 'double_correct'
    | 'elevating'
    | 'sending_love'
    | 'voting';
  expression:
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
  sunglass?:
    | 'big_rounded'
    | 'big_semirounded'
    | 'large_stylized_xl'
    | 'large_stylized'
    | 'pirate'
    | 'small_intellectual'
    | 'small_sympathetic'
    | 'small_weird_one'
    | 'small_weird_two'
    | 'thuglife_rounded'
    | 'thuglife';
  accessory?:
    | 'buddha'
    | 'earrings_circle'
    | 'earrings_hoops'
    | 'earrings_rhombus'
    | 'earrings_skull'
    | 'earrings_thunder'
    | 'expression'
    | 'flushed'
    | 'head_flower'
    | 'piercings_tattoo'
    | 'piercings';
  height?: number;
  width?: number;
};

export const IlluHuman: React.FC<IlluHumanHairProps> = ({
  body = 'long',
  expression = 'aragon',
  hair,
  sunglass,
  accessory,
  height,
  width,
}) => {
  const Expression: IconType = require('./human_expressions')[expression];
  const Body: IconType = require('./human_bodies')[body];
  const Hair: IconType = hair ? require('./human_hairs')[hair] : null;
  const Sunglass: IconType = sunglass
    ? require('./human_sunglasses')[sunglass]
    : null;
  const Accessory: IconType = accessory
    ? require('./human_accessories')[accessory]
    : null;

  return (
    <Container data-testid="illu-human">
      {hair && (
        <Item>
          <Hair {...{height, width}} />
        </Item>
      )}
      <Item>
        <Expression {...{height, width}} />
      </Item>
      <Item>
        <Body {...{height, width}} />
      </Item>
      {Sunglass && (
        <Item>
          <Sunglass {...{height, width}} />
        </Item>
      )}
      {Accessory && (
        <Item>
          <Accessory {...{height, width}} />
        </Item>
      )}
    </Container>
  );
};

const Container = styled.div.attrs({
  className: 'relative bottom-1/2 right-1/2',
})``;

const Item = styled.div.attrs({
  className: 'absolute',
})``;
