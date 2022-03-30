import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {constants} from 'ethers';

import {TOKEN_DATA_QUERY} from 'queries/tokenData';
import {ApolloClient, ApolloClientOptions} from '@apollo/client';
import {BASE_URL, DEFAULT_CURRENCY, TimeFilter} from 'utils/constants';

export type TokenPrices = {
  [key: string]: {
    price: number;
    percentages: {
      [key in TimeFilter]: number;
    };
  };
};

type APITokenPrice = {
  id: string;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
};

type FetchedTokenMarketData = Promise<TokenPrices | undefined>;

/**
 * Return token USD value along with price changes for 1 day, 1 week, 1 month, 1 year
 *
 * NOTE: Currently **not** fetching maximum data
 *
 * @param id Coingecko id **or** a list of comma separated ids for multiple tokens
 */
async function fetchTokenMarketData(id: string): FetchedTokenMarketData {
  if (!id) return;
  // Note: Does NOT fetch chart data
  // TODO: fetch MAX
  const endPoint = '/coins/markets';
  const url = `${BASE_URL}${endPoint}?vs_currency=${DEFAULT_CURRENCY}&ids=${id}&price_change_percentage=24h%2C7d%2C30d%2C1y`;

  try {
    const res = await fetch(url);
    const parsedResponse: APITokenPrice[] = await res.json();
    const data: TokenPrices = {};

    parsedResponse.forEach(token => {
      data[token.id] = {
        price: token.current_price,
        percentages: {
          day: token.price_change_percentage_24h_in_currency,
          week: token.price_change_percentage_7d_in_currency,
          month: token.price_change_percentage_30d_in_currency,
          year: token.price_change_percentage_1y_in_currency,
        },
      };
    });

    return data;
  } catch (error) {
    console.error('Error fetching token price', error);
  }
}

type TokenData = {
  id: string;
  name: string;
  symbol: string;
  imgUrl: string;
  address: Address;
  price: number;
};

/**
 * Get token data from external api. Ideally, this data should be cached so that
 * the id property can be used when querying for prices.
 * @param tokenAddress Token contract address
 * @param client Apollo Client instance
 * @param platform Api network platform
 * @returns Basic information about the token or undefined if data could not be fetched
 */
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
      name: data.tokenData.name,
      symbol: data.tokenData.symbol.toUpperCase(),
      imgUrl: data.tokenData.image.large,
      address: tokenAddress,
      price: data.tokenData.market_data.current_price.usd,
    };
  }

  console.error('Error fetching token price', error);
}

/**
 * Get simple token price
 * @param address Token contract address
 * @returns a USD price as a number
 */
async function fetchTokenPrice(address: Address) {
  const isEth = address === constants.AddressZero;
  const endPoint =
    '/simple/token_price/ethereum?vs_currencies=usd&contract_addresses=';

  const url = isEth
    ? `${BASE_URL}/simple/price?ids=ethereum&vs_currencies=usd`
    : `${BASE_URL}${endPoint}${address}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return Object.values(data as object)[0]?.usd as number;
  } catch (error) {
    console.error('Error fetching token price', error);
  }
}

export {fetchTokenMarketData, fetchTokenData, fetchTokenPrice};
