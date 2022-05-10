import {Spinner} from '@aragon/ui-components';
import React from 'react';

export const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="font-bold my-4 text-center text-2xl">Loading...</p>
      <Spinner size="big" />
    </div>
  );
};
