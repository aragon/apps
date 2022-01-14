import React, {ReactNode} from 'react';
import styled from 'styled-components';
import {Badge} from '../badge';
import {Link} from '../link';
import {LinearProgress} from '../progress';
import {ButtonText} from '../button';
import {AlertInline} from '../alerts';
import {Address, shortenAddress} from '../../utils/addresses';

export type CardProposalProps = {
  /** Proposal Title / Title of the card */
  title: string;
  /** Proposal Description / Description of the card */
  description: string;
  /**
   * Will be called when the button is clicked.
   * */
  onClick: () => void;
  /**
   * Available states that proposal card have. by changing the status,
   * the headers & buttons wil change to proper format also the progress
   * section only available on active state.
   * */
  state: 'draft' | 'pending' | 'active' | 'succeeded' | 'executed' | 'defeated';
  /** The title that appears at the top of the progress bar */
  voteTitle: string;
  /** Progress bar value in percentage (max: 100) */
  voteProgress?: number | string;
  /** Vote label that appears at bottom of the progress bar */
  voteLabel?: string;
  /** Proposal token amount */
  tokenAmount?: string;
  /** Proposal token symbol */
  tokenSymbol?: string;
  /** Publish by sentence in any available languages */
  publishLabel: string;
  /** Publisher's ethereum address **or** ENS name */
  publisherAddress?: Address;
};

export const CardProposal: React.FC<CardProposalProps> = ({
  state = 'pending',
  title,
  description,
  voteTitle,
  voteProgress,
  voteLabel,
  tokenAmount,
  tokenSymbol,
  publishLabel,
  publisherAddress,
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
    executed: <Badge label="Executed" colorScheme={'success'} />,
    succeeded: <Badge label="Succeeded" colorScheme={'success'} />,
    defeated: <Badge label="Defeated" colorScheme={'critical'} />,
  };

  const SelectButtonStatus = (state: CardProposalProps['state']) => {
    if (['pending', 'executed', 'defeated'].includes(state)) {
      return (
        <StyledButton
          size="large"
          mode="secondary"
          label={'Read Proposal'}
          onClick={onClick}
          bgWhite
        />
      );
    } else if (state === 'active') {
      return (
        <StyledButton
          size="large"
          mode="primary"
          label={'Vote now'}
          onClick={onClick}
        />
      );
    } else if (state === 'succeeded') {
      return (
        <StyledButton
          size="large"
          mode="primary"
          label={'Execute Now'}
          onClick={onClick}
        />
      );
    } else {
      // Draft
      return (
        <StyledButton
          size="large"
          mode="secondary"
          label={'Edit Proposal'}
          onClick={onClick}
          bgWhite
        />
      );
    }
  };

  return (
    <Card data-testid="cardProposal">
      <Header>{headerOptions[state]}</Header>
      <TextContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Publisher>
          {publishLabel} <Link label={shortenAddress(publisherAddress || '')} />
        </Publisher>
      </TextContent>
      {state === 'active' && (
        <LoadingContent>
          <ProgressInfoWrapper>
            <ProgressTitle>{voteTitle}</ProgressTitle>
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

const Card = styled.div.attrs({
  className: 'flex justify-between flex-col bg-white rounded-xl p-3 space-y-3',
})``;

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

const StyledButton = styled(ButtonText).attrs({
  className: 'tablet:w-auto w-full',
})``;
