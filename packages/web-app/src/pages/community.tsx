import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {PageWrapper} from 'components/wrappers';

const Community: React.FC = () => {
  return (
    <PageWrapper
      title="Community Page"
      subtitle="Placeholder for the Community page"
      showButton={false}
      buttonLabel={'sdf'}
    >
      <></>
    </PageWrapper>
  );
};

export default withTransaction('Community', 'component')(Community);
