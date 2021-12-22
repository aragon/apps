import React from 'react';
import styled from 'styled-components';
import { StyledInput } from './textInput';

export type ValueInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  /* Text that appears on the button present on the right side of the input  */
  buttonText: string;

  onButtonClick: () => void;

  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
};

export const ValueInput: React.FC<ValueInputProps> = ({buttonText, onButtonClick, mode, disabled, ...props}) => {
  return (
    <Container data-testid="input-value" {...{mode, disabled}}>
      <StyledInput disabled={disabled} {...props} />
      <StyledButton onClick={() => onButtonClick()} disabled={disabled}>{buttonText}</StyledButton>
    </Container>
  );
};

type StyledContainerProps = Pick<ValueInputProps, 'mode' | 'disabled' >;

export const Container = styled.div.attrs(
  ({mode, disabled}: StyledContainerProps) => {
    let className = `${disabled? 'bg-ui-100 border-ui-200' : 'bg-ui-0'} flex items-center space-x-1.5 
      text-ui-600 rounded-xl border-2 hover:border-ui-300 `;

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
)<StyledContainerProps>`
  padding: 6px 6px 6px 16px;

  :focus-within {
    border-color: #003BF5;
  }
`;

const StyledButton = styled.button.attrs({
  className: 'text-sm px-1.5 rounded-lg bg-ui-50 font-bold text-ui-700 disabled:bg-ui-100 disabled:text-ui-300',
})`
  padding-top: 6px;
  padding-bottom: 6px;
`;
