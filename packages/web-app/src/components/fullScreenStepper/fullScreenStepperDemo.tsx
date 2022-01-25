import React from 'react';
import {Step} from './step';
import {FullScreenStepper} from './fullScreenStepper';
import {FormProvider, useForm} from 'react-hook-form';
import {ButtonText} from '@aragon/ui-components';
import {useFormStep} from '.';

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
          nextButtonLabel="Next"
        >
          <div className="mx-auto text-xl text-primary-500">World</div>
        </Step>
        <Step
          wizardTitle="Step 3"
          wizardDescription="Description of step 3"
          nextButtonLabel="Can't continue"
          onBackButtonClicked={() => alert('This button is disabled')}
          isNextButtonDisabled
          hideWizard
        >
          <Step3 />
        </Step>
      </FullScreenStepper>
      {/* Stuff like modal usage could go here */}
    </FormProvider>
  );
};

const Step3: React.FC = () => {
  const {setStep} = useFormStep();
  return <ButtonText label="Goto step 1" onClick={() => setStep(1)} />;
};
