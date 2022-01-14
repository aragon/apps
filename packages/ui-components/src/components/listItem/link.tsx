import React from 'react';
import styled from 'styled-components';

import {IconLinkExternal} from '../icons';

export type ListItemLinkProps =
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    /**
     * Optional link item label
     */
    label?: string;
    /**
     * Whether link opens up external page
     */
    external?: boolean;
  };

export const ListItemLink: React.FC<ListItemLinkProps> = ({
  external = true,
  ...props
}) => {
  return (
    <Container>
      <Link
        rel="noopener noreferrer"
        {...props}
        {...(external ? {target: '_blank'} : {})}
        data-testid="listItem-link"
      >
        <TitleContainer>
          <Title>{props.label ? props.label : props.href}</Title>
          <IconLinkExternal className="w-1.5 h-1.5" />
        </TitleContainer>
        {props.label && <Subtitle>{props.href}</Subtitle>}
      </Link>
    </Container>
  );
};

const Container = styled.div.attrs({
  className: 'w-full',
})``;

const Link = styled.a.attrs({
  className: 'space-y-0.5' as string | undefined,
})``;

const TitleContainer = styled.div.attrs({
  className: 'flex items-center space-x-1 font-bold text-primary-500',
})``;

const Title = styled.p.attrs({
  className: 'truncate',
})``;

const Subtitle = styled.p.attrs({
  className: 'text-sm text-ui-500 truncate',
})``;
