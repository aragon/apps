import React from 'react';
import styled from 'styled-components';
import Logo from 'public/coloredLogo.svg';
import Layout from 'app';

function Hero() {
  return (
    <Container>
      <ContentWrapper>
        <Title>EXPLORE THE DAO WORLD</Title>
        <Subtitle>
          Welcome to the Aragon Explore Portal. <br /> Take a look to the
          ecosystem,find inspiration and learn.
        </Subtitle>
      </ContentWrapper>
      <StyledImage src={Logo} />
    </Container>
  );
}

const Container = styled.div.attrs({
  className:
    'flex justify-between items-center bg-primary-400 h-55 overflow-hidden px-10',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'space-y-0.75 max-w-lg',
})``;

const Title = styled.h1.attrs({
  className: 'text-ui-0 font-bold text-6xl',
})``;

const Subtitle = styled.h3.attrs({
  className: 'text-ui-0 text-lg font-normal',
})``;

const StyledImage = styled.img.attrs({
  className: 'w-71 pt-19',
})``;

export default Hero;
