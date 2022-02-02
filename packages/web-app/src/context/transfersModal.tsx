import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

const GlobalModalContext = createContext<GlobalModalContextType | null>(null);

type GlobalModalContextType = {
  isTransferOpen: boolean;
  isTokenOpen: boolean;
  isUtcOpen: boolean;
  open: (arg?: MenuTypes) => void;
  close: (arg?: MenuTypes) => void;
};

type MenuTypes = 'token' | 'utc' | 'default';

type Props = Record<'children', ReactNode>;

/* TODO This should be reworked to have one state that holds the open menu,
instead of one boolean state for each of the menus. This can be done based on a
type like MenuType. Then this context can be extended simply by adding a new
type to MenuTypes. */
const GlobalModalsProvider: React.FC<Props> = ({children}) => {
  const [isTransferOpen, setIsTransferOpen] =
    useState<GlobalModalContextType['isTransferOpen']>(false);
  const [isTokenOpen, setIsTokenOpen] =
    useState<GlobalModalContextType['isTokenOpen']>(false);
  const [isUtcOpen, setIsUtcOpen] =
    useState<GlobalModalContextType['isUtcOpen']>(false);

  const open = (type?: MenuTypes) => {
    switch (type) {
      case 'token':
        setIsTokenOpen(true);
        break;
      case 'utc':
        setIsUtcOpen(true);
        break;
      default:
        setIsTransferOpen(true);
        break;
    }
  };

  const close = (type?: MenuTypes) => {
    switch (type) {
      case 'token':
        setIsTokenOpen(false);
        break;
      case 'utc':
        setIsUtcOpen(false);
        break;
      default:
        setIsTransferOpen(false);
        break;
    }
  };
  /**
   * TODO: ==============================================
   * I used this context for managing all modals but we should
   * categories the modal pages and organize it in a better way
   *====================================================
   */
  // Since the modals can not be open at the same time, I actually think this is
  // a good solution. Keeps the logic in one place and makes it simply to
  // extend. [VR 10-01-2022]

  const value = useMemo(
    (): GlobalModalContextType => ({
      isTransferOpen,
      isTokenOpen,
      isUtcOpen,
      open,
      close,
    }),
    [isTransferOpen, isTokenOpen, isUtcOpen]
  );

  return (
    <GlobalModalContext.Provider value={value}>
      {children}
    </GlobalModalContext.Provider>
  );
};

function useGlobalModalContext(): GlobalModalContextType {
  return useContext(GlobalModalContext) as GlobalModalContextType;
}

export {useGlobalModalContext, GlobalModalsProvider};
