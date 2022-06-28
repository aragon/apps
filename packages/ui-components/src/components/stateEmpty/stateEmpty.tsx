import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '../button';
import {IllustrationHuman, IlluHumanProps} from '../illustrations';

type ButtonProps = {
  label: string;
  onClick: () => void;
};

export type StateEmptyProps = IlluHumanProps & {
  title: string;
  description?: string;
  primaryButton: ButtonProps;
  secondaryButton?: ButtonProps;
  renderHtml?: boolean;
};

export const StateEmpty: React.FC<StateEmptyProps> = ({
  body,
  expression,
  hair,
  sunglass,
  accessory,
  title,
  description,
  primaryButton,
  secondaryButton,
  renderHtml = false,
}) => {
  return (
    <Card>
      <IllustrationHuman
        {...{body, expression, hair, sunglass, accessory}}
        height={225}
        width={400}
      />
      <TextWrapper>
        <Title>{title}</Title>
        {renderHtml ? (
          <Description dangerouslySetInnerHTML={{__html: description || ''}} />
        ) : (
          <Description>{description}</Description>
        )}
      </TextWrapper>
      <ActionContainer>
        <ButtonText
          label={primaryButton.label}
          onClick={primaryButton.onClick}
          size="large"
        />
        {secondaryButton && (
          <ButtonText
            label={secondaryButton.label}
            onClick={secondaryButton.onClick}
            mode="ghost"
            size="large"
          />
        )}
      </ActionContainer>
    </Card>
  );
};

const Card = styled.div.attrs({
  className:
    'flex flex-col items-center justify-center bg-ui-0 rounded-xl p-3 pb-6 desktop:p-6 w-full space-y-3 border',
})``;

const TextWrapper = styled.div.attrs({
  className: 'space-y-2 text-center',
})``;

const ActionContainer = styled.div.attrs({
  className:
    'flex desktop:flex-row flex-col space-y-1.5 desktop:space-y-0 space-x-0 desktop:space-x-3',
})``;

const Title = styled.h2.attrs({
  className: 'ft-text-xl font-bold text-ui-800',
})``;

const Description = styled.p.attrs({
  className: 'text-ui-500 text-sm desktop:text-base',
})`
  & > a {
    color: #003bf5;
    font-weight: 700;
`;
