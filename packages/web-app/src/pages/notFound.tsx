import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {useLocation, useNavigate} from 'react-router-dom';
import {IconHome} from '@aragon/ui-components/src';

import {PageWrapper} from 'components/wrappers';
import Logo from 'public/coloredLogo.svg';
import {Landing} from 'utils/paths';

type NotFoundState = {
  incorrectPath?: string;
  incorrectDao?: string;
};

const NotFound: React.FC = () => {
  const {state} = useLocation();
  const navigate = useNavigate();

  const typedState = state as NotFoundState;

  let message = 'The requested page could not be found';
  if (typedState?.incorrectPath)
    message =
      'No page could be found for the path: ' + typedState.incorrectPath;
  if (typedState?.incorrectDao)
    message =
      'No DAO could be found for the address: ' + typedState.incorrectDao;

  return (
    <PageWrapper
      title="Page not found"
      buttonLabel="Take me home"
      buttonIcon={<IconHome />}
      subtitle={message}
      onClick={() => navigate(Landing)}
    >
      <img className="mx-auto mt-5" src={Logo}></img>
    </PageWrapper>
  );
};

export default withTransaction('NotFound', 'component')(NotFound);
