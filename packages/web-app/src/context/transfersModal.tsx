import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

const TransferModalContext = createContext<TransferModalContextType | null>(
  null
);

type TransferModalContextType = {
  isTransferOpen: boolean;
  isTokenOpen: boolean;
  open: (arg?: string) => void;
  close: (arg?: string) => void;
};

type Props = Record<'children', ReactNode>;

const TransferModalsProvider: React.FC<Props> = ({children}) => {
  const [isTransferOpen, setIsTransferOpen] =
    useState<TransferModalContextType['isTransferOpen']>(false);
  const [isTokenOpen, setIsTokenOpen] =
    useState<TransferModalContextType['isTokenOpen']>(false);

  const open = (type?: string) => {
    switch (type) {
      case 'token':
        setIsTokenOpen(true);
        break;
      default:
        setIsTransferOpen(true);
        break;
    }
  };

  const close = (type?: string) => {
    switch (type) {
      case 'token':
        setIsTokenOpen(false);
        break;
      default:
        setIsTransferOpen(false);
        break;
    }
  };

  const value = useMemo(
    (): TransferModalContextType => ({
      isTransferOpen,
      isTokenOpen,
      open,
      close,
    }),
    [isTransferOpen, isTokenOpen]
  );

  return (
    <TransferModalContext.Provider value={value}>
      {children}
    </TransferModalContext.Provider>
  );
};

function useTransferModalContext(): TransferModalContextType {
  return useContext(TransferModalContext) as TransferModalContextType;
}

export {useTransferModalContext, TransferModalsProvider};
