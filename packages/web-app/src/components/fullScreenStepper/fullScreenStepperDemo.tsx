import React from 'react';
import {Step} from './step';
import {FullScreenStepper} from './fullScreenStepper';

export const FullScreenStepperDemo = () => {
  return (
    <FullScreenStepper
      navbarLabel="Demo"
      navbarBackUrl="/"
      wizardProcessName="Wizard Process Name"
    >
      <Step wizardTitle="Step 1" wizardDescription="Description of step 1">
        <div className="mx-auto text-xl text-primary-500">Hello</div>
      </Step>
      <Step
        wizardTitle="Step 2"
        wizardDescription="Description of step 2"
        nextButtonLabel="Can't continue"
        isNextButtonDisabled
      >
        <div className="mx-auto text-xl text-primary-500">World</div>
      </Step>
    </FullScreenStepper>
  );
};
