import React from 'react';
import {useLocation} from 'react-router-dom';
import {withTransaction} from '@elastic/apm-rum-react';

const NewTransfer = () => {
  // FIXME: navigating to new transfer via the url without the state is no good
  // perhaps set a default value or not let it navigate at all
  const {
    state: {transferType},
  } = useLocation();

  return <div>New Transfer - {transferType}</div>;
};

// TODO: include transfer type
export default withTransaction('NewTransfer', 'component')(NewTransfer);
