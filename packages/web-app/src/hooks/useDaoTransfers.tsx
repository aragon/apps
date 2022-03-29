import {useMemo} from 'react';
import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useQuery} from '@apollo/client';

import {DaoTransfer} from 'utils/types';
import {DAO_TRANSFER_LIST} from 'queries/finances';

export const useDaoTransfers = (
  daoAddress: Address = '0x79fde96a6182adbd9ca4a803ba26f65a893fbf4f'
) => {
  const {data, error, loading, refetch} = useQuery(DAO_TRANSFER_LIST, {
    variables: {dao: daoAddress},
  });

  const sortedData = useMemo(() => {
    if (data) {
      return [...data.vaultDeposits, ...data.vaultWithdraws].sort(
        (a: DaoTransfer, b: DaoTransfer) => b.createdAt - a.createdAt
      );
    } else return data;
  }, [data]);

  return {
    data: sortedData as DaoTransfer[],
    error,
    loading,
    refetch,
  };
};
