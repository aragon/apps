import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';
import {useTranslation} from 'react-i18next';

import {TransactionItem} from 'utils/types';
import {TransactionState, TransferTypes} from 'utils/constants';
import PublishDaoModal from 'containers/transactionModals/publishDao';

const TransactionsContext = createContext<TransactionsContextType | null>(null);

type TransactionsContextType = {
  transaction?: TransactionItem;
  setTransactionState: (value: TransactionState) => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setTransaction: (value: TransactionItem) => void;
};

type Props = Record<'children', ReactNode>;

/**
 * This Context must refactor later and add more attributes to cover whole transactions process
 */

const TransactionsProvider: React.FC<Props> = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transaction, setTransaction] = useState<TransactionItem>();
  const [transactionState, setTransactionState] = useState<TransactionState>(
    TransactionState.WAITING
  );
  const {t} = useTranslation();

  const value = useMemo(
    (): TransactionsContextType => ({
      transaction,
      setTransactionState,
      isModalOpen,
      setIsModalOpen,
      setTransaction,
    }),
    [isModalOpen, transaction]
  );

  const renderModal = useMemo(() => {
    let modal;
    switch (transaction?.type) {
      case TransferTypes.Deposit:
        modal = (
          <PublishDaoModal
            title={t('TransactionModal.publishDao')}
            footerButtonLabel="Sign Deposit"
            state={transactionState}
            callback={console.log}
            approveStepNeeded
          />
        );
        break;
      default:
        break;
    }
    return (
      <>
        {children}
        {modal}
      </>
    );
  }, [children, t, transactionState, transaction]);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
      <PublishDaoModal
        title={t('TransactionModal.publishDao')}
        state={transactionState}
        callback={console.log}
      />
    </TransactionsContext.Provider>
  );
};

function useTransactionContext(): TransactionsContextType {
  return useContext(TransactionsContext) as TransactionsContextType;
}

export {useTransactionContext, TransactionsProvider};
