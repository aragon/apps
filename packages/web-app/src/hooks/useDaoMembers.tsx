import {useQuery} from '@apollo/client';
import {client} from 'context/apolloClient';
import {useNetwork} from 'context/network';
import {DAO_MEMBERS} from 'queries/dao';
import {HookData} from 'utils/types';

// NOTE: Having two hooks here may not be ideal. But until we have some more
// clarity on how to fetch the token holder data, splitting the hook into two
// parts seemed the simplest way to go.

type DaoWhitelist = {
  id: string;
}[];

export function useDaoWhitelist(dao: string): HookData<DaoWhitelist> {
  const {network} = useNetwork();
  // TODO: This needs to be more fleshed out to return members properly
  const {data, error, loading} = useQuery(DAO_MEMBERS, {
    variables: {id: dao},
    client: client[network],
    fetchPolicy: 'no-cache',
  });

  return {
    data: data?.dao.packages[0].pkg.users,
    error,
    isLoading: loading,
  };
}

type DaoTokenHolders = {
  daoMembers: {
    address: string;
    balance: number;
  }[];
  token: {
    id: string;
    symbol: string;
  };
};

// eslint-disable-next-line
export function useDaoTokenHolders(dao: string): HookData<DaoTokenHolders> {
  const {network} = useNetwork();
  const {data, error, loading} = useQuery(DAO_MEMBERS, {
    variables: {id: dao},
    client: client[network],
    fetchPolicy: 'no-cache',
  });

  // TODO: Fetch token holders addresses and the balance for each address
  const daoMembers = MOCK_ADDRESSES.filter(() => Math.random() > 0.4).map(
    member => {
      return {
        address: member,
        balance: Math.floor(Math.random() * 500 + 1),
      };
    }
  );

  return {
    data: {daoMembers, token: data?.dao.token},
    error: error,
    isLoading: loading,
  };
}

const MOCK_ADDRESSES = [
  '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70',
  '0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf',
  '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
  'cool.eth',
  'star.eth',
  'beer.eth',
];
