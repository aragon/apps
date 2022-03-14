import {ApolloClient, ApolloClientOptions, gql, useQuery} from '@apollo/client';
import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useApolloClient} from 'context/apolloClient';
import {constants} from 'ethers';
import {useEffect, useState} from 'react';
import {useWallet} from 'use-wallet';

type BalanceFromGraph = {
  id: number;
  token: {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  balance: BigInt;
  lastUpdated: string;
};

type TokenWithMetadata = {
  balance: BigInt;
  metadata: BalanceFromGraph['token'] & {
    apiId?: string;
    imgUrl?: string;
  };
};

export const useDaoMetadata = (balances: BalanceFromGraph[]) => {
  const client = useApolloClient();
  const {chainId} = useWallet();
  const [data, setData] = useState<TokenWithMetadata[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);

      // fetch token metadata from external api
      const metadata = await Promise.all(
        balances?.map(balance =>
          fetchTokenData(balance.token.id, client, asset_platforms[chainId!])
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

const asset_platforms: {[key: number]: string} = {
  1: 'ethereum',
  127: 'polygon-pos',
  42161: 'arbitrum-one',
};

const TOKEN_DATA_QUERY = gql`
  query TokenData {
    tokenData(url: $url)
      @rest(type: "TokenData", path: "{args.url}", method: "GET") {
      id
      image {
        large
      }
    }
  }
`;
type TokenData = {
  id: string; // coingecko Id
  imgUrl: string;
};

async function fetchTokenData(
  tokenAddress: Address,
  client: ApolloClient<ApolloClientOptions<string | undefined>>,
  platform = 'ethereum'
): Promise<TokenData | undefined> {
  let url: string;

  if (tokenAddress === constants.AddressZero) url = '/coins/ethereum';
  else url = `/coins/${platform}/contract/${tokenAddress}`;

  const {data, error} = await client.query({
    query: TOKEN_DATA_QUERY,
    variables: {url},
  });

  if (!error && data.tokenData) {
    return {
      id: data.tokenData.id,
      imgUrl: data.tokenData.image.large,
    };
  }

  console.error('Error fetching token price', error);
}
