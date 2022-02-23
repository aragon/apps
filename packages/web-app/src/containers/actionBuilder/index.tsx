import React from 'react';
import {AlertInline, ButtonText, IconAdd, Label} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {useGlobalModalContext} from 'context/globalModals';
import {useActionsContext} from 'context/actions';
import WithdrawAction from './withdrawAction';

const ActionBuilder: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {action} = useActionsContext();

  return (
    <>
      <WithdrawAction />
    </>
  );
};

export default ActionBuilder;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
