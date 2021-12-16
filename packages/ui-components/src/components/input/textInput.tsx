import React, {ReactNode} from 'react';
import styled from 'styled-components';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
  /**
   * adornments
   */
  rightAdornment?: ReactNode;
  leftAdornment?: ReactNode;
  /**
  * adornments click events
  */
  rightAdornmentOnClick?: () => void;
  leftAdornmentOnClick?: () => void;
};

/** Simple input with variable styling (depending on mode) */
export const TextInput: React.FC<TextInputProps> = ({
  mode = 'default',
  disabled,
  rightAdornment,
  leftAdornment,
  rightAdornmentOnClick,
  leftAdornmentOnClick,
  ...props
}) => {
  return (
    <Container data-testid="input" {...{mode, disabled}}>
      {leftAdornment && 
        <AdornmentContainer onClick={leftAdornmentOnClick}>
          {leftAdornment}
        </AdornmentContainer>
      }
      <StyledInput disabled={disabled} {...props} />
      {rightAdornment && 
        <AdornmentContainer onClick={rightAdornmentOnClick}>
          {rightAdornment}
        </AdornmentContainer>
      }
    </Container>
  );
};

type StyledCotainerProps = Pick<TextInputProps, 'mode' | 'disabled'>;

export const Container = styled.div.attrs(
  ({mode, disabled}: StyledCotainerProps) => {
    let className = `${!disabled && 'bg-ui-0'} flex space-x-1.5 space-x-1.5
    focus:outline-none focus-within:ring-2 focus-within:ring-primary-500 py-1.5 px-2
    rounded-xl hover:border-ui-300 border-2 active:border-primary-500 items-center `;

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

export const StyledInput = styled.input.attrs(() => {
  let myClassName: string | undefined =
    'w-full bg-transparent focus:outline-none';
  return {className: myClassName};
})<React.InputHTMLAttributes<HTMLInputElement>>``;

export const AdornmentContainer = styled.div.attrs({
  className: 'cursor-pointer'
})``;
