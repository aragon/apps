import React from 'react';
import styled from 'styled-components';

import {IconType} from '../icons';
import {ButtonBase, ButtonBaseProps} from './buttonBase';

// Omit icon to make it required
export type ButtonIconProps = Omit<
  ButtonBaseProps,
  'label' | 'icon' | 'iconOnly' | 'iconRight' | 'iconLeft'
> & {
  bgWhite?: boolean;
  icon: React.FunctionComponentElement<IconType>;
  isActive?: boolean;
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  bgWhite = false,
  isActive = false,
  mode = 'primary',
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      bgWhite={bgWhite}
      iconOnly={true}
      isActive={isActive}
      mode={mode}
    />
  );
};

type StyledButtonProps = {
  bgWhite: boolean;
  isActive: boolean;
  mode: ButtonBaseProps['mode'];
};
const StyledButton = styled(ButtonBase).attrs(
  ({bgWhite, isActive, mode}: StyledButtonProps) => {
    let className: string | undefined;

    switch (mode) {
      case 'secondary':
        className = `${
          bgWhite ? 'bg-ui-50 disabled:bg-ui-50' : 'bg-ui-0 disabled:bg-ui-100'
        } ${
          isActive ? 'text-ui-800 bg-ui-200' : 'text-ui-600'
        } hover:text-ui-800 hover:bg-ui-100 active:text-ui-800 active:bg-ui-200 disabled:text-ui-300`;
        break;

      case 'ghost':
        className = `${
          bgWhite
            ? `${isActive ? 'bg-primary-50' : 'bg-ui-0'} active:bg-primary-50`
            : `${isActive ? 'bg-ui-0' : 'bg-ui-50'} active:bg-ui-0`
        } ${
          isActive ? 'ext-primary-500' : 'text-ui-500'
        } focus:text-primary-400 hover:text-primary-500 active:text-primary-500 disabled:text-ui-300 disabled:bg-transparent`;
        break;

      default:
        className = `${
          isActive ? 'bg-primary-700' : 'bg-primary-400'
        } text-ui-0 hover:bg-primary-500 active:bg-primary-700 disabled:text-primary-300 disabled:bg-primary-100`;
        break;
    }

    return {className};
  }
)<StyledButtonProps>``;
