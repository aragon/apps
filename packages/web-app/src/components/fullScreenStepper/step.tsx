import React from 'react';

export type StepProps = {
  wizardTitle: string;
  wizardDescription: string;
  backButtonLabel?: string;
  nextButtonLabel?: string;
  isNextButtonDisabled?: boolean;
};

export const Step: React.FC<StepProps> = ({children}) => {
  return <>{children}</>;
};
