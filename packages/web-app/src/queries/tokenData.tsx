import {gql} from '@apollo/client';

export const TOKEN_DATA_QUERY = gql`
  query TokenData {
    tokenData(url: $url)
      @rest(type: "TokenData", path: "{args.url}", method: "GET") {
      id
      name
      symbol
      image {
        large
      }
      address
      market_data {
        current_price {
          usd
        }
      }
    }
  }
`;
