import {ApolloClient, InMemoryCache} from '@apollo/client';
import {RestLink} from 'apollo-link-rest';
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';

const restLink = new RestLink({
  uri: 'https://api.coingecko.com/api/v3',
});

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  maxSize: 5242880, // 5 MiB
  storage: new LocalStorageWrapper(window.localStorage),
  debug: process.env.NODE_ENV === 'development',
});

await persistor.restore();

export const client = new ApolloClient({
  cache,
  link: restLink,
});
