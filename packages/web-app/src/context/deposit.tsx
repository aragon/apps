import {DaoDepositSteps, IDeposit} from '@aragon/sdk-client';
import {useFormContext} from 'react-hook-form';
import {generatePath, useNavigate, useParams} from 'react-router-dom';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {Finance} from 'utils/paths';
import {useClient} from 'hooks/useClient';
import {useNetwork} from './network';
import DepositModal from 'containers/transactionModals/DepositModal';
import {DepositFormData} from 'pages/newDeposit';
import {TransactionState} from 'utils/constants';
import {constants} from 'ethers';
import {useStepper} from 'hooks/useStepper';
import {usePollGasFee} from 'hooks/usePollGasfee';

interface IDepositContextType {
  handleOpenModal: () => void;
}

const DepositContext = createContext<IDepositContextType | null>(null);

const DepositProvider = ({children}: {children: ReactNode}) => {
  const {dao} = useParams();
  const navigate = useNavigate();
  const {network} = useNetwork();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [includeApproval, setIncludeApproval] = useState<boolean>(true);

  const {getValues} = useFormContext<DepositFormData>();
  const [depositState, setDepositState] = useState<TransactionState>();
  const [depositParams, setDepositParams] = useState<IDeposit>();

  const {erc20: client} = useClient();
  const {setStep: setModalStep, currentStep} = useStepper(2);

  const shouldPoll = useMemo(
    () =>
      depositParams !== undefined && depositState === TransactionState.WAITING,
    [depositParams, depositState]
  );

  const depositIterator = useMemo(() => {
    if (client && depositParams) return client.dao.deposit(depositParams);
  }, [client, depositParams]);

  const estimateDepositFees = useCallback(async () => {
    if (client && depositParams)
      return client?.estimate.deposit(depositParams as IDeposit);
  }, [client, depositParams]);

  const {tokenPrice, maxFee, averageFee, stopPolling} = usePollGasFee(
    estimateDepositFees,
    shouldPoll
  );

  const handleOpenModal = () => {
    // get deposit data from
    const {amount, tokenAddress, to, reference} = getValues();

    // validate and set deposit data
    if (!to) {
      setDepositState(TransactionState.ERROR);
      return;
    }

    setDepositParams({
      daoAddress: to,
      amount: BigInt(Number(amount) * Math.pow(10, 18)),
      token: tokenAddress,
      reference,
    });

    // determine whether to include approval step and show modal
    if (tokenAddress === constants.AddressZero) {
      setIncludeApproval(false);
      setModalStep(2);
    }

    setShowModal(true);
  };

  // Handler for modal close; don't close modal if transaction is still running
  const handleCloseModal = () => {
    switch (depositState) {
      case TransactionState.LOADING:
        break;
      case TransactionState.SUCCESS:
        navigate(generatePath(Finance, {network, dao}));
        break;
      default: {
        setShowModal(false);
        stopPolling();
        setDepositState(TransactionState.WAITING);
      }
    }
  };

  const handleApproval = async () => {
    // Check if SDK initialized properly
    if (!client) {
      throw new Error('SDK client is not initialized correctly');
    }

    // Check if deposit function is initialized
    if (!depositIterator) {
      throw new Error('deposit function is not initialized correctly');
    }

    try {
      setDepositState(TransactionState.LOADING);

      // run approval steps
      for (let step = 0; step < 3; step++) {
        await depositIterator.next();
      }

      // update modal button and transaction state
      setModalStep(2);
      setDepositState(TransactionState.WAITING);
    } catch (error) {
      console.error(error);
      setDepositState(TransactionState.ERROR);
    }
  };

  const handleDeposit = async () => {
    let transactionHash = '';

    // Check if SDK initialized properly
    if (!client) {
      throw new Error('SDK client is not initialized correctly');
    }

    // Check if deposit function is initialized
    if (!depositIterator) {
      throw new Error('deposit function is not initialized correctly');
    }

    try {
      setDepositState(TransactionState.LOADING);

      if (includeApproval) {
        for (let step = 0; step < 2; step++) {
          transactionHash = (await depositIterator.next()).value as string;
        }
      } else {
        for await (const step of depositIterator) {
          if (step.key === DaoDepositSteps.DEPOSITING) {
            transactionHash = step.txHash;
          }
        }
      }

      setDepositState(TransactionState.SUCCESS);
      console.log(transactionHash);
    } catch (error) {
      console.error(error);
      setDepositState(TransactionState.ERROR);
    }
  };

  return (
    <DepositContext.Provider value={{handleOpenModal}}>
      {children}
      <DepositModal
        {...{
          currentStep,
          includeApproval,
          handleDeposit,
          handleApproval,
          maxFee,
          averageFee,
          tokenPrice,
        }}
        state={depositState || TransactionState.WAITING}
        isOpen={showModal}
        onClose={handleCloseModal}
        closeOnDrag={depositState !== TransactionState.LOADING}
        depositAmount={depositParams?.amount as bigint}
        tokenAddress={depositParams?.token as string}
      />
    </DepositContext.Provider>
  );
};

function useDepositDao(): IDepositContextType {
  return useContext(DepositContext) as IDepositContextType;
}

export {useDepositDao, DepositProvider};
