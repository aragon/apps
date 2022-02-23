import React from 'react';

import {useActionsContext} from 'context/actions';
import WithdrawAction from './withdrawAction';
import {ActionsTypes} from 'utils/types';
import {AddActionItems} from '../addActionMenu';

const ActionBuilder: React.FC = () => {
  const {actions} = useActionsContext();

  const actionsComponents = (name: ActionsTypes, index: number) => {
    switch (name) {
      case AddActionItems.WITHDRAW_ASSETS:
        return <WithdrawAction key={index} {...{index}} />;
    }
  };

  return (
    <>
      {actions.map((action, index: number) =>
        actionsComponents(action.name, index)
      )}
    </>
  );
};

export default ActionBuilder;
