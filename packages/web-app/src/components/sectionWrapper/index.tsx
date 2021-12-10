import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {
  Button,
  IconButton,
  IconLinkExternal,
  IconAdd,
} from '@aragon/ui-components';

import {AllTokens, AllTransfers} from 'utils/paths';

export type SectionWrapperProps = {
  title: string;
  children: React.ReactNode;
};

export type PageWrapperProps = SectionWrapperProps & {
  buttonLabel: string;
  subtitle: string;
  onClick?: () => void;
};

// NOTE: It's possible to merge these two components. But I'm not sure it makes
// things any simpler right now. However, if other sections wrappers like these
// are added in the future and all have similar style, feel free to merge them.

/**
 * finance Page wrapper. Consists of a header with a title and a
 * icon button.
 */
export const PageWrapper = ({
  title,
  children,
  buttonLabel,
  subtitle,
  onClick,
}: PageWrapperProps) => {
  return (
    <>
      <HeaderContainer>
        <ContentWrapper>
          <PageTitle>{title}</PageTitle>
          <PageSubtitle>{subtitle}</PageSubtitle>
        </ContentWrapper>
        <ActionWrapper>
          <IconButton
            mode="primary"
            size="default"
            side="left"
            label={buttonLabel}
            icon={<IconAdd />}
            onClick={onClick}
          />
        </ActionWrapper>
      </HeaderContainer>
      {children}
    </>
  );
};

/**
 * Section wrapper for tokens overview. Consists of a header with a title and a
 * button, as well as a footer with a button that takes the user to the token
 * overview. and a list of tokens (the children).
 *
 * NOTE: The wrapper imposes NO SPACING. It's entirely up to the children to
 * define this.
 */
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
      <SeeAllButton path={AllTokens} />
    </>
  );
};

/**
 * Section wrapper for transfer overview. Consists of a header with a title, as
 * well as a footer with a button that takes the user to the token overview. and
 * a list of transfers (the children).
 *
 * NOTE: The wrapper imposes NO SPACING. It's entirely up to the children to
 * define this.
 */
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
      <SeeAllButton path={AllTransfers} />
    </>
  );
};

type SeeAllButtonProps = {
  path: string;
};
const SeeAllButton = ({path}: SeeAllButtonProps) => {
  const {t} = useTranslation();
  return (
    <div>
      <Link to={path}>
        <Button mode={'ghost'} label={t('labels.seeAll')} />
      </Link>
    </div>
  );
};

const ContentWrapper = styled.div.attrs({
  className: 'flex flex-col',
})``;

const Title = styled.p.attrs({
  className: 'flex text-lg font-bold items-center',
})``;

const PageTitle = styled.p.attrs({
  className: 'flex text-lg font-bold items-center text-3xl text-ui-800',
})``;

const PageSubtitle = styled.p.attrs({
  className: 'flex text-lg items-center text-lg text-ui-600',
})``;

const ActionWrapper = styled.div.attrs({
  className: 'h-100', // Fix button relative height
})``;

const HeaderContainer = styled.div.attrs({
  className: 'flex justify-between content-center',
})``;
