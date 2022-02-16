import styled from 'styled-components';
import React, {ReactComponentElement} from 'react';

import {IconType} from '../icons';

export type ListItemMenuProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: ReactComponentElement<IconType>;
    label: string;
    parent: 'nav' | 'modal' | 'dropdown';
    selected?: boolean;
  };

export const ListItemMenu: React.FC<ListItemMenuProps> = ({
  icon,
  label,
  selected = false,
  ...props
}) => {
  return (
    <ListItemMenuContainer
      disabled={props.disabled}
      selected={selected}
      {...props}
    >
      <ContentContainer>
        <IconContainer
          parent={props.parent}
          selected={selected}
          disabled={props.disabled}
        >
          {icon}
        </IconContainer>
        <p>{label}</p>
      </ContentContainer>
    </ListItemMenuContainer>
  );
};

type SelectableVariant = Pick<ListItemMenuProps, 'parent'> & {
  selected: boolean;
};

type DisabledProps = {disabled?: boolean};

const ContentContainer = styled.div.attrs({
  className: 'flex gap-x-1.5 items-center',
})``;

const IconContainer = styled.div.attrs(
  ({disabled = false, parent, selected}: SelectableVariant & DisabledProps) => {
    const defaultClasses = 'w-2 h-2';
    if (parent === 'modal') return {className: defaultClasses};

    if (!selected || (selected && disabled))
      return {className: defaultClasses + ' hidden'};

    return {className: defaultClasses};
  }
)<SelectableVariant & DisabledProps>``;

const ListItemMenuContainer = styled.button.attrs(
  ({parent, selected}: SelectableVariant) => {
    let className =
      'py-1.5 px-2 font-bold rounded-xl hover:text-primary-500 ' +
      'focus:ring-2 focus:ring-primary-500 focus:outline-none ' +
      'active:text-primary-700 disabled:text-ui-300 ';

    switch (parent) {
      case 'dropdown':
        className += 'focus:bg-ui-0 disabled:bg-transparent ';
        selected
          ? (className += 'text-primary-500 bg-primary-50')
          : (className += 'text-ui-600');
        break;
      case 'modal':
        className += 'w-full focus:bg-ui-0 disabled:bg-ui-100 ';
        selected
          ? (className += 'text-primary-500 bg-ui-0')
          : (className += 'text-ui-600');
        break;
      case 'nav':
        className += 'focus:bg-ui-50 disabled:bg-transparent ';
        selected
          ? (className += 'text-primary-500 bg-ui-0')
          : (className += 'text-ui-600');
        break;
    }

    return {className};
  }
)<SelectableVariant>``;
