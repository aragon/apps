import {useWallet} from 'use-wallet';
import {useEffect, useState} from 'react';

import {fetchTokenData} from 'services/prices';
import {useApolloClient} from 'context/apolloClient';
import {ASSET_PLATFORMS} from 'utils/constants';
import {DaoTokenBalance, TokenWithMetadata} from 'utils/types';

export const useTokenMetadata = (balances: DaoTokenBalance[]) => {
  const client = useApolloClient();
  const {chainId} = useWallet();
  const [data, setData] = useState<TokenWithMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);

      // fetch token metadata from external api
      const metadata = await Promise.all(
        balances?.map(balance =>
          fetchTokenData(balance.token.id, client, ASSET_PLATFORMS[chainId!])
        )
      );

      // map metadata to token balances
      const tokensWithMetadata = balances?.map((balance, index) => ({
        balance: balance.balance,
        metadata: {
          ...balance.token,
          apiId: metadata[index]?.id,
          imgUrl: metadata[index]?.imgUrl,
        },
      }));

      setData(tokensWithMetadata);
      setLoading(false);
    };

    if (balances) fetchMetadata();
  }, [balances, chainId, client]);

  return {data, loading};
};
