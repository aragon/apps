import {ICreateProposal} from '@aragon/sdk-client';

import React, {useState, useCallback, useMemo} from 'react';
import {constants} from 'ethers';
import {parseUnits} from 'ethers/lib/utils';
import {generatePath, useNavigate} from 'react-router-dom';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {useQuery} from '@apollo/client';

import PublishModal from 'containers/transactionModals/publishModal';
import {TransactionState} from 'utils/constants';
import {Governance} from 'utils/paths';
import {useClient} from 'hooks/useClient';
import {usePollGasFee} from 'hooks/usePollGasfee';
import {DAO_BY_ADDRESS} from 'queries/dao';
import {client} from './apolloClient';
import {useNetwork} from './network';
import {useDaoParam} from 'hooks/useDaoParam';
import {Loading} from 'components/temporary';
import {useWallet} from 'hooks/useWallet';
import {useGlobalModalContext} from './globalModals';

type Props = {
  showTxModal: boolean;
  setShowTxModal: (value: boolean) => void;
};

const CreateProposalProvider: React.FC<Props> = ({
  showTxModal,
  setShowTxModal,
  children,
}) => {
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {getValues} = useFormContext();
  const {t} = useTranslation();
  const {isOnWrongNetwork} = useWallet();
  const {open} = useGlobalModalContext();

  const {data: dao, loading} = useDaoParam();
  const {erc20: erc20Client, whitelist: whitelistClient} = useClient();
  const {data, loading: daoDetailsLoading} = useQuery(DAO_BY_ADDRESS, {
    variables: {id: dao},
    client: client[network],
  });

  const [creationProcessState, setCreationProcessState] =
    useState<TransactionState>(TransactionState.WAITING);

  const shouldPoll = useMemo(
    () => creationProcessState === TransactionState.WAITING,
    [creationProcessState]
  );

  const estimateCreationFees = useCallback(async () => {
    const {__typename: type, id: votingAddress} = data?.dao?.packages[0].pkg;

    return type === 'WhitelistPackage'
      ? erc20Client?.estimate.createProposal(votingAddress, {
          metadata: constants.AddressZero,
        })
      : whitelistClient?.estimate.createProposal(votingAddress, {
          metadata: constants.AddressZero,
        });
  }, [data?.dao?.packages, erc20Client?.estimate, whitelistClient?.estimate]);

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
        setShowTxModal(false);
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
      actions: encodeActions(),
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
      actions: encodeActions(),
    };

    return whitelistClient.dao.whitelist.createProposal(
      votingAddress,
      proposalCreationParams
    );
  };

  const encodeActions = () => {
    const actions = getValues().actions;
    return actions.map((action: Record<string, string>) => {
      if (action.name === 'withdraw_assets') {
        // doesn't matter which client we use to encode actions, both are the same
        return erc20Client?.actions.withdraw(
          action.to,
          BigInt(parseUnits(action.amount, 18).toBigInt()),
          {
            to: action.to,
            token: action.tokenAddress,
            amount: BigInt(parseUnits(action.amount, 18).toBigInt()),
            reference: action.reference,
          }
        );
      }
    });
  };

  const handlePublishProposal = async () => {
    if (creationProcessState === TransactionState.SUCCESS) {
      handleCloseModal();
      return;
    }

    if (isOnWrongNetwork) {
      open('network');
      handleCloseModal();
      return;
    }

    const {__typename: type, id: votingAddress} = data?.dao?.packages[0].pkg;
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

  if (loading || daoDetailsLoading) {
    return <Loading />;
  }

  return (
    <>
      {children}
      <PublishModal
        state={creationProcessState || TransactionState.WAITING}
        isOpen={showTxModal}
        onClose={handleCloseModal}
        callback={handlePublishProposal}
        closeOnDrag={creationProcessState !== TransactionState.LOADING}
        maxFee={maxFee}
        averageFee={averageFee}
        tokenPrice={tokenPrice}
        title={t('TransactionModal.createProposal')}
        buttonLabel={t('TransactionModal.createProposalNow')}
      />
    </>
  );
};

export {CreateProposalProvider};
