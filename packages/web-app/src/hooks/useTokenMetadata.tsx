import {useEffect, useState} from 'react';

import {useNetwork} from 'context/network';
import {fetchTokenData} from 'services/prices';
import {useApolloClient} from 'context/apolloClient';
import {TokenBalance, TokenWithMetadata} from 'utils/types';

export const useTokenMetadata = (balances: TokenBalance[]) => {
  const client = useApolloClient();
  const {network} = useNetwork();
  const [data, setData] = useState<TokenWithMetadata[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);

      // fetch token metadata from external api
      const metadata = await Promise.all(
        balances?.map(balance => {
          return fetchTokenData(balance.token.id, client, network);
        })
      );

      // map metadata to token balances
      const tokensWithMetadata = balances?.map((balance, index) => ({
        balance: balance.balance,
        metadata: {
          ...balance.token,
          apiId: metadata[index]?.id,
          imgUrl: metadata[index]?.imgUrl || '',
        },
      }));

      setData(tokensWithMetadata);
      setLoading(false);
    };

    if (balances) fetchMetadata();
  }, [balances, network, client]);

  return {data, loading};
};
