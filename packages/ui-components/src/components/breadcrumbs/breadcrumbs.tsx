import React from 'react';
import styled from 'styled-components';

import Crumb from './crumb';
import {BadgeProps} from '../badge';
import {ButtonIcon} from '../button';
import {IconChevronLeft, IconChevronRight} from '../icons';

export type Crumbs = {
  label: string;
  path: string;
}[];

export type BreadcrumbsProps = {
  crumbs: Crumbs;
  process?: boolean;
  tag?: React.FunctionComponentElement<BadgeProps>;
  onClick?: (path: string) => void;
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  crumbs,
  process,
  tag,
  onClick,
}) => {
  if (process) {
    return (
      <ProcessContainer>
        <ProcessCrumbContainer>
          <ButtonIcon
            mode="secondary"
            icon={<IconChevronLeft />}
            onClick={() => onClick?.(crumbs[0].path)}
            bgWhite
          />
          <p>{crumbs[0].label}</p>
          {tag}
        </ProcessCrumbContainer>
      </ProcessContainer>
    );
  }

  let isLast: boolean;
  return (
    <Container data-testid="breadcrumbs">
      {crumbs.map(({label, path}, index) => {
        isLast = index === crumbs.length - 1;
        return (
          <>
            <Crumb
              key={index}
              first={index === 0}
              label={label}
              last={isLast}
              tag={tag}
              {...(isLast ? {} : {onClick: () => onClick?.(path)})}
            />
            {!isLast && <IconChevronRight className="text-ui-300" />}
          </>
        );
      })}
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'inline-flex items-center py-0.5 desktop:px-2 space-x-1 ' +
    'desktop:space-x-1.5 h-5 desktop:h-6 desktop:bg-ui-0 desktop:rounded-xl',
})``;

const ProcessContainer = styled.div.attrs({
  className:
    'inline-flex py-0.5 desktop:pr-2 desktop:pl-0.5 desktop:rounded-xl desktop:bg-ui-0 h-6',
})``;

const ProcessCrumbContainer = styled.div.attrs({
  className: 'flex items-center space-x-1.5 font-bold text-ui-600',
})``;
