import React from 'react';
import styled from 'styled-components';
import {CardTransfer, CardTransferProps} from './cardTransfer';
import {CardToken} from './cardToken';
import {ButtonText} from '../button';

export type CardExecutionProps = CardTransferProps & {
  /**
   * Allows the Dao Card component grow horizontally, thereby moving the switcher
   * button right.
   * */
  wide?: boolean;

  /** Handler for the switch button. Will be called when the button is clicked.
   * */
  onClick?: () => void;
};

export const CardExecution: React.FC<CardExecutionProps> = ({
  to,
  from,
  toLabel,
  fromLabel,
  wide = false,
}: CardExecutionProps) => {
  return (
    <Card wide={wide}>
      <Header>
        <Title>Execution</Title>
        <Description>
          These smart actions are executed when the proposal reaches sufficient
          support. Find out which actions are executed.
        </Description>
      </Header>
      <Content>
        <CardTransfer {...{to, from, toLabel, fromLabel}} bgWhite />
        <CardToken
          tokenName={'DAI'}
          tokenImageUrl={
            'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png'
          }
          tokenSymbol={'DAI'}
          tokenCount={'15,000,230.2323'}
          treasuryShare={'$15,000,230.23'}
          tokenUSDValue={'1$'}
          bgWhite
        />
      </Content>
      <Action>
        <ButtonText label={'Execute Now'} />
      </Action>
    </Card>
  );
};

type CardProps = Pick<CardExecutionProps, 'wide'>;

const Card = styled.div.attrs(({wide}: CardProps) => ({
  className: `flex flex-col ${wide} bg-white 
  rounded-xl p-3 space-y-3`,
}))<CardProps>``;

const Header = styled.div.attrs({
  className: 'flex flex-col space-y-1',
})``;

const Title = styled.h2.attrs({
  className: 'text-ui-800 font-bold text-2xl',
})``;

const Description = styled.p.attrs({
  className: 'text-ui-600 font-normal text-normal',
})``;

const Content = styled.div.attrs({
  className: 'flex flex-col space-y-1.5',
})``;

const Action = styled.div.attrs({
  className: 'flex',
})``;
