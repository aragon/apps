import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

import {TransactionItem} from 'utils/types';
import {TransactionState, TransferTypes} from 'utils/constants';
import PublishDaoModal from 'containers/transactionModals/publishDao';

const TransactionsContext = createContext<TransactionsContextType | null>(null);

type TransactionsContextType = {
  transaction?: TransactionItem;
  setTransactionState: (value: TransactionState) => void;
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
    TransactionState.ERROR
  );

  const value = useMemo(
    (): TransactionsContextType => ({
      transaction,
      setTransactionState,
      setTransaction,
    }),
    [transaction]
  );

  const renderModal = useMemo(() => {
    let modal;
    // This switch case will halp us to pass different modals for different types of transactions
    switch (transaction?.type) {
      case TransferTypes.Deposit:
        modal = (
          <PublishDaoModal
            state={transactionState}
            callback={console.log}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
        break;
      default:
        modal = (
          <PublishDaoModal
            state={transactionState}
            callback={console.log}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        );
        break;
    }
    return (
      <>
        {children}
        {modal}
      </>
    );
  }, [children, transactionState, transaction, isModalOpen]);

  return (
    <TransactionsContext.Provider value={value}>
      {renderModal}
    </TransactionsContext.Provider>
  );
};

function useTransactionContext(): TransactionsContextType {
  return useContext(TransactionsContext) as TransactionsContextType;
}

export {useTransactionContext, TransactionsProvider};
