import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useCallback,
} from 'react';
import {useTranslation} from 'react-i18next';

import {TransactionItem} from 'utils/types';
import TransactionModal, {TransactionState} from 'containers/transactionModal';

const TransactionsContext = createContext<TransactionsContextType | null>(null);

type TransactionsContextType = {
  transactions: TransactionItem[];
  activeIndex: number;
  setTransactionState: (value: TransactionState) => void;
  setActiveIndex: (value: number) => void;
  gotoNextAction: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  setTransactions: (value: TransactionItem[]) => void;
};

type Props = Record<'children', ReactNode>;

/**
 * This Context must refactor later and add more attributes to cover whole transactions process
 */

const TransactionsProvider: React.FC<Props> = ({children}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [transactionState, setTransactionState] = useState<TransactionState>(
    TransactionState.WAITING
  );
  const {t} = useTranslation();

  const gotoNextAction = useCallback(() => {
    setActiveIndex((oldActions: number) => oldActions + 1);
  }, []);

  const value = useMemo(
    (): TransactionsContextType => ({
      transactions,
      setTransactionState,
      setActiveIndex,
      activeIndex,
      isModalOpen,
      setIsModalOpen,
      setTransactions,
      gotoNextAction,
    }),
    [activeIndex, gotoNextAction, isModalOpen, transactions]
  );

  // const renderModal = useMemo(() => {
  //   let modal;
  //   switch (transactions[activeIndex]?.type) {
  //     case TransferTypes.Deposit:
  //       modal = (
  //         <TransactionModal
  //           title={t('TransactionModal.depositTitle')}
  //           footerButtonLabel="Sign Deposit"
  //           state={transactionState}
  //           callback={console.log}
  //           approveStepNeeded
  //         />
  //       );
  //       break;
  //     default:
  //       break;
  //   }
  //   return (
  //     <>
  //       {children}
  //       {modal}
  //     </>
  //   );
  // }, [activeIndex, children, t, transactionState, transactions]);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
      <TransactionModal
        title={t('TransactionModal.depositTitle')}
        footerButtonLabel="Sign Deposit"
        state={transactionState}
        callback={console.log}
        approveStepNeeded
      />
    </TransactionsContext.Provider>
  );
};

function useTransactionContext(): TransactionsContextType {
  return useContext(TransactionsContext) as TransactionsContextType;
}

export {useTransactionContext, TransactionsProvider};
