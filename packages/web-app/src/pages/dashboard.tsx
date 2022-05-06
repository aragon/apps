import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {PageWrapper} from 'components/wrappers';

const Dashboard: React.FC = () => {
  return (
    <PageWrapper
      title="Dashboard Page"
      subtitle="Placeholder for the Dashboard page"
      showButton={false}
      buttonLabel={'sdf'}
    >
      <></>
    </PageWrapper>
  );
};

export default withTransaction('Dashboard', 'component')(Dashboard);
