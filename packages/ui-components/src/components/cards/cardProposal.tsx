import React from 'react';
import styled from 'styled-components';
import {Badge} from '../badge';
import {Link} from '../link';
import {LinearProgress} from '../progress';
import {ButtonText} from '../button';
import {AlertInline} from '../alerts';

export type CardProposalProps = {
  /**
   * Allows the Dao Card component grow horizontally, thereby moving the switcher
   * button right.
   * */
  wide?: boolean;

  /** Handler for the switch button. Will be called when the button is clicked.
   * */
  onClick: () => void;
  state: 'draft' | 'pending' | 'active' | 'Succeeded' | 'Executed' | 'Defeated';
};

export const CardProposal: React.FC<CardProposalProps> = ({
  wide = false,
}: CardProposalProps) => {
  return (
    <Card data-testid="cardProposal" wide={wide}>
      <Header>
        <Badge label="Draft" />
        <AlertInline label="Starts in x days y hours" />
      </Header>
      <TextContent>
        <Title>Title</Title>
        <Description>Description</Description>
        <Publisher>
          Published by <Link label="0x000....2345" />
        </Publisher>
      </TextContent>
      <LoadingContent>
        <ProgressInfoWrapper>
          <ProgressTitle>Winning Option</ProgressTitle>
          <TokenAmount>3.5M DNT</TokenAmount>
        </ProgressInfoWrapper>
        <LinearProgress max={100} value={70} />
        <ProgressInfoWrapper>
          <Vote>Yes</Vote>
          <Percentage>70%</Percentage>
        </ProgressInfoWrapper>
      </LoadingContent>
      <Actions>
        <ButtonText label={'Vote now'} size="large" wide={!wide} />
      </Actions>
    </Card>
  );
};

type CardProps = Pick<CardProposalProps, 'wide'>;

const Card = styled.div.attrs(({wide}: CardProps) => ({
  className: `${
    wide ? 'flex justify-between' : 'w-84'
  } flex-col bg-white rounded-xl p-3 space-y-3`,
}))<CardProps>``;

const Header = styled.div.attrs({
  className: 'flex space-y-1 justify-between',
})``;

const Title = styled.h2.attrs({
  className: 'text-ui-800 font-bold text-xl',
})``;

const Description = styled.p.attrs({
  className: 'text-ui-600 font-normal text-base',
})``;

const Publisher = styled.span.attrs({
  className: 'text-ui-500 text-sm',
})``;

const TextContent = styled.div.attrs({
  className: 'flex flex-col space-y-1.5',
})``;

const LoadingContent = styled.div.attrs({
  className: 'flex flex-col space-y-2',
})``;

const ProgressInfoWrapper = styled.div.attrs({
  className: 'flex justify-between',
})``;

const ProgressTitle = styled.h3.attrs({
  className: 'text-ui-800 text-base font-bold',
})``;

const TokenAmount = styled.span.attrs({
  className: 'text-ui-500 text-sm',
})``;

const Vote = styled.span.attrs({
  className: 'text-primary-500 font-bold text-base',
})``;

const Percentage = styled.span.attrs({
  className: 'text-primary-500 font-bold text-base',
})``;

const Actions = styled.div.attrs({
  className: 'flex',
})``;
