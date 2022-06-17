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
  //TODO: eventually, this will need to be queried from subgraph.
  // const {data, error, loading} = useQuery(APPROPRIATE_QUERY, {
  //   variables: {id: dao},
  //   client: client[network],
  //   fetchPolicy: 'no-cache',
  // });

  const daoMembers = MOCK_ADDRESSES.filter(() => Math.random() > 0.4);

  return {data: daoMembers, error: null, loading: false};
}
