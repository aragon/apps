import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Badge} from '../badge';
import {Link} from '../link';
import {LinearProgress} from '../progress';
import {ButtonText} from '../button';
import {AlertInline} from '../alerts';

export type CardProposalProps = {
  title: string;
  description: string;
  /**
   * Allows the Dao Card component grow horizontally, thereby moving the switcher
   * button right.
   * */
  wide?: boolean;

  /** Handler for the switch button. Will be called when the button is clicked.
   * */
  onClick: () => void;
  state: 'draft' | 'pending' | 'active' | 'Succeeded' | 'Executed' | 'Defeated';
  voteProgress?: number | string;
  voteLabel?: string;
  tokenAmount?: string;
  tokenSymbol?: string;
};

export const CardProposal: React.FC<CardProposalProps> = ({
  wide = false,
  state = 'pending',
  title,
  description,
  voteProgress,
  voteLabel,
  tokenAmount,
  tokenSymbol,
  onClick,
}: CardProposalProps) => {
  const headerOptions: {
    [key in CardProposalProps['state']]: ReactNode;
  } = {
    draft: <Badge label="Draft" />,
    pending: (
      <>
        <Badge label="Pending" />
        <AlertInline label="Starts in x days y hours" />
      </>
    ),
    active: (
      <>
        <Badge label="Active" colorScheme={'info'} />
        <AlertInline label="x days y hours left" />
      </>
    ),
    Executed: <Badge label="Executed" colorScheme={'success'} />,
    Succeeded: <Badge label="Succeeded" colorScheme={'success'} />,
    Defeated: <Badge label="Defeated" colorScheme={'critical'} />,
  };

  const SelectButtonStatus = (state: CardProposalProps['state']) => {
    if (state in ['pending', 'Executed', 'Defeated']) {
      return (
        <ButtonText
          size="large"
          mode="secondary"
          label={'Read Proposal'}
          wide={!wide}
          bgWhite
          onClick={onClick}
        />
      );
    } else if (state === 'active') {
      return (
        <ButtonText
          size="large"
          mode="primary"
          label={'Vote now'}
          wide={!wide}
          onClick={onClick}
        />
      );
    } else if (state === 'Succeeded') {
      return (
        <ButtonText
          size="large"
          mode="primary"
          label={'Execute Now'}
          wide={!wide}
          onClick={onClick}
        />
      );
    } else {
      // Draft
      return (
        <ButtonText
          size="large"
          mode="secondary"
          label={'Edit Proposal'}
          wide={!wide}
          bgWhite
          onClick={onClick}
        />
      );
    }
  };

  return (
    <Card data-testid="cardProposal" wide={wide}>
      <Header>{headerOptions[state]}</Header>
      <TextContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Publisher>
          Published by <Link label="0x000....2345" />
        </Publisher>
      </TextContent>
      {state === 'active' && (
        <LoadingContent>
          <ProgressInfoWrapper>
            <ProgressTitle>Winning Option</ProgressTitle>
            <TokenAmount>
              {tokenAmount} {tokenSymbol}
            </TokenAmount>
          </ProgressInfoWrapper>
          <LinearProgress max={100} value={voteProgress} />
          <ProgressInfoWrapper>
            <Vote>{voteLabel}</Vote>
            <Percentage>{voteProgress}%</Percentage>
          </ProgressInfoWrapper>
        </LoadingContent>
      )}
      <Actions>{SelectButtonStatus(state)}</Actions>
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
