import React from 'react';
import styled from 'styled-components';

import {ButtonBase, ButtonBaseProps} from './buttonBase';

// Omit override label to make it required
export type ButtonTextProps = Omit<ButtonBaseProps, 'label' | 'iconOnly'> & {
  bgWhite?: boolean;
  label: string;
  isActive?: boolean;
};

export const ButtonText: React.FC<ButtonTextProps> = ({
  bgWhite = false,
  label,
  isActive = false,
  mode = 'primary',
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      bgWhite={bgWhite}
      label={label}
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
        className = `${bgWhite ? 'bg-ui-50' : 'bg-ui-0'} ${
          isActive ? 'text-ui-800 bg-ui-200' : 'text-ui-600'
        } hover:text-ui-800 hover:bg-ui-100 active:text-ui-800 active:bg-ui-200 disabled:text-ui-300 disabled:bg-ui-100`;
        break;

      case 'ghost':
        className = `${
          bgWhite
            ? `${isActive ? 'bg-primary-50' : 'bg-ui-0'} active:bg-primary-50`
            : `${isActive ? 'bg-ui-0' : 'bg-ui-50'}  active:bg-ui-0`
        } ${
          isActive ? 'text-primary-500' : 'text-ui-600'
        } hover:text-primary-500 active:text-primary-500 disabled:text-ui-300`;
        break;

      default:
        className = `${
          isActive ? 'bg-primary-700' : 'bg-primary-400'
        } text-ui-0 hover:bg-primary-500 active:bg-primary-700 disabled:text-primary-300 disabled:bg-primary-100`;
    }

    return {className};
  }
)<StyledButtonProps>``;
