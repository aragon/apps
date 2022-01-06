import React, {useRef} from 'react';
import styled from 'styled-components';
import {ButtonIcon} from '../button';
import {IconAdd, IconRemove} from '../icons';

export type NumberInputProps = {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
  disabled?: boolean;
};

export const NumberInput: React.FC<NumberInputProps> = ({
  mode = 'default',
  disabled,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container data-testid="number-input" {...{mode, disabled}}>
      <ButtonIcon
        mode="ghost"
        size="medium"
        icon={<IconRemove />}
        disabled={disabled}
        onClick={() => inputRef.current?.stepDown()}
      />
      <StyledNumberInput {...props} ref={inputRef} disabled={disabled} />
      <ButtonIcon
        mode="ghost"
        size="medium"
        icon={<IconAdd />}
        disabled={disabled}
        onClick={() => inputRef.current?.stepUp()}
      />
    </Container>
  );
};

export type StyledContainerProps = Pick<NumberInputProps, 'mode' | 'disabled'>;

const Container = styled.div.attrs(({mode, disabled}: StyledContainerProps) => {
  let className = `${disabled ? 'bg-ui-100' : 'bg-ui-0'} flex p-1 bg-ui-0 w-18
    focus:outline-none focus-within:ring-2 focus-within:ring-primary-500
    rounded-xl hover:border-ui-300 border-2 active:border-primary-500 items-center
  `;

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
})<StyledContainerProps>``;

const StyledNumberInput = styled.input.attrs(({disabled}) => ({
  className: `${
    disabled ? 'text-ui-300' : 'text-ui-600'
  } w-full bg-transparent focus:outline-none margin-0`,
  type: 'number',
  placeholder: '0',
}))<React.InputHTMLAttributes<HTMLInputElement>>`
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
