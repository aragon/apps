import {useCallback, useState} from 'react';

import useInterval from 'hooks/useInterval';
import useIsMounted from 'hooks/useIsMounted';
import {fetchTokenUsdPrice} from 'services/prices';

type TokenPrices = {
  [key: string]: string | undefined;
};

type Token = {
  address: string;
  decimals: number | undefined;
};

/**
 * Hook for fetching token prices at specified intervals
 * @param tokenList List of token symbols or addresses to fetch USD value for
 * @param interval Delay in milliseconds
 * @returns Object with key value pairs corresponding to token address and USD value respectively,
 * OR a string USD value if only one token address was provided.
 * If USD value isn't found, returns null for token price.
 *
 * @example
 * // multiple addresses
 * const {prices, isLoading} = usePollTokens(tokenList, 1000);
 * console.log(prices) // { 0x123...34fd: '5.0045', 0x123...fa23: null};
 *
 * // single address
 * const {price, isLoading} = usePollTokens(ETH, 1000);
 * console.log(price) // '4521.1420'
 */
const usePollTokens = (tokenList: Token[], interval?: number) => {
  const isMounted = useIsMounted();
  const [prices, setPrices] = useState<TokenPrices>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchPrices = useCallback(
    async (tokens: Token[]) => {
      const fetchedPrices: TokenPrices = {};
      setIsLoading(true);

      try {
        const allPrices = Promise.all(
          tokens.map(({address, decimals}) =>
            fetchTokenUsdPrice(address, decimals)
          )
        );

        const values = await allPrices;
        tokens.forEach((token, index) => {
          fetchedPrices[token.address] = values[index];
        });
        if (isMounted()) setPrices({...fetchedPrices});
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    },
    [isMounted]
  );

  useInterval(() => fetchPrices(tokenList), interval);
  return tokenList.length === 1
    ? {price: prices[tokenList[0].address], isLoading}
    : {prices, isLoading};
};

export default usePollTokens;
