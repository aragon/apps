import {useQuery} from '@apollo/client';
import {client} from 'context/apolloClient';
import {useNetwork} from 'context/network';
import {DAO_MEMBERS} from 'queries/dao';

const MOCK_ADDRESSES = [
  '0x8367dc645e31321CeF3EeD91a10a5b7077e21f70',
  '0xDA9dfA130Df4dE4673b89022EE50ff26f6EA73Cf',
  '0xBE0eB53F46cd790Cd13851d5EFf43D12404d33E8',
  'cool.eth',
  'star.eth',
  'beer.eth',
];

// eslint-disable-next-line
export function useDaoMembers(dao: string) {
  const {network} = useNetwork();
  // TODO: This needs to be more fleshed out to return members properly
  const {data, error, loading} = useQuery(DAO_MEMBERS, {
    variables: {id: dao},
    client: client[network],
    fetchPolicy: 'no-cache',
  });

  // temporary mock data feel free to remove
  const daoMembers = MOCK_ADDRESSES.filter(() => Math.random() > 0.4).map(
    member => {
      return {
        address: member,
        ...(data ? {tokens: Math.floor(Math.random() * 500 + 1)} : {}),
      };
    }
  );

  return {
    data: {
      daoMembers,
      daoType: data?.dao.packages[0].pkg.__typename,
      token: data?.dao.token,
    },
    error,
    loading,
  };
}
