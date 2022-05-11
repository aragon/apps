import {useQuery} from '@apollo/client';
import {DAO_BY_ADDRESS} from 'queries/dao';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {NotFound} from 'utils/paths';

export function useDaoParam() {
  const {dao} = useParams();
  // NOTE At this point, daoParam will always be defined.
  const {data, error, loading} = useQuery(DAO_BY_ADDRESS, {
    variables: {id: dao ? dao : ''},
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    } else if (error || !data?.dao?.id) {
      navigate(NotFound, {replace: true, state: {incorrectDao: dao}});
    }
  }, [loading, dao]); // eslint-disable-line

  return {data: data?.dao?.id, error, loading};
}
