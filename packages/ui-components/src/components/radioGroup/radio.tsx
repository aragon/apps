import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';
import {useRadioGroupContext} from '.';

type RadioProps = {
  value: string;
};

export const Radio: React.FC<RadioProps> = ({value, children}) => {
  const {selectedValue, onChange} = useRadioGroupContext();

  return (
    <StyledRadioButton
      active={selectedValue === value}
      value={value}
      onClick={() => onChange(value)}
    >
      {children}
    </StyledRadioButton>
  );
};

interface StyledRadioButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
}

const StyledRadioButton = styled.button.attrs(
  ({active}: StyledRadioButtonProps) => ({
    className: `p-1 font-bold ${
      active ? 'bg-ui-0 text-primary-500' : 'text-ui-500'
    }`,
    style: {borderRadius: '0.625rem', minWidth: '4rem'},
  })
)<StyledRadioButtonProps>``;
