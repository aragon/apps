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

type Props = {
  crumbs: Crumbs;
  process?: boolean;
  tag?: React.FunctionComponentElement<BadgeProps>;
};

export const Breadcrumbs: React.FC<Props> = props => {
  if (props.process) {
    return (
      <ProcessContainer>
        <ProcessCrumbContainer>
          <ButtonIcon icon={<IconChevronLeft />} mode="secondary" bgWhite />
          <p>{props.crumbs[0].label}</p>
          {props.tag}
        </ProcessCrumbContainer>
      </ProcessContainer>
    );
  }

  let isLast: boolean;
  return (
    <Container data-testid="breadcrumbs">
      {props.crumbs.map(({label, path}, index) => {
        isLast = index === props.crumbs.length - 1;
        return (
          <>
            <Crumb
              key={index}
              first={index === 0}
              label={label}
              last={isLast}
              path={path}
              tag={props.tag}
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
    'flex items-center py-0.5 desktop:px-2 space-x-1 ' +
    'desktop:space-x-1.5 h-5 desktop:h-6 desktop:bg-ui-0 desktop:rounded-xl',
})``;

const ProcessContainer = styled.div.attrs({
  className:
    'py-0.5 desktop:pr-2 desktop:pl-0.5 desktop:rounded-xl bg-ui-0 h-6',
})``;

const ProcessCrumbContainer = styled.div.attrs({
  className: 'flex items-center space-x-1.5 font-bold text-ui-600',
})``;
