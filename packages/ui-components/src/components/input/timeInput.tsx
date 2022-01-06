import React, {useRef} from 'react';
import styled from 'styled-components';
import {Radio, RadioGroup} from '../radioGroup';

export type TimeInputProps = {
  /** Changes a input's color schema */
  mode?: 'default' | 'success' | 'warning' | 'critical';
  disabled?: boolean;
};

export const TimeInput: React.FC<TimeInputProps> = ({
  mode = 'default',
  disabled,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container data-testid="number-input" {...{mode, disabled}}>
      <StyledTimeInput {...props} ref={inputRef} disabled={disabled} />
      <RadioGroup defaultValue={'AM'}>
        <Radio value="AM">AM</Radio>
        <Radio value="PM">PM</Radio>
      </RadioGroup>
    </Container>
  );
};

export type StyledContainerProps = Pick<TimeInputProps, 'mode' | 'disabled'>;

const Container = styled.div.attrs(({mode, disabled}: StyledContainerProps) => {
  let className = `${
    disabled ? 'bg-ui-100' : 'bg-ui-0'
  } flex px-2 py-1.5 bg-ui-0 w-22 focus:outline-none items-center
    focus-within:ring-2 focus-within:ring-primary-500
    rounded-xl hover:border-ui-300 border-2 active:border-primary-500
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

const StyledTimeInput = styled.input.attrs({
  className: 'w-full bg-transparent focus:outline-none margin-0',
  type: 'time',
  placeholder: '0',
})<React.InputHTMLAttributes<HTMLInputElement>>`
  ::-webkit-calendar-picker-indicator {
    display: none;
  }
  ::-webkit-datetime-edit-ampm-field {
    display: none;
  }
`;
