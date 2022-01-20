import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {ButtonText} from '@aragon/ui-components';
import {useNavigate} from 'react-router-dom';

const Governance: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Governance Page</h1>
      {/* temporary button to access proposal page */}
      <ButtonText
        label="Proposal 1"
        onClick={() => {
          navigate('proposal/1');
        }}
      />
    </div>
  );
};

export default withTransaction('Governance', 'component')(Governance);
