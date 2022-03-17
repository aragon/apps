import React from 'react';
import {constants} from 'ethers';
import {render, screen} from 'test-utils';

import TokenList from '..';
import {TokenWithMetadata} from 'utils/types';

const DEFAULT_TOKENS: TokenWithMetadata[] = [
  {
    metadata: {
      id: constants.AddressZero,
      name: 'Ethereum',
      imgUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      symbol: 'ETH',
      decimals: 18,
    },
    balance: BigInt('255555'),
  },
];

describe('TokenList', () => {
  function setup(tokens = DEFAULT_TOKENS) {
    render(<TokenList tokens={tokens} />);
    return screen.getByTestId('tokenList');
  }

  test('should render without crashing', () => {
    const element = setup();
    expect(element).toBeInTheDocument();
  });

  test('should render token card for every token in the list', () => {
    const element = setup();
    expect(element.childElementCount).toBe(DEFAULT_TOKENS.length);
  });

  test('should render no tokens when list of token provided is empty', () => {
    setup([]);
    expect(screen.getByText(/no token/i)).toBeInTheDocument();
  });
});
