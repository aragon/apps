import {useCallback, useState} from 'react';

import useInterval from 'hooks/useInterval';
import useIsMounted from 'hooks/useIsMounted';
import {fetchTokenUsdPrice} from 'services/prices';
import {HookData, TokenPrices, BaseTokenInfo} from 'utils/types';

/**
 * Hook for fetching token prices at specified intervals
 * @param tokenList List of token symbols or addresses to fetch USD value for
 * @param interval Delay in milliseconds
 * @returns Object with key value pairs corresponding to token address and USD value respectively.
 * If USD value isn't found, returns null for token price.
 *
 * @example
 * const {prices, isLoading} = usePollTokens(tokenList, 1000);
 * console.log(prices) // { 0x123...34fd: '5.0045', 0x123...fa23: null};
 */
const usePollTokens: HookData<TokenPrices> = (
  tokenList: BaseTokenInfo[],
  interval?: number
) => {
  const isMounted = useIsMounted();
  const [prices, setPrices] = useState<TokenPrices>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const fetchPrices = useCallback(
    async (tokens: BaseTokenInfo[]) => {
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

  return {data: prices, isLoading: isLoading};
};

export default usePollTokens;
