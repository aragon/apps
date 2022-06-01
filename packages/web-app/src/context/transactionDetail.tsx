import TransactionDetail from 'containers/transactionDetail';
import React, {useCallback} from 'react';
import {createContext, useState} from 'react';

import {Transfer} from 'utils/types';

const TransactionDetailContext =
  createContext<TransactionDetailContextType | null>(null);

type TransactionDetailContextType = {
  handleTransferClicked: (transfer: Transfer) => void;
};

const TransactionDetailProvider: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
  const [selectedTransfer, setSelectedTransfer] = useState<Transfer>(
    {} as Transfer
  );
  const [showTransactionDetail, setShowTransactionDetail] =
    useState<boolean>(false);

  const handleTransferClicked = useCallback((transfer: Transfer) => {
    setSelectedTransfer(transfer);
    setShowTransactionDetail(true);
  }, []);

  return (
    <TransactionDetailContext.Provider value={{handleTransferClicked}}>
      {children}
      <TransactionDetail
        isOpen={showTransactionDetail}
        onClose={() => setShowTransactionDetail(false)}
        transfer={selectedTransfer}
      />
    </TransactionDetailContext.Provider>
  );
};

function useTransactionDetailContext(): TransactionDetailContextType {
  const context = React.useContext(TransactionDetailContext);
  if (context === undefined) {
    throw new Error(
      'useTransactionDetailContext must be used within a TransactionDetailProvider'
    );
  }
  return context as TransactionDetailContextType;
}

export {useTransactionDetailContext, TransactionDetailProvider};
