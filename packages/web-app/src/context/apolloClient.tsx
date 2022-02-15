import {ApolloClient, InMemoryCache} from '@apollo/client';
import {RestLink} from 'apollo-link-rest';
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';
import {BASE_URL} from 'utils/constants';

const restLink = new RestLink({
  uri: BASE_URL,
});

const cache = new InMemoryCache();

// add the REST API's typename you want to persist here
const entitiesToPersist = ['tokenData'];

const persistor = new CachePersistor({
  cache,
  maxSize: 5242880, // 5 MiB
  storage: new LocalStorageWrapper(window.localStorage),
  debug: process.env.NODE_ENV === 'development',
  persistenceMapper: async (data: any) => {
    const parsed = JSON.parse(data);

    const mapped: any = {};
    const persistEntities: any[] = [];
    const rootQuery = parsed['ROOT_QUERY'];

    mapped['ROOT_QUERY'] = Object.keys(rootQuery).reduce(
      (obj: any, key: string) => {
        if (key === '__typename') return obj;

        if (entitiesToPersist.includes(key)) {
          obj[key] = rootQuery[key];

          if (Array.isArray(rootQuery[key])) {
            const entities = rootQuery[key].map((item: any) => item.__ref);
            persistEntities.push(...entities);
          } else {
            const entity = rootQuery[key].__ref;
            persistEntities.push(entity);
          }
        }

        return obj;
      },
      {__typename: 'Query'}
    );

    persistEntities.reduce((obj, key) => {
      obj[key] = parsed[key];
      return obj;
    }, mapped);

    return JSON.stringify(mapped);
  },
});

await persistor.restore();

export const client = new ApolloClient({
  cache,
  link: restLink,
});
