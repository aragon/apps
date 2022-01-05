import React from 'react';
import styled from 'styled-components';
import {IconCalendar} from '../icons';
import {TextInput} from './textInput';

export type DateInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const DateInput: React.FC<DateInputProps> = ({disabled, ...props}) => {
  const v = '2022-04-20';
  const d = true;
  return (
    <InputContainer disabled={d} value="2022-04-20">
      <StyledInput type={'date'} value={v} required disabled={d} {...props} />
      {/* I know this should be a button BUT IT'S STUPID */}
      {/* TODO make this clickable */}
      <IconContainer disabled={d}>
        <IconCalendar />
      </IconContainer>
    </InputContainer>
  );
};

type InputContainerProps = Pick<DateInputProps, 'disabled'>;

const InputContainer = styled.div.attrs(({disabled}: InputContainerProps) => {
  const baseClasses =
    'flex items-center py-1.5 px-2 rounded-xl border-2 font-normal';
  let className: string = `${baseClasses}`;

  if (disabled) {
    className += ' bg-ui-100 text-ui-300 border-ui-200';
  } else {
    const focusClasses =
      'focus:outline-none focus:ring-2 focus:ring-primary-500';
    const hoverClasses = 'hover:border-ui-300';
    const activeClasses = 'active:border-primary-500';
    className += ` bg-ui-0 text-ui-600 ${focusClasses} ${hoverClasses} ${activeClasses}`;
  }
  return {className, disabled};
})<DateInputProps>``;

const StyledInput = styled.input.attrs(() => {
  const baseClasses = 'w-full bg-transparent focus:outline-none';
  let className: string = `${baseClasses}`;

  return {className};
})<DateInputProps>``;

const IconContainer = styled.div.attrs(({disabled}: InputContainerProps) => {
  return {className: ` p-1 rounded-xl ${disabled ? 'bg-ui-100' : 'bg-ui-50'}`};
})<DateInputProps>``;

/* OLD ====================================================================== */

const StyledInput1 = styled.input.attrs(({disabled}: InputContainerProps) => {
  const type: string = 'date';
  const baseClasses = 'py-1.5 px-2 rounded-xl border-2 border-ui-100';
  const textClasses = 'text-ui-600 font-normal';
  const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-primary-500';
  const hoverClasses = 'hover:border-ui-300';
  const activeClasses = 'active:border-primary-500';
  const disabledClasses = 'disabled:bg-ui-200';
  let className: string = `${baseClasses} ${textClasses}`;

  if (disabled) {
    className += ` ${disabledClasses}`;
  } else {
    className += ` ${focusClasses} ${hoverClasses} ${activeClasses}`;
  }
  return {type, className, disabled};
})<DateInputProps>``;
