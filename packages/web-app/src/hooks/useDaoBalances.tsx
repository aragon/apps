import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useQuery} from '@apollo/client';

import {TokenBalance} from 'utils/types';
import {DAO_BALANCE_LIST} from 'queries/finances';

export const useDaoBalances = (daoAddress: Address) => {
  const {data, error, loading, refetch} = useQuery(DAO_BALANCE_LIST, {
    variables: {dao: daoAddress},
    fetchPolicy: 'no-cache',
  });

  return {
    data: data?.balances as TokenBalance[],
    error,
    loading,
    refetch,
  };
};
