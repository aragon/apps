import {constants} from 'ethers';
import {useTranslation} from 'react-i18next';
import {withTransaction} from '@elastic/apm-rum-react';
import React, {useCallback, useMemo, useState} from 'react';
import {useForm, FormProvider, useFormState} from 'react-hook-form';
import {generatePath, useNavigate} from 'react-router-dom';

import {Governance} from 'utils/paths';
import AddActionMenu from 'containers/addActionMenu';
import ReviewProposal from 'containers/reviewProposal';
import {TransactionState} from 'utils/constants';
import ConfigureActions from 'containers/configureActions';
import {ActionsProvider} from 'context/actions';
import {FullScreenStepper, Step} from 'components/fullScreenStepper';
import DefineProposal, {
  isValid as defineProposalIsValid,
} from 'containers/defineProposal';
import SetupVotingForm, {
  isValid as setupVotingIsValid,
} from 'containers/setupVotingForm';
import {useNetwork} from 'context/network';
import {useDaoParam} from 'hooks/useDaoParam';
import {Loading} from 'components/temporary';
import {useClient} from 'hooks/useClient';
import {ICreateProposal} from '@aragon/sdk-client';
import {useQuery} from '@apollo/client';
import {client} from 'context/apolloClient';
import {DAO_BY_ADDRESS} from 'queries/dao';
import PublishModal from 'containers/transactionModals/publishModal';
import {usePollGasFee} from 'hooks/usePollGasfee';

const NewProposal: React.FC = () => {
  const {data: dao, loading} = useDaoParam();

  const {t} = useTranslation();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const formMethods = useForm({
    mode: 'onChange',
  });
  const {errors, dirtyFields} = useFormState({
    control: formMethods.control,
  });
  const [durationSwitch] = formMethods.getValues(['durationSwitch']);

  const {erc20: erc20Client, whitelist: whitelistClient} = useClient();
  const {data} = useQuery(DAO_BY_ADDRESS, {
    variables: {id: dao},
    client: client[network],
  });

  const [showModal, setShowModal] = useState(false);
  const [creationProcessState, setCreationProcessState] =
    useState<TransactionState>(TransactionState.WAITING);

  const shouldPoll = useMemo(
    () => creationProcessState === TransactionState.WAITING,
    [creationProcessState]
  );

  const estimateCreationFees = useCallback(async () => {
    const {__typename: type, id: votingAddress} = data.dao?.packages[0].pkg;

    return type === 'WhitelistPackage'
      ? erc20Client?.estimate.createProposal(votingAddress, {
          metadata: constants.AddressZero,
        })
      : whitelistClient?.estimate.createProposal(votingAddress, {
          metadata: constants.AddressZero,
        });
  }, [data.dao?.packages, erc20Client?.estimate, whitelistClient?.estimate]);

  const {tokenPrice, maxFee, averageFee, stopPolling} = usePollGasFee(
    estimateCreationFees,
    shouldPoll
  );

  const handleCloseModal = () => {
    switch (creationProcessState) {
      case TransactionState.LOADING:
        break;
      case TransactionState.SUCCESS:
        navigate(generatePath(Governance, {network, dao}));
        break;
      default: {
        setCreationProcessState(TransactionState.WAITING);
        setShowModal(false);
        stopPolling();
      }
    }
  };

  const createErc20VotingProposal = async (votingAddress: string) => {
    if (!erc20Client) {
      return Promise.reject(
        new Error('ERC20 SDK client is not initialized correctly')
      );
    }

    const proposalCreationParams: ICreateProposal = {
      metadata: constants.AddressZero,
    };

    return erc20Client.dao.simpleVote.createProposal(
      votingAddress,
      proposalCreationParams
    );
  };

  const createWhitelistVotingProposal = async (votingAddress: string) => {
    if (!whitelistClient) {
      return Promise.reject(
        new Error('ERC20 SDK client is not initialized correctly')
      );
    }

    const proposalCreationParams: ICreateProposal = {
      metadata: constants.AddressZero,
    };

    return whitelistClient.dao.whitelist.createProposal(
      votingAddress,
      proposalCreationParams
    );
  };

  const handlePublishProposal = async () => {
    if (creationProcessState === TransactionState.SUCCESS) {
      handleCloseModal();
      return;
    }

    const {__typename: type, id: votingAddress} = data.dao?.packages[0].pkg;
    setCreationProcessState(TransactionState.LOADING);

    if (type === 'WhitelistPackage') {
      try {
        await createWhitelistVotingProposal(votingAddress);
        setCreationProcessState(TransactionState.SUCCESS);
      } catch (error) {
        console.error(error);
        setCreationProcessState(TransactionState.ERROR);
      }
    } else {
      try {
        await createErc20VotingProposal(votingAddress);
        setCreationProcessState(TransactionState.SUCCESS);
      } catch (error) {
        console.error(error);
        setCreationProcessState(TransactionState.ERROR);
      }
    }
  };

  /*************************************************
   *                    Render                     *
   *************************************************/

  if (loading) {
    return <Loading />;
  }

  return (
    <FormProvider {...formMethods}>
      <ActionsProvider>
        <FullScreenStepper
          wizardProcessName={t('newProposal.title')}
          navLabel={t('newProposal.title')}
          returnPath={generatePath(Governance, {network, dao})}
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
            isNextButtonDisabled={!setupVotingIsValid(errors, durationSwitch)}
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
            onNextButtonClicked={() => setShowModal(true)}
            fullWidth
          >
            <ReviewProposal />
          </Step>
        </FullScreenStepper>

        <AddActionMenu />
      </ActionsProvider>
      <PublishModal
        state={creationProcessState || TransactionState.WAITING}
        isOpen={showModal}
        onClose={handleCloseModal}
        callback={handlePublishProposal}
        closeOnDrag={creationProcessState !== TransactionState.LOADING}
        maxFee={maxFee}
        averageFee={averageFee}
        tokenPrice={tokenPrice}
        title={t('TransactionModal.createProposal')}
        buttonLabel={t('TransactionModal.createProposalNow')}
      />
    </FormProvider>
  );
};

export default withTransaction('NewProposal', 'component')(NewProposal);
