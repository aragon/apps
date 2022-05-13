import {Spinner} from '@aragon/ui-components';
import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="my-4 text-2xl font-bold text-center">Loading...</p>
      <Spinner size="big" />
    </div>
  );
};
