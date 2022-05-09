import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {NotFound} from 'utils/paths';
import {useDaoExists} from './data/useDaoExists';

export function useDao() {
  const {dao} = useParams();
  // NOTE At this point, daoParam will always be defined.
  const {data, error, loading} = useDaoExists(dao ? dao : '');

  useEffect(() => {
    if (error || !data) {
      navigate(NotFound, {replace: true, state: {incorrectDao: dao}});
    }
  }, [loading, dao]);
  const navigate = useNavigate();

  return {data, error, loading};
}
