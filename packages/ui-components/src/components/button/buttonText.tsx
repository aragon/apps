import React from 'react';
import styled from 'styled-components';

import {ButtonBase, ButtonBaseProps} from './buttonBase';
import {ButtonModes, getButtonStyles} from '../../utils/buttonStyles';

// Omit override label to make it required
export type ButtonTextProps = Omit<ButtonBaseProps, 'label' | 'iconOnly'> & {
  bgWhite?: boolean;
  label: string;
  mode?: ButtonModes;
};

export const ButtonText: React.FC<ButtonTextProps> = ({
  bgWhite = false,
  label,
  mode = 'primary',
  ...props
}) => {
  return (
    <StyledButton {...props} bgWhite={bgWhite} label={label} mode={mode} />
  );
};

const buttonStyles = {
  primary:
    'text-ui-0 bg-primary-400 hover:bg-primary-500 active:bg-primary-700 disabled:text-primary-300 disabled:bg-primary-100',
  secondary:
    'text-ui-600 hover:text-ui-800 hover:bg-ui-100 active:text-ui-800 active:bg-ui-200 disabled:text-ui-300 disabled:bg-ui-100',
  secondaryOnWhite: 'bg-ui-50',
  secondaryOnGray: 'bg-ui-0',
  ghost:
    'text-ui-600 hover:text-primary-500 active:text-primary-500 disabled:text-ui-300',
  ghostOnWhite: 'bg-ui-0 active:bg-primary-50',
  ghostOnGray: 'bg-ui-50 active:bg-ui-0',
};

type StyledButtonProps = {
  bgWhite: boolean;
  mode: ButtonModes;
};
const StyledButton = styled(ButtonBase).attrs(
  ({bgWhite, mode}: StyledButtonProps) => ({
    className: getButtonStyles(buttonStyles, mode, bgWhite),
  })
)<StyledButtonProps>``;
