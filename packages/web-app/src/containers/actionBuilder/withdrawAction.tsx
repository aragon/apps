import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {ButtonIcon, IconMenuVertical} from '@aragon/ui-components';

import {useGlobalModalContext} from 'context/globalModals';
import {useActionsContext} from 'context/actions';
import ConfigureWithdrawForm from '../configureWithdraw';

const WithdrawAction: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {action} = useActionsContext();

  return (
    <Container>
      <Header>
        <HCWrapper>
          <Title>Withdraw Assets</Title>
          <Description>Withdraw assets from the DAO treasury</Description>
        </HCWrapper>
        <ButtonIcon
          mode="ghost"
          size="large"
          icon={<IconMenuVertical />}
          data-testid="trigger"
        />
      </Header>
      <Body>
        <ConfigureWithdrawForm />
      </Body>
    </Container>
  );
};

export default WithdrawAction;

const Container = styled.div.attrs({
  className: 'bg-ui-0 rounded-xl p-3',
})``;

const Header = styled.div.attrs({
  className: 'flex justify-between items-center',
})``;

const Body = styled.div.attrs({
  className: 'bg-ui-50 p-3 rounded-xl space-y-3 my-3',
})``;

const Title = styled.h2.attrs({
  className: 'text-base font-bold text-ui-800',
})``;

const Description = styled.p.attrs({
  className: 'text-sm text-ui-600',
})``;

const HCWrapper = styled.div.attrs({
  className: 'space-y-0.5',
})``;
