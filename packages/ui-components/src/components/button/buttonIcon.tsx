import React from 'react';
import styled from 'styled-components';

import {ButtonBase, ButtonBaseProps} from './buttonBase';
import {ButtonModes, getButtonStyles} from '../../utils/buttonStyles';
import {IconType} from '../icons';

// Omit icon to make it required
export type ButtonIconProps = Omit<
  ButtonBaseProps,
  'label' | 'icon' | 'iconOnly' | 'iconRight' | 'iconLeft'
> & {
  bgWhite?: boolean;
  icon: React.FunctionComponentElement<IconType>;
  mode?: ButtonModes;
};

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  bgWhite = false,
  mode = 'primary',
  ...props
}) => {
  return (
    <StyledButton {...props} bgWhite={bgWhite} iconOnly={true} mode={mode} />
  );
};

const buttonStyles = {
  primary:
    'text-ui-0 bg-primary-400 hover:bg-primary-500 active:bg-primary-700 disabled:text-primary-300 disabled:bg-primary-100',
  secondary:
    'text-ui-600 hover:text-ui-800 hover:bg-ui-100 active:text-ui-800 active:bg-ui-200 disabled:text-ui-300',
  secondaryOnGray: 'bg-ui-0 disabled:bg-ui-100',
  secondaryOnWhite: 'bg-ui-50 disabled:bg-ui-50',
  ghost:
    'text-ui-500 focus:text-primary-400 hover:text-primary-500 active:text-primary-500 disabled:text-ui-300 disabled:bg-transparent',
  ghostOnGray: 'bg-ui-50 active:bg-ui-0',
  ghostOnWhite: 'bg-ui-0 active:bg-primary-50',
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
