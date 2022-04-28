import React from 'react';
import styled from 'styled-components';

import IconLogo from 'public/iconLogo.svg';
import Green from 'public/greenGradient.svg';
import Purple from 'public/purpleGradient.svg';
import {EXPLORE_NAV_LINKS} from 'utils/constants';
import {PRIVACY_NAV_LINKS} from 'utils/constants';

const Footer: React.FC = () => {
  const ExploreNavLinks = EXPLORE_NAV_LINKS.map(item => (
    <li key={item.label}>
      <NavItem>{item.label}</NavItem>
    </li>
  ));

  const PrivacyNavLinks = PRIVACY_NAV_LINKS.map(item => (
    <li key={item.label}>
      <NavItem>{item.label}</NavItem>
    </li>
  ));

  return (
    <Container>
      <GradientWrapper>
        <GradientLeft src={Green} />
        <GradientRight src={Purple} />
      </GradientWrapper>
      <ActionsContainer>
        <ActionItemsWrapper>
          <LogoContainer src={IconLogo} />
          <StyledNavList>{ExploreNavLinks}</StyledNavList>
        </ActionItemsWrapper>
        <ActionItemsWrapper>
          <StyledNavList>{PrivacyNavLinks}</StyledNavList>
          <Copyright>©{`  ${new Date().getFullYear()}  `}Aragon</Copyright>
        </ActionItemsWrapper>
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'bottom-0 col-span-full bg-primary-400 relative overflow-hidden desktop:h-11 h-40',
})``;

const ActionsContainer = styled.div.attrs({
  className:
    'flex desktop:flex-row flex-col space-y-4 desktop:space-y-0 absolute desktop:h-full top-0 justify-between items-center px-5 w-full py-4 desktop:py-0',
})``;

const ActionItemsWrapper = styled.div.attrs({
  className:
    'flex desktop:flex-row flex-col items-center justify-center desktop:space-x-4 space-y-4 desktop:space-y-0',
})``;

const GradientLeft = styled.img.attrs({
  className: 'h-40 -mt-12 -ml-8',
})``;

const GradientRight = styled.img.attrs({
  className: 'desktop:h-40 h-30 -mt-12 -mr-7',
})``;

const GradientWrapper = styled.div.attrs({
  className: 'flex justify-between desktop:flex-row flex-col',
})``;

const LogoContainer = styled.img.attrs({
  className: 'h-5',
})``;

const StyledNavList = styled.ul.attrs({
  className: 'flex space-x-4 items-center justify-center',
})``;

const NavItem = styled.button.attrs({
  className: 'text-ui-0',
})``;

const Copyright = styled.span.attrs({
  className: 'text-ui-0 font-normal',
})``;

export default Footer;
