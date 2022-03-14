import {useEffect, useMemo} from 'react';

import {TimeFilter} from 'utils/constants';
import {useTokenMetadata} from './useTokenMetadata';
import {useDaoBalances} from './useDaoBalances';
import {TokenWithMarketData, usePollTokenPrices} from './usePollTokenPrices';

// TODO: Explore options. This might be best on a context around the financial pages
// Would save however many calls is made in one go

type VaultToken = TokenWithMarketData & {
  treasurySharePercentage: number;
};

/**
 * Hook encapsulating the logic for fetching the assets from the DAO vault and mapping them
 * to their corresponding USD market values.
 * @param daoAddress Dao address
 * @param filter Time filter to get data
 * @returns A list of tokens in the DAO treasury, current USD sum value of all assets,
 * and the price change in USD based on the filter
 */
export const useDaoVault = (daoAddress: string, filter: TimeFilter) => {
  const {data: balances, getDaoBalances} = useDaoBalances(daoAddress);
  const {data: tokensWithMetadata} = useTokenMetadata(balances);
  const {data} = usePollTokenPrices(tokensWithMetadata, {filter});

  useEffect(() => {
    getDaoBalances();
  }, [getDaoBalances]);

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
