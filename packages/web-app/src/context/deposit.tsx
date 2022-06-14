import {IDeposit} from '@aragon/sdk-client';
import {useFormContext} from 'react-hook-form';
import {generatePath, useNavigate, useParams} from 'react-router-dom';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import {Finance} from 'utils/paths';
import {useClient} from 'hooks/useClient';
import {useWallet} from 'hooks/useWallet';
import {useNetwork} from './network';
import DepositModal from 'containers/transactionModals/DepositModal';
import {DepositFormData} from 'pages/newDeposit';
import {TransactionState} from 'utils/constants';
import {useGlobalModalContext} from './globalModals';

interface IDepositContextType {
  handleOpenModal: () => void;
}

const DepositContext = createContext<IDepositContextType | null>(null);

const DepositProvider = ({children}: {children: ReactNode}) => {
  const {dao} = useParams();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {getValues} = useFormContext<DepositFormData>();
  const [depositState, setDepositState] = useState<TransactionState>();
  const {erc20: client} = useClient();
  const {isOnWrongNetwork} = useWallet();
  const [showModal, setShowModal] = useState<boolean>(false);
  const {open, close, isNetworkOpen} = useGlobalModalContext();

  /*************************************************
   *             Helpers and Handlers              *
   *************************************************/
  const handleOpenModal = useCallback(() => {
    setDepositState(TransactionState.WAITING);
    setShowModal(true);
  }, []);

  // Handler for deposit modal close
  // don't close modal if transaction is still running
  const handleCloseModal = useCallback(() => {
    switch (depositState) {
      case TransactionState.LOADING:
        break;
      case TransactionState.SUCCESS:
        navigate(generatePath(Finance, {network, dao}), {
          state: {refetch: true},
        });
        break;
      default:
        setShowModal(false);
    }
  }, [dao, depositState, navigate, network]);

  // Sign and run deposit
  const handleSignDeposit = async () => {
    setDepositState(TransactionState.LOADING);

    const {amount, tokenAddress, to, reference} = getValues();

    if (!to) {
      setDepositState(TransactionState.ERROR);
      return;
    }

    const depositData: IDeposit = {
      daoAddress: to,
      amount: BigInt(Number(amount) * Math.pow(10, 18)),
      token: tokenAddress,
      reference: reference,
    };

    // TODO
    // Right now there is to clients depending on the type
    // of DAO, so the type of DAO is needed, once the new
    // contracts are released there will only be one client
    // and this parameter should be removed
    if (!client) {
      throw new Error('SDK client is not initialized correctly');
    }

    try {
      await client.dao.deposit(depositData);
      setDepositState(TransactionState.SUCCESS);
    } catch (error) {
      console.error(error);
      setDepositState(TransactionState.ERROR);
    }
  };

  /*************************************************
   *               Lifecycle hooks                 *
   *************************************************/
  useEffect(() => {
    // resolve network mismatch when transaction is
    // ready to execute or loading. Why user would change
    // network while loading is anyone's guess really.
    // Also, should probably extract into a hook for other flows
    if (
      isOnWrongNetwork &&
      (depositState === TransactionState.WAITING ||
        depositState === TransactionState.LOADING)
    ) {
      open('network');
      handleCloseModal();
      return;
    }

    // close switch network modal and continue with flow
    if (!isOnWrongNetwork && isNetworkOpen) {
      close('network');
      handleOpenModal();
    }
  }, [
    close,
    depositState,
    handleCloseModal,
    handleOpenModal,
    isNetworkOpen,
    isOnWrongNetwork,
    open,
  ]);

  /*************************************************
   *                   Render                      *
   *************************************************/
  return (
    <DepositContext.Provider value={{handleOpenModal}}>
      {children}
      <DepositModal
        callback={handleSignDeposit}
        state={depositState || TransactionState.WAITING}
        isOpen={showModal}
        onClose={handleCloseModal}
        closeOnDrag={depositState !== TransactionState.LOADING}
      />
    </DepositContext.Provider>
  );
};

function useDepositDao(): IDepositContextType {
  return useContext(DepositContext) as IDepositContextType;
}

export {useDepositDao, DepositProvider};
