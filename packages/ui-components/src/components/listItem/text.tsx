import React, {ButtonHTMLAttributes} from 'react';
import styled from 'styled-components';
import {IconType} from '../icons';

type CustomButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>;
export type ListItemTextProps = CustomButton & {
  /**
   * State that can be explisitely set by the client. These are mutually
   * exclusive. Default behaves like a normal UI element and will hover, focus,
   * etc. automatically. Disabled will disable the ui component, selected will
   * mark it selected.
   */
  mode: 'default' | 'disabled' | 'selected';
  title: string;
  subtitle?: string;
  iconLeft?: React.FunctionComponentElement<IconType>;
  iconRight?: React.FunctionComponentElement<IconType>;
};

export const ListItemText: React.FC<ListItemTextProps> = ({
  mode,
  title,
  subtitle,
  iconLeft,
  iconRight,
  ...props
}) => {
  return (
    <Container mode={mode} {...props}>
      <LeftContent>
        {iconLeft && <span>{iconLeft}</span>}
        {/* This could be done with label. However, I can't get the label to
          inherit the color (for example, when selected mode is on) */}
        <LabelContainer>
          <p className="font-bold">{title}</p>
          {subtitle && <p className="text-sm">{subtitle}</p>}
        </LabelContainer>
      </LeftContent>
      <div>{iconRight && <span>{iconRight}</span>}</div>
    </Container>
  );
};

type InputContainerProps = Pick<ListItemTextProps, 'mode'>;

const Container = styled.button.attrs(({mode}: InputContainerProps) => {
  const baseLayoutClasses = 'flex justify-between items-center w-full';
  const baseStyleClasses = 'py-1.5 px-2 rounded-xl font-normal';
  let className = `${baseLayoutClasses} ${baseStyleClasses}`;

  switch (mode) {
    case 'disabled':
      className += ' bg-ui-100 text-ui-300 border-ui-200';
      break;
    case 'selected':
      className += ' bg-ui-0 text-primary-500 border-primary-500';
      break;
    default:
      {
        const focusClasses =
          'focus:outline-none focus:ring-2 focus:ring-primary-500';
        const hoverClasses = 'hover:text-primary-500';
        const activeClasses =
          'active:bg-ui-100 active:outline-none active:ring-0';
        className += ` bg-ui-50 text-ui-600 ${activeClasses} ${focusClasses} ${hoverClasses} `;
      }
      break;
  }
  const disabled: boolean = mode === 'disabled';
  return {className, disabled};
})<CustomButton>``;

const LabelContainer = styled.div.attrs({className: 'text-left'})``;
const LeftContent = styled.div.attrs({
  className: 'flex items-center space-x-2',
})``;
