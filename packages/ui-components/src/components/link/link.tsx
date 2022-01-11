import React from 'react';
import styled from 'styled-components';

import {IconType} from '../icons';

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  iconRight?: React.FunctionComponentElement<IconType>;
  iconLeft?: React.FunctionComponentElement<IconType>;
  label?: string;
};

export const Link: React.FC<LinkProps> = ({
  active = false,
  disabled = false,
  external = true,
  iconLeft,
  iconRight,
  label,
  href,
  ...props
}) => {
  return (
    <StyledLink
      href={href}
      rel="noopener noreferrer"
      active={active}
      disabled={disabled}
      {...(external ? {target: '_blank'} : {})}
      {...props}
      data-testid="link"
    >
      <div className="inline-flex justify-start items-center space-x-1.5">
        {iconLeft && <IconContainer>{iconLeft}</IconContainer>}
        <Label>{label || href}</Label>
        {!iconLeft && iconRight && <IconContainer>{iconRight}</IconContainer>}
      </div>
    </StyledLink>
  );
};

type StyledLinkProps = {disabled: boolean; active: boolean};
const StyledLink = styled.a.attrs(({active, disabled}: StyledLinkProps) => {
  return {
    className: `${disabled ? 'text-ui-300' : 'text-primary-500'} ${
      active ? 'text-primary-800' : 'text-primary-500'
    } overflow-hidden text-primary-500 hover:text-primary-700
      focus:bg-ui-0 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none` as
      | string
      | undefined,
  };
})<StyledLinkProps>``;

const IconContainer = styled.span.attrs({})``;

const Label = styled.span.attrs({
  className: 'text-base font-bold' as string | undefined,
})``;
