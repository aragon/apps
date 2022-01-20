import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {ButtonText, Link} from '@aragon/ui-components';
import {useNavigate} from 'react-router-dom';

const Governance: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Governance Page</h1>
      {/* temporary button to access proposal page */}
      <ButtonText
        label="Proposal 123"
        onClick={() => {
          navigate('proposal/123');
        }}
      />
    </div>
  );
};

export default withTransaction('Governance', 'component')(Governance);
