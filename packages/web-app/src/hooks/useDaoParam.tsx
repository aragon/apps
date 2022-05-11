import {useQuery} from '@apollo/client';
import {DAO_BY_ADDRESS} from 'queries/dao';
import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {NotFound} from 'utils/paths';

/**
 * This hook queries the current URL for a the DAO address and validates that a
 * DAO with this address exists. This is done querying subgraph for a dao with
 * the id parsed from the URL. If the dao exists, the id is simply returned. If
 * it does not exist, the user is redirected to the 404 page.
 *
 * @returns A apollo query result containing the DAO id.
 */
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
