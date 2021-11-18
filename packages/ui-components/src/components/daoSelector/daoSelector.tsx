import React from 'react';
import styled from 'styled-components';

import {IconSwitch} from '../icons';
import {Avatar} from '../avatar';

export type DaoSelectorProps = {
  src: string;
  label: string;
  onClick: () => void;
};

export const DaoSelector = ({src, label, onClick}: DaoSelectorProps) => {
  return (
    <StyledButtonAdaptive onClick={onClick}>
      <Avatar src={src} size={'default'} mode="square" />
      <p>{label}</p>
      <HoverIconSwitch />
    </StyledButtonAdaptive>
  );
};

const StyledButtonAdaptive = styled.button.attrs(() => {
  const dimensions = 'flex flex-col items-center rounded-2xl text-xs';
  const baseStyle = 'text-ui-800 font-medium';
  const dimensionsDesktop =
    'desktop:flex desktop:flex-row desktop:items-center desktop:space-x-2 desktop:pr-1.5';
  const hoverDesktop = 'group ';
  const focusStyle = 'focus:outline-none focus:ring-2 focus:ring-primary-500';
  const activeStyle = 'active:text-primary-500';
  const combinedClasses = `${dimensions} ${baseStyle} ${dimensionsDesktop} ${hoverDesktop} ${focusStyle} ${activeStyle}`;

  return {className: combinedClasses};
})``;

const HoverIconSwitch = styled(IconSwitch).attrs(() => {
  return {
    className: 'hidden desktop:block group-hover:text-primary-500',
  };
})``;
