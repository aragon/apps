import React from 'react';
import styled from 'styled-components';
import { Badge } from '../badge';

// TODO: change types accordingly
export type TokenCardProps = {
  tokenName: string;
  tokenSymbolURL: string;
  treasurySharePercentage: string;
  tokenCount: string;
  tokenUSDValue: string;
  treasuryShare: string;
  changeDuringInterval: string;
  percentageChangeDuringInterval: string;
};

export const TokenCard: React.FC<TokenCardProps> = (props) => {
  return (
    <Card data-testid="tokenCard">
      <CoinDetailsWithImage>
        <CoinImage src={props.tokenSymbolURL} />
        <CoinDetails>
          <CoinNameAndAllocation>
            <CoinName>{props.tokenName}</CoinName>
            <Badge label={props.treasurySharePercentage} />
          </CoinNameAndAllocation>
          <SecondaryCoinDetails>
            <span>{props.tokenCount}</span>
            <span>•</span>
            <span>{props.tokenUSDValue}</span>
          </SecondaryCoinDetails>
        </CoinDetails>
      </CoinDetailsWithImage>
      <MarketProperties>
        <FiatValue>{props.treasuryShare}</FiatValue>
        <SecondaryFiatDetails>
          <span>{props.changeDuringInterval}</span>
          <Badge label={props.percentageChangeDuringInterval} colorScheme="green" />
        </SecondaryFiatDetails>
      </MarketProperties>
    </Card>
  );
};

const Card = styled.div.attrs({
  className: 'bg-ui-0 rounded-xl flex justify-between items-center py-2.5 px-3',
})``;

const CoinDetailsWithImage = styled.div.attrs({
  className: 'flex items-center',
})``;

const CoinImage = styled.img.attrs(({ src }) => ({
  className: 'h-5 w-5 rounded-full',
  src,
}))``;

const CoinDetails = styled.div.attrs({
  className: 'ml-2 space-y-1',
})``;

const CoinNameAndAllocation = styled.p.attrs({
  className: 'flex items-center space-x-1',
})``;

const CoinName = styled.h1.attrs({
  className: 'text-xl font-semibold text-ui-800',
})``;

const SecondaryCoinDetails = styled.p.attrs({
  className: 'text-sm text-ui-500 space-x-0.5',
})``;

const MarketProperties = styled.div.attrs({
  className: 'text-right space-y-1',
})``;

const FiatValue = styled.h1.attrs({
  className: 'text-xl font-semibold text-ui-800',
})``;

const SecondaryFiatDetails = styled.p.attrs({
  className: 'text-sm text-ui-500 space-x-1 flex justify-end items-center',
})``;

