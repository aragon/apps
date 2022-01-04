import React, {ReactNode} from 'react';
import styled from 'styled-components';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
  /**
   * left adornment
   */
  leftAdornment?: ReactNode;
  /**
   * right adornment
   */
  rightAdornment?: ReactNode;
  /**
   * Wheter the icon is left or right of the input
   */
  side?: 'left' | 'right';
  /**
   * make input disabled and the whole form clickable
   */
  clickable?: boolean;
  /**
   * onClick event
   */
  onClick: () => void;
};

/** Simple input with variable styling (depending on mode) */
export const TextInput: React.FC<TextInputProps> = ({
  mode = 'default',
  side = 'right',
  disabled,
  leftAdornment,
  rightAdornment,
  clickable,
  onClick,
  ...props
}) => {
  return (
    <Container data-testid="input" {...{mode, disabled, side, clickable, onClick}}>
      {rightAdornment}
      <InputWrapper>
        {leftAdornment}
        <StyledInput disabled={clickable || disabled} clickable={clickable} {...props} />
      </InputWrapper>
    </Container>
  );
};

type StyledCotainerProps = Pick<TextInputProps, 'mode' | 'disabled' | 'side' | 'clickable'>;
type StyledInputProps = Pick<TextInputProps, 'clickable'>;

export const Container = styled.div.attrs(
  ({mode, disabled, side, clickable}: StyledCotainerProps) => {
    let className = `${disabled ? 'bg-ui-100' : 'bg-ui-0'} flex space-x-1.5
    focus:outline-none focus-within:ring-2 focus-within:ring-primary-500 py-1.5 px-2
    rounded-xl hover:border-ui-300 border-2 active:border-primary-500 items-center 
    ${side === 'left' && 'flex-row-reverse space-x-reverse'} ${clickable && 'cursor-pointer'} `;

    if (mode === 'default') {
      className += 'border-ui-100';
    } else if (mode === 'success') {
      className += 'border-success-600';
    } else if (mode === 'warning') {
      className += 'border-warning-600';
    } else if (mode === 'critical') {
      className += 'border-critical-600';
    }

    return {className};
  }
)<StyledCotainerProps>``;

export const StyledInput = styled.input.attrs(({clickable}: StyledInputProps) => {
  let myClassName: string | undefined =
    `w-full bg-transparent focus:outline-none ${clickable && 'cursor-pointer'}`;
  return {className: myClassName};
})<React.InputHTMLAttributes<HTMLInputElement> & StyledInputProps>``;

export const InputWrapper = styled.div.attrs({
  className: 'flex space-x-1.5 w-full items-center'
})``;
