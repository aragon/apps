import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useQuery} from '@apollo/client';

import {DaoTokenBalance} from 'utils/types';
import {DAO_BALANCE_LIST} from 'queries/finances';

export const useDaoBalances = (daoAddress: Address) => {
  const {data, error, loading, refetch} = useQuery(DAO_BALANCE_LIST, {
    variables: {dao: daoAddress},
  });

  return {
    data: data?.balances as DaoTokenBalance[],
    error,
    loading,
    refetch,
  };
};
