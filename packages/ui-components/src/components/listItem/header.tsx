import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '../button';

import {IconType} from '../icons';

export type ListItemHeaderProps = {
  /** Action title */
  buttonText: string;
  /** Icon to display */
  icon: React.FunctionComponentElement<IconType>;
  /** Label to display */
  label: string;
  /** Card orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Value to display */
  value: string;
  onClick: () => void;
};

export const ListItemHeader: React.FC<ListItemHeaderProps> = ({
  orientation = 'vertical',
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <VerticalContainer data-testid="listItem-header">
        <Frame>
          <IconWrapper>{props.icon}</IconWrapper>
          <ButtonText label={props.buttonText} onClick={props.onClick} />
        </Frame>
        <ContentWrapper orientation={orientation}>
          <Value>{props.value}</Value>
          <Label>{props.label}</Label>
        </ContentWrapper>
      </VerticalContainer>
    );
  }

  return (
    <HorizontalContainer data-testid="listItem-header">
      <IconWrapper>{props.icon}</IconWrapper>
      <ContentWrapper orientation={orientation}>
        <Value>{props.value}</Value>
        <Label>{props.label}</Label>
      </ContentWrapper>
      <ButtonText label={props.buttonText} onClick={props.onClick} />
    </HorizontalContainer>
  );
};

const HorizontalContainer = styled.div.attrs({
  className: 'bg-ui-0 rounded-xl hidden tablet:flex p-3 items-center space-x-3',
})``;

const VerticalContainer = styled.div.attrs({
  className: 'p-2 tablet:p-3 bg-ui-0 rounded-xl space-y-2 tablet:space-y-3',
})``;

const IconWrapper = styled.div.attrs({
  className:
    'grid place-content-center w-5 h-5 text-primary-500 bg-primary-50 rounded-xl',
})``;

const Frame = styled.div.attrs({className: 'flex justify-between'})``;

type ContentWrapperProps = {
  orientation: NonNullable<ListItemHeaderProps['orientation']>;
};
const ContentWrapper = styled.div.attrs(
  ({orientation}: ContentWrapperProps) => ({
    className: `${
      orientation === 'vertical'
        ? 'space-y-0.25'
        : 'flex flex-1 items-baseline space-x-2'
    }`,
  })
)<ContentWrapperProps>``;

const Value = styled.p.attrs({
  className: 'text-2xl text-ui-800 text-bold truncate',
})``;

const Label = styled.p.attrs({className: 'text-ui-500 truncate'})``;
