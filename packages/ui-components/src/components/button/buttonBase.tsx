import React, {HTMLAttributes} from 'react';
import styled from 'styled-components';
import {IconType} from '../icons';

export type ButtonBaseProps = HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  icon?: React.FunctionComponentElement<IconType>;
  iconLeft?: boolean;
  iconOnly?: boolean;
  iconRight?: boolean;
  label?: string;
  mode?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
};

/**
 * Button to be used as base for other button components.
 * This button should not be exported with the library.
 * Size, font, margin, padding, and border-radius are included.
 */
export const ButtonBase: React.FC<ButtonBaseProps> = ({
  icon,
  iconOnly = false,
  iconRight = false,
  iconLeft = false,
  label,
  size = 'medium',
  onClick,
  ...props
}) => {
  if (iconOnly) {
    return (
      <StyledButtonIcon {...props} size={size}>
        {icon && <IconContainer size={size}>{icon}</IconContainer>}
      </StyledButtonIcon>
    );
  }

  if (iconLeft) {
    return (
      <StyledButtonText {...props} size={size}>
        {icon && <IconContainer size={size}>{icon}</IconContainer>}
        {label && <span>{label}</span>}
      </StyledButtonText>
    );
  }

  if (iconRight) {
    return (
      <StyledButtonText {...props} size={size}>
        {label && <span>{label}</span>}
        {icon && <IconContainer size={size}>{icon}</IconContainer>}
      </StyledButtonText>
    );
  }
  return (
    <StyledButtonText {...props} size={size}>
      {label && <span>{label}</span>}
    </StyledButtonText>
  );
};

/**********************************
 *             STYLES             *
 **********************************/
const sizeStyles = {
  small: 'h-4 space-x-1 rounded-lg',
  medium: 'h-5 space-x-1.5 rounded-lg', // FIXME: borderRadius 10px
  large: 'h-6 space-x-1.5 rounded-xl',
};

const paddingStyles = {
  small: 'py-0.5 px-2',
  medium: 'py-1.5 px-2',
  large: 'py-1.5 px-2',
};

const iconOnlyPaddingStyles = {
  small: 'p-1',
  medium: 'p-1.5',
  large: 'p-2',
};

const fontStyles = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-base',
};

const iconStyles = {
  small: 'w-1.5 h-1.5',
  medium: 'w-2 h-2',
  large: 'w-2 h-2',
};

/**********************************
 *        Styled-Components       *
 **********************************/
type SizeProps = {
  size: ButtonBaseProps['size'];
};

const BaseStyledButton = styled.button.attrs(({size = 'medium'}: SizeProps) => {
  let className: string | undefined;
  className = `${sizeStyles[size]} ${fontStyles[size]} flex justify-start items-center font-bold focus:outline-none focus:ring-2 focus:ring-primary-500`;
  return {className};
})<SizeProps>``;

const StyledButtonIcon = styled(BaseStyledButton).attrs(
  ({size = 'medium'}: SizeProps) => {
    let className: string | undefined;
    className = `${iconOnlyPaddingStyles[size]}`;
    return {className};
  }
)``;

const StyledButtonText = styled(BaseStyledButton).attrs(
  ({size = 'medium'}: SizeProps) => {
    let className: string | undefined;
    className = `${paddingStyles[size]}`;
    return {className};
  }
)``;

const IconContainer = styled.span.attrs(({size = 'medium'}: SizeProps) => {
  let className: string | undefined;
  className = `flex items-center ${iconStyles[size]}`;
  return {className};
})<SizeProps>``;
