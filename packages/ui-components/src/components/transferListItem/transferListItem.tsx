import React from 'react';
import styled from 'styled-components';

import {IconChevronRight} from '../icons';

export type TransferListItemProps = {
  isPending?: boolean;
  /**
   * Transfer title corresponding to the transfer reference or transfer type
   */
  title: string;
  /**
   * Number of tokens transferred
   */
  tokenAmount: string | number;
  tokenSymbol: string;
  /**
   * Date transfer was executed or a loading indication if transfer is still pending
   */
  transferDate: string;
  transferType: 'Deposit' | 'Withdraw'; // TODO: Investigate proper smartcontract transfer type
  usdValue: string;
  onClick?: () => void;
};

// TOOD: investigate transfer to determine when transfer is pending
// (no date perhaps ? or custom check on resolved promise ?)
export const TransferListItem: React.FC<TransferListItemProps> = ({
  isPending = false,
  title,
  tokenAmount,
  tokenSymbol,
  transferDate,
  usdValue,
  onClick,
}) => {
  return (
    <Container data-testid="transferListItem" onClick={onClick}>
      {/* TODO: Replace placeholder with appropriate icons */}

      {isPending ? (
        <div className="w-3 h-3 border desktop:w-5 desktop:h-5">...</div>
      ) : (
        <div className="w-3 h-3 border desktop:w-5 desktop:h-5" />
      )}
      <Content>
        <Title>{title}</Title>
        <Date>{transferDate}</Date>
      </Content>
      <Value>
        <USDValue>{usdValue}</USDValue>
        <TokenAmount>{`${tokenAmount} ${tokenSymbol}`}</TokenAmount>
      </Value>
      <IconChevronRight className="text-ui-300 group-hover:text-primary-500" />
    </Container>
  );
};

const Container = styled.button.attrs({
  className:
    'group w-full px-2 desktop:px-3 py-1.5 desktop:py-2.5 bg-ui-0 rounded-xl flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary-500 active:bg-ui-100',
})``;

const Content = styled.div.attrs({
  className: 'flex-1 text-left',
})``;

const Title = styled.p.attrs({
  className: 'font-bold text-ui-800 group-hover:text-primary-500',
})``;

const Date = styled.p.attrs({
  className: 'text-sm text-ui-500',
})``;

const Value = styled.div.attrs({
  className: 'text-right',
})``;

const USDValue = styled.p.attrs({
  className: 'font-bold text-ui-800',
})``;

const TokenAmount = styled.p.attrs({
  className: 'text-sm text-ui-500',
})``;
