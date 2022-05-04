import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '@aragon/ui-components';
import useScreen from 'hooks/useScreen';

type Props = {
  // temporary property, to be removed once all actions available
  actionAvailable?: boolean;
  actionLabel: string;
  className?: string;
  path: string;
  imgSrc: string;
  onClick: (path: string) => void;
  subtitle: string;
  title: string;
};

const CTACard: React.FC<Props> = props => {
  const {isDesktop} = useScreen();

  return (
    <CTACardWrapper className={props.className}>
      <Content>
        <ImgWrapper>
          <img src={props.imgSrc} />
        </ImgWrapper>
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
      </Content>

      <ButtonText
        size="large"
        label={props.actionLabel}
        {...(props.actionAvailable
          ? {mode: 'primary'}
          : {mode: 'ghost', disabled: true})}
        onClick={() => props.onClick(props.path)}
        className={`${!isDesktop && 'w-full'}`}
      />
    </CTACardWrapper>
  );
};

export default CTACard;

const CTACardWrapper = styled.div.attrs({
  className:
    'flex flex-col desktop:items-start items-center p-3 space-y-3 rounded-xl relative desktop:m-0 mb-3 mx-1' as string,
})`
  background: rgba(255, 255, 255, 0.68);
  backdrop-filter: blur(50px);
`;

const Content = styled.div.attrs({
  className:
    'flex desktop:items-start items-center flex-col space-y-2 desktop:m-0 mb-3',
})``;

const Title = styled.p.attrs({
  className: 'desktop:text-2xl text-xl font-bold text-ui-800',
})``;

const Subtitle = styled.p.attrs({
  className: 'text-ui-600 h-9 text-base',
})``;

const ImgWrapper = styled.div.attrs({
  className: 'flex align-items-center desktop:h-10 h-14 pr-2',
})``;
