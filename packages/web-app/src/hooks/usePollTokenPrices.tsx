import {useCallback, useMemo, useState} from 'react';

import useInterval from 'hooks/useInterval';
import useIsMounted from 'hooks/useIsMounted';
import {TimeFilter} from 'utils/constants';
import {formatUnits} from 'utils/library';
import {TokenWithMetadata} from './useTokenMetadata';
import {fetchTokenMarketData, TokenPrices} from 'services/prices';

export type TokenWithMarketData = TokenWithMetadata & {
  marketData?: {
    price: number;
    treasuryShare?: number;
    percentageChangedDuringInterval?: number;
  };
};

type PollTokenOptions = {interval?: number; filter?: TimeFilter};

/**
 * Hook for fetching token prices at specified intervals
 * @param tokenList List of token ids to fetch USD  value for
 * @param interval Delay in milliseconds
 * @returns Object with key value pairs corresponding to token address and USD value respectively.
 * If USD value isn't found, returns null for token price.
 */
export const usePollTokenPrices = (
  tokenList: TokenWithMetadata[] = [],
  options: PollTokenOptions = {filter: TimeFilter.day, interval: 300000}
) => {
  const isMounted = useIsMounted();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedMarketData, setFetchedMarketData] = useState<TokenPrices>();

  const fetchPrices = useCallback(async () => {
    setIsLoading(true);

    try {
      const tokenIds = tokenList.map(token => token.metadata.apiId).join(',');
      const response = await fetchTokenMarketData(tokenIds);

      if (isMounted()) {
        setFetchedMarketData(response);
      }
    } catch (error) {
      setError(error as Error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isMounted, tokenList]);

  const pricing = useMemo((): {
    tokens: TokenWithMarketData[];
    totalAssetValue: number;
    totalAssetChange: number;
  } => {
    if (!fetchedMarketData)
      return {
        tokens: tokenList as TokenWithMarketData[],
        totalAssetValue: 0,
        totalAssetChange: 0,
      };

    let sum = 0;
    let intervalChange = 0;
    let treasuryShare: number;
    let tokenMarketData;

    // map tokens
    const tokens = tokenList.map(token => {
      if (!token.metadata.apiId) return token;

      tokenMarketData = fetchedMarketData[token.metadata.apiId];

      // update total change during interval and total volume
      treasuryShare =
        tokenMarketData.price *
        Number(formatUnits(token.balance, token.metadata.decimals));

      sum += treasuryShare;
      intervalChange +=
        treasuryShare * (tokenMarketData.percentages[options.filter!] / 100);

      return {
        ...token,
        marketData: {
          price: tokenMarketData.price,
          treasuryShare,
          percentageChangeDuringInterval:
            tokenMarketData.percentages[options.filter!],
        },
      } as TokenWithMarketData;
    });

    return {tokens, totalAssetValue: sum, totalAssetChange: intervalChange};
  }, [fetchedMarketData, options.filter, tokenList]);

  useInterval(() => fetchPrices(), options.interval, tokenList.length > 0);

  return {
    data: pricing,
    error,
    isLoading,
  };
};
