import React from 'react';
import styled from 'styled-components';

import {IconType} from '../../icons';

export type IlluHumanHairProps = {
  hair:
    | 'long'
    | 'afro'
    | 'bald'
    | 'bun'
    | 'cool'
    | 'curly-bangs'
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
    | 'computer-correct'
    | 'computer'
    | 'correct'
    | 'double-correct'
    | 'elevating'
    | 'sending-love'
    | 'voting';
  expression:
    | 'angry'
    | 'casual'
    | 'crying'
    | 'decided'
    | 'excited'
    | 'sad-left'
    | 'sad-right'
    | 'smile-wink'
    | 'smile'
    | 'surprised'
    | 'suspecting';
  sunglass:
    | 'big-rounded'
    | 'big-semirounded'
    | 'large-stylized-xl'
    | 'large-stylized'
    | 'pirate'
    | 'small-intellectual'
    | 'small-sympathetic'
    | 'small-weird-one'
    | 'small-weird-two'
    | 'thuglife-rounded'
    | 'thuglife';
  accessory:
    | 'buddha'
    | 'earrings-circle'
    | 'earrings-hoops'
    | 'earrings-rhombus'
    | 'earrings-skull'
    | 'earrings-thunder'
    | 'expression'
    | 'flushed'
    | 'head-flower'
    | 'piercings-tattoo'
    | 'piercings';
};

export const IlluHuman: React.FC<IlluHumanHairProps> = ({
  body,
  expression,
  hair = 'long',
  sunglass = 'big-rounded',
  accessory = 'buddha',
}) => {
  const Hair: IconType = require(`./human_hairs/${hair}`)[hair];
  const Expression: IconType = require(`./human_expressions/${expression}`)[
    expression
  ];
  const Body: IconType = require(`./human_bodies/${body.replaceAll('-', '_')}`)[
    body.replaceAll('-', '_')
  ];
  const Sunglass: IconType =
    require(`./human_sunglasses`)[sunglass.replaceAll('-', '_')];
  const Accessory: IconType =
    require(`./human_accessories`)[accessory.replaceAll('-', '_')];
  return (
    <Container data-testid="illu-human">
      <Item>
        <Hair />
      </Item>
      <Item>
        <Expression />
      </Item>
      <Item>
        <Body />
      </Item>
      <Item>
        <Sunglass />
      </Item>
      <Item>
        <Accessory />
      </Item>
    </Container>
  );
};

const Container = styled.div.attrs({
  className: 'relative',
})``;

const Item = styled.div.attrs({
  className: 'absolute',
})``;
