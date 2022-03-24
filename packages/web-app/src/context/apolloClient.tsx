/* eslint-disable @typescript-eslint/no-explicit-any */
// Workarounds are used that necessitate the any escape hatch

import React, {useContext, useMemo} from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  ApolloClientOptions,
  makeVar,
} from '@apollo/client';
import {RestLink} from 'apollo-link-rest';
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';
import {BASE_URL, SUBGRAPH_API_URL} from 'utils/constants';
import {useWallet} from 'context/augmentedWallet';

/**
 * IApolloClientContext
 */
interface IApolloClientContext {
  client: ApolloClient<ApolloClientOptions<string | undefined>>;
}

const UseApolloClientContext = React.createContext<IApolloClientContext | any>(
  {}
);

const ApolloClientProvider: React.FC<unknown> = ({children}) => {
  const {networkName} = useWallet();

  const graphLink = useMemo(() => {
    if (networkName) {
      return new HttpLink({
        uri:
          'https://api.thegraph.com/subgraphs/name/rekard0/rekard0-zaragoza-rinkeby' ||
          SUBGRAPH_API_URL[networkName],
      });
    }
  }, [networkName]);

  const restLink = useMemo(() => {
    return new RestLink({
      uri: BASE_URL,
    });
  }, []);

  const cache = useMemo(() => {
    return new InMemoryCache();
  }, []);

  // add the REST API's typename you want to persist here
  const entitiesToPersist = ['tokenData'];

  const persistor = new CachePersistor({
    cache,
    // TODO: Check and update the size needed for the cache
    maxSize: 5242880, // 5 MiB
    storage: new LocalStorageWrapper(window.localStorage),
    debug: process.env.NODE_ENV === 'development',
    persistenceMapper: async (data: string) => {
      const parsed = JSON.parse(data);

      const mapped: Record<string, unknown> = {};
      const persistEntities: string[] = [];
      const rootQuery = parsed['ROOT_QUERY'];

      mapped['ROOT_QUERY'] = Object.keys(rootQuery).reduce(
        (obj: Record<string, unknown>, key: string) => {
          if (key === '__typename') return obj;

          const keyWithoutArgs = key.substring(0, key.indexOf('('));
          if (entitiesToPersist.includes(keyWithoutArgs)) {
            obj[key] = rootQuery[key];

            if (Array.isArray(rootQuery[key])) {
              const entities = rootQuery[key].map(
                (item: Record<string, unknown>) => item.__ref
              );
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

  const restoreApolloCache = async () => {
    await persistor.restore();
    // favoriteDAOs(JSON.parse(localStorage.getItem('favoriteDAOs') as string));
    selectedDAO(favoriteDAOs()[0]);
  };

  restoreApolloCache();

  const client = useMemo(() => {
    return new ApolloClient({
      cache,
      link: graphLink ? restLink.concat(graphLink) : restLink,
    });
  }, [graphLink, cache, restLink]);

  return (
    <UseApolloClientContext.Provider value={client}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </UseApolloClientContext.Provider>
  );
};

const useApolloClient = () => {
  return useContext(UseApolloClientContext);
};

type favoriteDAO = {
  daoAddress: string;
  daoName: string;
};

const selectedDAO = makeVar<favoriteDAO>({daoName: '', daoAddress: ''});

const favoriteDAOs = makeVar<Array<favoriteDAO>>([
  {
    daoAddress: '0x0ee165029b09d91a54687041adbc705f6376c67f',
    daoName: 'Lorax DAO',
  },
  {daoAddress: 'dao-name.dao.eth', daoName: 'DAO name'},
]);

export {ApolloClientProvider, useApolloClient, favoriteDAOs, selectedDAO};
