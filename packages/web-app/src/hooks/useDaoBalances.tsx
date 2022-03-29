import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useQuery} from '@apollo/client';

import {TokenBalance} from 'utils/types';
import {DAO_BALANCE_LIST} from 'queries/finances';

export const useDaoBalances = (
  daoAddress: Address = '0x51c3ddb42529bfc24d4c13192e2e31421de459bc'
) => {
  const {data, error, loading, refetch} = useQuery(DAO_BALANCE_LIST, {
    variables: {dao: daoAddress},
  });

  return {
    data: data?.balances as TokenBalance[],
    error,
    loading,
    refetch,
  };
};
