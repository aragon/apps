import {useLazyQuery, useQuery} from '@apollo/client';
import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {DAO_BALANCE_LIST} from 'queries/finances';

type BalanceFromGraph = {
  id: number;
  token: {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  balance: BigInt;
  lastUpdated: string;
};

export const useDaoBalances = (daoAddress: Address) => {
  const [getDaoBalances, {data, error, loading, refetch}] = useLazyQuery(
    DAO_BALANCE_LIST,
    {
      variables: {dao: daoAddress},
    }
  );

  return {
    data: data?.balances as BalanceFromGraph[],
    error,
    loading,
    refetch,
    getDaoBalances,
  };
};
