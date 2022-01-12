import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';
import {useButtonGroupContext} from './buttonGroup';

export type OptionProps = {
  value: string;
};

export const Option: React.FC<OptionProps> = ({value, children}) => {
  const {bgWhite, selectedValue, onChange} = useButtonGroupContext();

  return (
    <StyledButton
      isSelected={selectedValue === value}
      value={value}
      onClick={() => {
        if (onChange) {
          onChange(value);
        }
      }}
      bgWhite={bgWhite}
    >
      {children}
    </StyledButton>
  );
};

interface StyledButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSelected: boolean;
  bgWhite: boolean;
}

const StyledButton = styled.button.attrs(
  ({isSelected, bgWhite}: StyledButtonProps) => ({
    className: `flex-1 py-0.75 px-1.5 font-bold hover:text-primary-500 whitespace-nowrap
      ${
        isSelected
          ? bgWhite
            ? 'text-primary-500 bg-ui-0'
            : 'text-primary-500 bg-ui-50'
          : bgWhite
          ? 'bg-ui-50 text-ui-600'
          : 'bg-ui-0 text-ui-600'
      }`,
    style: {borderRadius: '0.625rem'},
  })
)<StyledButtonProps>``;
