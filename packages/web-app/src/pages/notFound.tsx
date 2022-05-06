import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {useLocation} from 'react-router-dom';
import {PageWrapper} from 'components/wrappers';
import {IconHome} from '@aragon/ui-components/src';

const NotFound: React.FC = () => {
  const {state} = useLocation();
  console.log('[LOGGING] state ' + JSON.stringify(state, null, 2));
  const message = state?.incorrectPath
    ? 'No page could be found for the path: ' + state.incorrectPath
    : 'The page could not be found';

  return (
    <PageWrapper
      title="Page not found"
      buttonLabel="Take me home"
      buttonIcon={<IconHome />}
      subtitle={message}
    >
      <></>
    </PageWrapper>
  );
};

export default withTransaction('NotFound', 'component')(NotFound);
