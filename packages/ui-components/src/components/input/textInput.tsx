import React, {ReactNode} from 'react';
import styled from 'styled-components';

export type TextInputProps = {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
   /**
   * Whether Input is disabled
   */
  disabled?: boolean;
   /**
   * Whether Input is disabled
   */
  isSelected?: boolean;
  /**
   * adornment
   */
  adornment?: ReactNode;
  /** 
   * Wheter the icon is left or right of the input
   */
  side: 'left' | 'right';
  /**
   * Placeholder
   */
  placeholder?: string;
};

/** Simple input with variable styling (depending on mode) */
export const TextInput: React.FC<TextInputProps> = ({
  mode = 'default',
  side = 'right',
  disabled,
  isSelected,
  adornment,
  ...props
}) => {
  return (
    <Container data-testid="input" {...{mode,disabled,isSelected,side}} >
      <StyledInput {...props} disabled={disabled}/>
      {adornment}
    </Container>
  );
};

type StyledCotainerProps = Pick<TextInputProps, 'mode' | 'disabled' | 'isSelected' | 'side'>;

export const Container = styled.div.attrs(({mode, disabled, isSelected, side}: StyledCotainerProps) => {
    let className = `${!disabled && 'bg-ui-0'} flex space-x-1.5 space-x-1.5
    focus:outline-none focus-within:ring-2 focus-within:ring-primary-500 py-1.5 px-2
    rounded-xl hover:border-ui-300 border-2 active:border-primary-500
    ${side === 'left' && 'flex-row-reverse space-x-reverse'} items-center `;

    if (isSelected) {
      className += 'border-primary-500'
    } else if (mode === 'default') {
      className += 'border-ui-100';
    } else if (mode === 'success') {
      className += 'border-success-600';
    } else if (mode === 'warning') {
      className += 'border-warning-600';
    } else if (mode === 'critical') {
      className += 'border-critical-600';
    }

    return {className};
})<StyledCotainerProps>``

export const StyledInput = styled.input.attrs({
  className:'w-full bg-transparent focus:outline-none'
})``