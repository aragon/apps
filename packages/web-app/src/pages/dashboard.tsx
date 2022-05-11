import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {PageWrapper} from 'components/wrappers';
import {Loading} from 'components/temporary';
import {useDaoParam} from 'hooks/useDaoParam';

const Dashboard: React.FC = () => {
  const {data: dao, loading} = useDaoParam();

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper
      title={'Dashboard Page for DAO ' + dao}
      subtitle="Placeholder for the Dashboard page"
      showButton={false}
      buttonLabel={'sdf'}
    >
      <></>
    </PageWrapper>
  );
};

export default withTransaction('Dashboard', 'component')(Dashboard);
