import React from 'react';
import styled from 'styled-components';

import {Button, IconButton, IconLinkExternal} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';

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
          onClick={() => window.open('http://www.google.com', '_blank')}
        />
      </HeaderContainer>
      {children}
      <SeeAllButton />
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
      <SeeAllButton />
    </>
  );
};

const SeeAllButton = () => {
  const {t} = useTranslation();
  return (
    <div>
      <Link to={'/governance'}>
        <Button mode={'ghost'} label={t('labels.seeAll')} />
      </Link>
    </div>
  );
};

const Title = styled.p.attrs({
  className: 'flex text-lg font-bold items-center',
})``;

const HeaderContainer = styled.div.attrs({
  className: 'flex justify-between content-center',
})``;
