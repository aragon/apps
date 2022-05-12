import React from 'react';
import styled from 'styled-components';

import IconLogo from 'public/iconLogo.svg';
import Green from 'public/greenGradient.svg';
import Purple from 'public/purpleGradient.svg';
import {EXPLORE_NAV_LINKS, PRIVACY_NAV_LINKS} from 'utils/constants';

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
    <Container data-testid="footer">
      <GradientContainer>
        <GradientWrapper>
          <GradientGreen src={Green} />
          <GradientPurple src={Purple} />
        </GradientWrapper>
      </GradientContainer>
      <ActionsContainer>
        <ActionItemsWrapper>
          <LogoContainer src={IconLogo} />
          <StyledNavList>{ExploreNavLinks}</StyledNavList>
        </ActionItemsWrapper>
        <ActionItemsWrapper>
          <StyledNavList>{PrivacyNavLinks}</StyledNavList>
          <Copyright>&copy;{`  ${new Date().getFullYear()}  `}Aragon</Copyright>
        </ActionItemsWrapper>
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.div.attrs({
  className:
    'bottom-0 col-span-full bg-primary-400 overflow-hidden desktop:h-11 h-35 absolute w-full',
})``;

const ActionsContainer = styled.div.attrs({
  className:
    'flex desktop:flex-row flex-col space-y-4 desktop:space-y-0 h-full desktop:justify-between justify-center items-center px-5 w-full desktop:py-0 relative',
})``;

const ActionItemsWrapper = styled.div.attrs({
  className:
    'flex desktop:flex-row flex-col items-center justify-center desktop:space-x-4 space-y-4 desktop:space-y-0',
})``;

const GradientGreen = styled.img.attrs({
  className: 'h-50 absolute -top-16 -left-16',
})``;

const GradientPurple = styled.img.attrs({
  className: 'desktop:h-40 h-30 absolute -right-5 desktop:-top-11 top-16',
})``;

const GradientContainer = styled.div.attrs({
  className: 'flex justify-between desktop:flex-row flex-col',
})``;

const GradientWrapper = styled.div.attrs({
  className: 'relative w-full h-full',
})``;

const LogoContainer = styled.img.attrs({
  className: 'h-5',
})``;

const StyledNavList = styled.ul.attrs({
  className: 'flex space-x-4 items-center justify-center',
})``;

// Used button instead of links because not sure the navigation is internal or not!
const NavItem = styled.button.attrs({
  className: 'text-ui-0',
})``;

const Copyright = styled.span.attrs({
  className: 'text-ui-0 font-normal',
})``;

export default Footer;
