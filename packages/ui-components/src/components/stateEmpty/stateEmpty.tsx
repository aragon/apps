import React from 'react';
import styled from 'styled-components';
import {ButtonText} from '../button';
import {IllustrationHuman, IlluHumanProps} from '../illustrations';

export type StateEmptyProps = IlluHumanProps & {
  title: string;
  description?: string;
  buttonLabelPrimary: string;
  buttonLabelSecondary?: string;
};

export const StateEmpty: React.FC<StateEmptyProps> = ({
  body,
  expression,
  hair,
  sunglass,
  accessory,
  title,
  description,
  buttonLabelPrimary,
  buttonLabelSecondary,
}) => {
  return (
    <Card>
      <ContentWrapper>
        <SVGWrapper>
          <IllustrationHuman
            {...{body, expression, hair, sunglass, accessory}}
            height={225}
            width={400}
          />
        </SVGWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <ActionContainer>
          <ButtonText label={buttonLabelPrimary} size="large" />
          {buttonLabelSecondary && (
            <ButtonText
              label={buttonLabelSecondary}
              mode="ghost"
              size="large"
            />
          )}
        </ActionContainer>
      </ContentWrapper>
    </Card>
  );
};

const Card = styled.div.attrs({
  className:
    'flex items-center justify-center bg-ui-0 rounded-xl p-3 desktop:p-6 w-full mb-5',
})``;

const ContentWrapper = styled.div.attrs({
  className: 'flex items-center flex-col',
})`
  max-width: 560px;
`;

const SVGWrapper = styled.div.attrs({
  className: 'flex items-center justify-center mb-3',
})`
  height: 225px;
  width: 400px;
`;

const ActionContainer = styled.div.attrs({
  className:
    'flex desktop:flex-row flex-col space-y-1.5 desktop:space-y-0 space-x-0 desktop:space-x-3',
})``;

const Title = styled.h2.attrs({
  className: 'text-xl font-bold text-ui-800 mb-1.5',
})``;

const Description = styled.p.attrs({
  className: 'text-ui-500 text-sm mb-3',
})``;
