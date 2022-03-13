import React, {useEffect, useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import {useForm, FormProvider, useFormState, useWatch} from 'react-hook-form';
import {constants} from 'ethers';

import {FullScreenStepper, Step} from 'components/fullScreenStepper';
import SetupVotingForm from 'containers/setupVotingForm';
import DefineProposal from 'containers/defineProposal';
import ConfigureActions from 'containers/configureActions';
import AddActionMenu from 'containers/addActionMenu';

import {useWallet} from 'context/augmentedWallet';
import {useWalletProps} from 'containers/walletMenu';
import {TransferTypes} from 'utils/constants';
import {Governance} from 'utils/paths';
import {ActionsProvider} from 'context/actions';

const NewProposal: React.FC = () => {
  const {t} = useTranslation();
  const formMethods = useForm({
    mode: 'onChange',
  });
  const {errors, dirtyFields} = useFormState({control: formMethods.control});
  const {account}: useWalletProps = useWallet();
  const endDateType = formMethods.getValues('durationSwitch');

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const defineProposalIsValid = useMemo(() => {
    // required fields not dirty
    if (
      !dirtyFields.proposalTitle ||
      !dirtyFields.proposalSummary ||
      errors.proposalTitle ||
      errors.proposalSummary
    )
      return false;
    return true;
  }, [
    dirtyFields.proposalSummary,
    dirtyFields.proposalTitle,
    errors.proposalSummary,
    errors.proposalTitle,
  ]);

  const setupVotingFormIsValid = useMemo(() => {
    if (endDateType === 'date') {
      return errors.startDate || errors.startTime || errors.endDate
        ? false
        : true;
    }
    return errors.startDate || errors.startTime || errors.duration
      ? false
      : true;
  }, [
    endDateType,
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
            isNextButtonDisabled={!defineProposalIsValid}
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
        </FullScreenStepper>

        <AddActionMenu />
      </ActionsProvider>
    </FormProvider>
  );
};

export default withTransaction('NewProposal', 'component')(NewProposal);
