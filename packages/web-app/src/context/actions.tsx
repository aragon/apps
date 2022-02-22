import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from 'react';

import {Address} from '@aragon/ui-components/dist/utils/addresses';
import {ActionItem} from 'utils/types';

const ActionsContext = createContext<ActionsContextType | null>(null);

type ActionsContextType = {
  daoAddress: Address;
  action?: ActionItem;
  setAction: (value: ActionItem) => void;
  setDaoAddress: (value: string) => void;
};

type Props = Record<'children', ReactNode>;

const ActionsProvider: React.FC<Props> = ({children}) => {
  const [daoAddress, setDaoAddress] =
    useState<ActionsContextType['daoAddress']>('');
  const [action, setAction] = useState<ActionsContextType['action']>();

  const value = useMemo(
    (): ActionsContextType => ({
      daoAddress,
      action,
      setDaoAddress,
      setAction,
    }),
    [action, daoAddress]
  );

  return (
    <ActionsContext.Provider value={value}>{children}</ActionsContext.Provider>
  );
};

function useActionsContext(): ActionsContextType {
  return useContext(ActionsContext) as ActionsContextType;
}

export {useActionsContext, ActionsProvider};
