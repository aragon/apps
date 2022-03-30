import {useEffect, useState} from 'react';

import {useDaoBalances} from './useDaoBalances';
import {useDaoTransfers} from './useDaoTransfers';
import {usePollTransfersPrices} from './usePollTransfersPrices';
import {useTokenMetadata} from './useTokenMetadata';
import {usePollTokenPrices} from './usePollTokenPrices';
import {PollTokenOptions, VaultToken} from 'utils/types';

/**
 * Hook encapsulating the logic for fetching the assets from the DAO vault, mapping them
 * to their corresponding USD market values, and calculating their treasury share percentage.
 * @param daoAddress Dao address
 * @param options.filter TimeFilter for market data
 * @param options.interval Delay in milliseconds
 * @returns A list of tokens in the DAO treasury, current USD sum value of all assets,
 * and the price change in USD based on the filter
 */
export const useDaoVault = (daoAddress: string, options?: PollTokenOptions) => {
  const {data: balances} = useDaoBalances(daoAddress);
  const {data: transfers} = useDaoTransfers(daoAddress);
  const {data: tokensWithMetadata} = useTokenMetadata(balances);
  const {data} = usePollTokenPrices(tokensWithMetadata, options);
  const {data: transfersData} = usePollTransfersPrices(transfers);
  const [tokens, setTokens] = useState<VaultToken[]>([]);

  console.log(transfers);

  useEffect(() => {
    const values = data.tokens.map(token => {
      return {
        ...token,
        ...(token.marketData?.treasuryShare
          ? {
              treasurySharePercentage:
                (token.marketData.treasuryShare / data?.totalAssetValue) * 100,
            }
          : {}),
      };
    });

    setTokens(values);
  }, [data.tokens, data?.totalAssetValue]);

  return {
    tokens,
    totalAssetValue: data.totalAssetValue,
    totalAssetChange: data.totalAssetChange,
    transfers: transfersData,
  };
};
