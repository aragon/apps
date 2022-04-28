import React from 'react';
import styled from 'styled-components';
import Logo from 'public/coloredLogo.svg';
import Green from 'public/circleGreenGradient.svg';
import Purple from 'public/purpleGradient.svg';

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
      <div className="h-full">
        <StyledImage src={Logo} />
      </div>
      <div className="absolute top-64 desktop:top-20 right-0 desktop:-right-2.5">
        <GradientLeft src={Green} />
        <GradientRight src={Purple} />
      </div>
    </Container>
  );
}

const Container = styled.div.attrs({
  className:
    'flex justify-between bg-primary-400 h-55 overflow-hidden desktop:px-10 px-2 relative',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'desktop:space-y-0.75 space-y-1 max-w-lg pt-4.5',
})``;

const Title = styled.h1.attrs({
  className:
    'text-ui-0 font-bold desktop:text-6xl text-4xl desktop:text-left text-center',
})``;

const Subtitle = styled.h3.attrs({
  className:
    'text-ui-0 text-lg font-normal text-center desktop:text-left text-center',
})``;

const StyledImage = styled.img.attrs({
  className: 'w-71 hidden desktop:block',
})``;

const GradientLeft = styled.img.attrs({
  className: 'h-40 desktop:-mt-12 -mt-36 desktop:-ml-63 -ml-44',
})``;

const GradientRight = styled.img.attrs({
  className: 'desktop:h-40 h-30 desktop:-mt-12 -mt-36 desktop:-mr-7',
})``;

export default Hero;
