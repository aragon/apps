import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {useQuery} from '@apollo/client';

import {DAO_BY_ADDRESS} from 'queries/dao';

export const useDaoExists = (daoAddress: Address) => {
  const {data, error, loading, refetch} = useQuery(DAO_BY_ADDRESS, {
    variables: {id: daoAddress},
  });

  const daoExists: boolean = data?.dao?.id || false;

  return {
    data: daoExists,
    error,
    loading,
    refetch,
  };
};
