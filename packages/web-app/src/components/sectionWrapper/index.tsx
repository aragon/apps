import React from 'react';
import styled from 'styled-components';

import {Button, IconButton, IconLinkExternal} from '@aragon/ui-components';

export type SectionWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export const TokenSectionWrapper = ({title, children}: SectionWrapperProps) => {
  return (
    <>
      <HeaderContainer>
        <Title>{title}</Title>
        <IconButton
          mode="ghost"
          size="small"
          side="right"
          label={'See on Explorer'}
          icon={<IconLinkExternal />}
          onClick={() => (window.location.href = 'google.com')}
        />
      </HeaderContainer>
      {children}
      <Button mode={'ghost'} label={'See all'} />
    </>
  );
};

export const TransferSectionWrapper = ({
  title,
  children,
}: SectionWrapperProps) => {
  return (
    <>
      <HeaderContainer>
        <Title>{title}</Title>
      </HeaderContainer>
      {children}
      <Button mode={'ghost'} label={'See all'} />
    </>
  );
};

const Title = styled.p.attrs({
  className: 'text-lg font-bold',
})``;

const HeaderContainer = styled.div.attrs({
  className: 'flex justify-between',
})``;
