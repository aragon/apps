import React from 'react';
import styled from 'styled-components';

type CardWithImageProps = {
  caption: string;
  title: string;
  subtitle: string;
};

const CardWithImage: React.FC<CardWithImageProps> = ({
  caption,
  title,
  subtitle,
}) => {
  return (
    <Container>
      {/* TODO: Change this url to an imported local image */}
      <ImageContainer src="https://source.unsplash.com/sqdY_rJg8wg" />
      <VStack>
        <Caption>{caption}</Caption>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </VStack>
    </Container>
  );
};

export default CardWithImage;

const Container = styled.div.attrs({
  className: 'flex-1 p-3 rounded-xl bg-ui-0',
})``;

const ImageContainer = styled.img.attrs({
  className: 'object-cover mb-2 rounded-xl w-full',
})<React.ImgHTMLAttributes<HTMLImageElement>>`
  height: 160px;

  @media (min-width: 768px) {
    height: 240px;
  }
`;

const VStack = styled.div.attrs({
  className: 'space-y-0.25',
})``;

const Caption = styled.div.attrs({
  className: 'text-sm text-ui-500',
})``;

const Title = styled.div.attrs({
  className: 'font-bold text-ui-800',
})``;

const Subtitle = styled.div.attrs({
  className: 'text-sm text-ui-600',
})``;
