import React from 'react';
import styled from 'styled-components';
import {Badge} from '../badge';

export type CardProposalProps = {
  /**
   * Allows the Dao Card component grow horizontally, thereby moving the switcher
   * button right.
   * */
  wide?: boolean;

  /** Handler for the switch button. Will be called when the button is clicked.
   * */
  onClick: () => void;
};

export const CardProposal: React.FC<CardProposalProps> = ({
  onClick,
  wide = false,
}: CardProposalProps) => {
  return (
    <Card data-testid="cardProposal" wide={wide} onClick={onClick}>
      <Badge label="Draft" />
    </Card>
  );
};

type CardProps = Pick<CardProposalProps, 'wide'>;

const Card = styled.div.attrs(({wide}: CardProps) => ({
  className: ` ${wide ? 'flex justify-between' : 'inline-flex'} 
  bg-ui-0 items-center rounded-xl`,
}))<CardProps>``;
