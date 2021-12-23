import React from 'react';
import styled from 'styled-components';

export interface CardTextProps {
  title: string;
  content: string;
}

const CardText: React.FC<CardTextProps> = ({title, content}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <p>{content}</p>
    </Container>
  );
};

export default CardText;

const Container = styled.div.attrs({
  className: 'p-2 font-normal rounded-xl bg-ui-0 space-y-0.25 text-ui-600',
})``;

const Title = styled.p.attrs({
  className: 'text-sm font-bold text-ui-500',
})``;
