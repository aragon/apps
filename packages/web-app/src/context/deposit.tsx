import {IDeposit} from '@aragon/sdk-client';
import {useFormContext} from 'react-hook-form';
import {generatePath, useNavigate, useParams} from 'react-router-dom';
import React, {createContext, ReactNode, useContext, useState} from 'react';

import {Finance} from 'utils/paths';
import {useClient} from 'hooks/useClient';
import {useNetwork} from './network';
import DepositModal from 'containers/transactionModals/DepositModal';
import {DepositFormData} from 'pages/newDeposit';
import {TransactionState} from 'utils/constants';

interface IDepositContextType {
  handleOpenModal: () => void;
}

const DepositContext = createContext<IDepositContextType | null>(null);

const DepositProvider = ({children}: {children: ReactNode}) => {
  const {getValues} = useFormContext<DepositFormData>();
  const [depositState, setDepositState] = useState<TransactionState>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const {dao} = useParams();
  const navigate = useNavigate();
  const {network} = useNetwork();
  const {erc20: client} = useClient();

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

  // Handler for modal close; don't close modal if transaction is still running
  const handleCloseModal = () => {
    switch (depositState) {
      case TransactionState.LOADING:
        break;
      case TransactionState.SUCCESS:
        navigate(generatePath(Finance, {network, dao}));
        break;
      default:
        setShowModal(false);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

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
