import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import React from 'react';
import styled from 'styled-components';

export type ListItemProps = {
  component: React.ReactNode;
  callback: (event: Event) => void;
};

export type CustomDropdownContentProps = Omit<
  DropdownMenu.DropdownMenuContentProps,
  'asChild' | '__scopeDropdownMenu'
>;

export type DropdownProps = CustomDropdownContentProps & {
  trigger: React.ReactNode;
  listItems: ListItemProps[];
};

export const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{props.trigger}</DropdownMenu.Trigger>

      <StyledContent {...(props as CustomDropdownContentProps)}>
        <DropdownMenu.Group>
          {props.listItems.map(li => (
            <DropdownMenu.Item onSelect={li.callback}>
              {li.component}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
      </StyledContent>
    </DropdownMenu.Root>
  );
};

const StyledContent = styled(DropdownMenu.Content).attrs(
  (props: CustomDropdownContentProps) => {
    const className: string | undefined = 'bg-ui-0 rounded-lg p-1.5 shadow-xl';
    return {className};
  }
)``;
