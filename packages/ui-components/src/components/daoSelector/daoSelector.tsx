import React from 'react';
import styled from 'styled-components';

import {IconSwitch} from '../icons';
import {Avatar} from '../avatar';

export type DaoSelectorProps = {
  src: string;
  label: string;
};

export const DaoSelector = ({src, label}: DaoSelectorProps) => {
  return (
    <Container>
      <Avatar src={src} size={'default'} mode="square" />
      {label}
      <IconSwitch />
    </Container>
  );
};

const Container = styled.button.attrs({
  className: 'flex items-center justify-between',
})``;
