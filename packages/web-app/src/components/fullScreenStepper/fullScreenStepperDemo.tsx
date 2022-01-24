import React from 'react';
import {Step} from './step';
import {FullScreenStepper} from './fullScreenStepper';
import {FormProvider, useForm} from 'react-hook-form';

// This file fullScreenStepperDemo.tsx will be deleted before merging. It's just for a demo
export const FullScreenStepperDemo = () => {
  const formMethods = useForm<FormData>({mode: 'onChange'});

  return (
    <FormProvider {...formMethods}>
      <FullScreenStepper
        navbarLabel="Demo"
        navbarBackUrl="/"
        wizardProcessName="Wizard Process Name"
      >
        <Step wizardTitle="Step 1" wizardDescription="Description of step 1">
          {/* Each step could be a separate component which could be put here */}
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
      {/* Stuff like modal usage could go here */}
    </FormProvider>
  );
};
