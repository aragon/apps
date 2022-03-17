import {useEffect, useMemo} from 'react';

import {useDaoBalances} from './useDaoBalances';
import {useTokenMetadata} from './useTokenMetadata';
import {usePollTokenPrices} from './usePollTokenPrices';
import {PollTokenOptions, VaultToken} from 'utils/types';

// TODO: Explore options. This might be best on a context around the financial pages
// Would save however many calls is made in one go

/**
 * Hook encapsulating the logic for fetching the assets from the DAO vault and mapping them
 * to their corresponding USD market values.
 * @param daoAddress Dao address
 * @param options.filter TimeFilter for market data
 * @param options.interval Delay in milliseconds
 * @returns A list of tokens in the DAO treasury, current USD sum value of all assets,
 * and the price change in USD based on the filter
 */
export const useDaoVault = (daoAddress: string, options?: PollTokenOptions) => {
  const {data: balances} = useDaoBalances(daoAddress);
  const {data: tokensWithMetadata} = useTokenMetadata(balances);
  const {data} = usePollTokenPrices(tokensWithMetadata, options);

  const tokens = useMemo(
    () =>
      data?.tokens.map(token => ({
        ...token,
        ...(token.marketData?.treasuryShare
          ? {
              treasurySharePercentage:
                (token.marketData.treasuryShare / data.totalAssetValue) * 100,
            }
          : {}),
      })) as VaultToken[],
    [data?.tokens, data?.totalAssetValue]
  );

  return {
    tokens,
    totalAssetValue: data.totalAssetValue,
    totalAssetChange: data.totalAssetChange,
  };
};
