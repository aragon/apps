import React from 'react';
import {constants} from 'ethers';

import usePollTokens from 'hooks/usePollTokens';

const TEMP_FETCH_INTERVAL = 300000;
const STATIC_TOKEN_ADDRESSES = [
  constants.AddressZero, // ETH, Note: ETH will also work
  '0xa117000000f279d81a1d3cc75430faa017fa5a2e', // ANT
  '0x6b175474e89094c44da98b954eedeac495271d0f', // DAI
  '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', // UNI
  '0xdac17f958d2ee523a2206206994597c13d831ec7', // USDT
];

const Finance: React.FC = () => {
  const {isLoading, prices} = usePollTokens(
    STATIC_TOKEN_ADDRESSES,
    TEMP_FETCH_INTERVAL
  );

  !isLoading && console.log(prices);
  return <h1>Finance Page</h1>;
};

export default Finance;
