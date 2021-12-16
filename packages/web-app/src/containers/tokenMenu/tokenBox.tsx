import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Avatar} from '@aragon/ui-components';
import {useWallet} from 'context/augmentedWallet';
import {FetchBalance} from 'services/amount';

export type TokenProps = {
  tokenAddress: string;
  tokenName: string;
  tokenLogo: string;
};

export default function TokenBox({
  tokenAddress,
  tokenName,
  tokenLogo,
}: TokenProps) {
  const [balance, setBalance] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const {account, provider} = useWallet();

  useEffect(() => {
    // Fetch balance amount for each token
    FetchBalance(tokenAddress, account, provider).then(balanceRes => {
      setBalance(balanceRes.amount);
      setSymbol(balanceRes.symbol);
    });
  }, [account, provider, tokenAddress]);

  return (
    <Box>
      <TokenNameWrapper>
        <Avatar size="small" src={tokenLogo} />
        <Name>{tokenName}</Name>
      </TokenNameWrapper>
      <Price>{balance ? `${balance} ${symbol}` : '-'}</Price>
    </Box>
  );
}

const Box = styled.div.attrs({
  className: 'flex justify-between py-1.5 px-2 bg-white rounded-xl',
})``;

const TokenNameWrapper = styled.div.attrs({
  className: 'flex space-x-2',
})``;

const Name = styled.h2.attrs({
  className: 'ft-text-lg text-ui-800 font-bold',
})``;

const Price = styled.h2.attrs({
  className: 'ft-text-lg text-ui-600',
})``;
