import React, {useState} from 'react';
import styled from 'styled-components';
import {ButtonIcon} from '../button';
import {IconAdd, IconRemove} from '../icons';

export type NumericInputProps = {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
  /**
   * minimum number
   */
  min?: string;
  /**
   * maximum number
   */
  max?: string;
  /**
   * Default Value
   */
  defaultValue?: string;
  onChange: (value: string) => void;
};

export const NumericInput: React.FC<NumericInputProps> = ({
  mode = 'default',
  min,
  max,
  onChange: onChangeCallback,
  defaultValue = '0',
  ...props
}) => {
  const [value, setValue] = useState<string>(defaultValue);

  const onChange = (nextValue: string) => {
    setValue(nextValue);
    if (onChangeCallback) {
      onChangeCallback(nextValue);
    }
  };

  return (
    <Container {...{mode}}>
      <ButtonIcon
        mode="ghost"
        size="medium"
        icon={<IconAdd />}
        onClick={() =>
          value === max && max ? max : onChange(`${Number(value) + 1}`)
        }
      />
      <StyledNumberInput
        {...props}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <ButtonIcon
        mode="ghost"
        size="medium"
        icon={<IconRemove />}
        onClick={() =>
          value === min && min ? min : onChange(`${Number(value) - 1}`)
        }
      />
    </Container>
  );
};

type StyledContainerProps = Pick<NumericInputProps, 'mode'>;

const Container = styled.div.attrs(({mode}: StyledContainerProps) => {
  let className = `flex p-1 bg-ui-0 w-18
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

const StyledNumberInput = styled.input.attrs({
  className: 'w-full bg-transparent focus:outline-none margin-0',
  type: 'number',
  placeholder: '0',
})<React.InputHTMLAttributes<HTMLInputElement>>`
  text-align: center;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;
