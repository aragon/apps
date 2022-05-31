import {useFinance} from 'hooks/useFinance';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import DepositModal from 'containers/transactionModals/DepositModal';
import {IDeposit} from '@aragon/sdk-client';
import {useFormContext} from 'react-hook-form';
import {DepositFormData} from 'pages/newDeposit';
import {TransactionState} from 'utils/constants';
import {Finance} from 'utils/paths';
import {generatePath, useMatch, useNavigate} from 'react-router-dom';
import {useNetwork} from './network';

interface IDepositContextType {
  handleOpenModal: () => void;
}

const DepositContext = createContext<IDepositContextType | null>(null);

const DepositProvider = ({children}: {children: ReactNode}) => {
  const {deposit} = useFinance();
  const {getValues} = useFormContext<DepositFormData>();
  const [depositState, setDepositState] = useState<TransactionState>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const daoMatch = useMatch(':network/:dao/*');
  const {network} = useNetwork();

  const handleSignDeposit = () => {
    setDepositState(TransactionState.LOADING);
    const {amount, tokenAddress, to, reference} = getValues();
    const dao = to || daoMatch?.params?.dao;
    if (!dao) {
      setDepositState(TransactionState.ERROR);
      return;
    }
    const depositData: IDeposit = {
      daoAddress: dao,
      amount: BigInt(Number(amount) * Math.pow(10, 18)),
      token: tokenAddress,
      reference: reference,
    };
    // TODO
    // Right now there is to clients depending on the type
    // of DAO, so the type of DAO is needed, once the new
    // contrats are released there will only be one client
    // and this parameter should be removed
    deposit(depositData, 'token-based')
      .then(() => {
        setDepositState(TransactionState.SUCCESS);
      })
      .catch(() => {
        setDepositState(TransactionState.ERROR);
      });
  };

  // Handler for modal close; don't close modal if transaction is still running
  const handleCloseModal = () => {
    const dao = daoMatch?.params?.dao;
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
