import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {IconChevronRight} from '@aragon/ui-components';
import {BreadcrumbsRoute} from 'react-router-breadcrumbs-hoc';

type BreadcrumbsProps = {breadcrumbs: React.ReactNode[]};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({breadcrumbs}) => {
  const crumbs = breadcrumbs as BreadcrumbsRoute[];
  let isLast: boolean;
  return (
    <Container>
      {crumbs.map(({match, breadcrumb}, index) => {
        isLast = index === breadcrumbs.length - 1;

        return (
          <>
            <Label to={match.url} isLast={isLast}>
              {breadcrumb}
            </Label>
            {!isLast && <IconChevronRight />}
          </>
        );
      })}
    </Container>
  );
};

export default Breadcrumbs;

const Container = styled.div.attrs({
  className:
    'flex items-center py-1.5 px-2 space-x-1.5 text-ui-600 bg-ui-0 rounded-lg',
})``;

type LabelProps = {isLast: boolean};

const Label = styled(Link).attrs(({isLast}: LabelProps) => ({
  className: isLast ? 'text-ui-600 cursor-default' : 'text-primary-500',
}))<LabelProps>``;
