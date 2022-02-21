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

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  listItems,
}: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger data-testid="dropdown-trigger">
        {trigger}
      </DropdownMenu.Trigger>

      <StyledContent>
        <DropdownMenu.Group className="space-y-0.5">
          {listItems?.map(li => (
            <StyledItem
              key={li.component?.toString()}
              onSelect={li.callback}
              style={{}}
            >
              {li.component}
            </StyledItem>
          ))}
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
      </StyledContent>
    </DropdownMenu.Root>
  );
};

const StyledContent = styled(DropdownMenu.Content).attrs({
  className: 'bg-ui-0 rounded-lg p-2 shadow-xl' || undefined,
})``;

const StyledItem = styled(DropdownMenu.Item).attrs({
  className: 'rounded-xl focus-visible:outline-primary',
})``;
