import {constants} from 'ethers';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import React, {useEffect, useMemo} from 'react';
import {useForm, FormProvider, useFormState} from 'react-hook-form';

import {useWallet} from 'context/augmentedWallet';
import {Governance} from 'utils/paths';
import AddActionMenu from 'containers/addActionMenu';
import ReviewProposal from 'containers/reviewProposal';
import SetupVotingForm from 'containers/setupVotingForm';
import {TransferTypes} from 'utils/constants';
import ConfigureActions from 'containers/configureActions';
import {useWalletProps} from 'containers/walletMenu';
import {ActionsProvider} from 'context/actions';
import {FullScreenStepper, Step} from 'components/fullScreenStepper';
import DefineProposal, {
  isValid as defineProposalIsValid,
} from 'containers/defineProposal';

const NewProposal: React.FC = () => {
  const {t} = useTranslation();
  const formMethods = useForm({
    mode: 'onChange',
  });
  const {errors, dirtyFields} = useFormState({control: formMethods.control});
  const {account}: useWalletProps = useWallet();
  const [durationSwitch] = formMethods.getValues(['durationSwitch']);

  // TODO: Sepehr, is this still necessary?
  useEffect(() => {
    if (account) {
      // TODO: Change from to proper address
      formMethods.setValue('from', constants.AddressZero);
      formMethods.setValue('type', TransferTypes.Withdraw);
    }
  }, [account, formMethods]);

  /*************************************************
   *             Step Validation States            *
   *************************************************/

  const setupVotingFormIsValid = useMemo(() => {
    if (durationSwitch === 'date') {
      return errors.startDate || errors.startTime || errors.endDate
        ? false
        : true;
    }
    return errors.startDate || errors.startTime || errors.duration
      ? false
      : true;
  }, [
    durationSwitch,
    errors.duration,
    errors.endDate,
    errors.startDate,
    errors.startTime,
  ]);

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <FormProvider {...formMethods}>
      <ActionsProvider>
        <FullScreenStepper
          wizardProcessName={t('newProposal.title')}
          navLabel={t('newProposal.title')}
          returnPath={Governance}
        >
          <Step
            wizardTitle={t('newWithdraw.defineProposal.heading')}
            wizardDescription={t('newWithdraw.defineProposal.description')}
            isNextButtonDisabled={!defineProposalIsValid(dirtyFields, errors)}
          >
            <DefineProposal />
          </Step>
          <Step
            wizardTitle={t('newWithdraw.setupVoting.title')}
            wizardDescription={t('newWithdraw.setupVoting.description')}
            isNextButtonDisabled={!setupVotingFormIsValid}
          >
            <SetupVotingForm />
          </Step>
          <Step
            wizardTitle={t('newProposal.configureActions.heading')}
            wizardDescription={t('newProposal.configureActions.description')}
          >
            <ConfigureActions />
          </Step>
          <Step
            wizardTitle={t('newWithdraw.reviewProposal.heading')}
            wizardDescription={t('newWithdraw.reviewProposal.description')}
            nextButtonLabel={t('labels.submitWithdraw')}
            isNextButtonDisabled
            fullWidth
          >
            <ReviewProposal />
          </Step>
        </FullScreenStepper>

        <AddActionMenu />
      </ActionsProvider>
    </FormProvider>
  );
};

export default withTransaction('NewProposal', 'component')(NewProposal);
