import React from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {PageWrapper} from 'components/wrappers';
import {Loading} from 'components/temporary';
import {useDaoParam} from 'hooks/useDaoParam';

const Community: React.FC = () => {
  const {data: dao, loading} = useDaoParam();

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper
      title="Community Page"
      subtitle="Placeholder for the Community page"
      showButton={false}
      buttonLabel={'sdf'}
    >
      <>
        <p>{dao}</p>
      </>
    </PageWrapper>
  );
};

export default withTransaction('Community', 'component')(Community);
