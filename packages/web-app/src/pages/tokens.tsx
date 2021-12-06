import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';

const Tokens: React.FC = () => {
  return <h1>All Tokens page</h1>;
};

export default withTransaction('Tokens', 'component')(Tokens);
