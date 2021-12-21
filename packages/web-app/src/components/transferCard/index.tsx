import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {IconChevronRight} from '@aragon/ui-components';

import {capitalize} from 'utils/strings';

// TODO: If moved to ui-components, add separate label props for to and from
type TransferCardProps = {
  from: string;
  to: string;
};
const TransferCard: React.FC<TransferCardProps> = ({to, from, ...props}) => {
  const {t} = useTranslation();

  return (
    <Container {...props}>
      <Card>
        <Label>{capitalize(t('TransferCard.fromLabel'))}</Label>
        <Address>{from}</Address>
      </Card>
      <IconChevronRight className="text-ui-600" />
      <Card>
        <Label>{capitalize(t('TransferCard.toLabel'))}</Label>
        <Address>{to}</Address>
      </Card>
    </Container>
  );
};

export default TransferCard;

const Container = styled.div.attrs({
  className: 'flex items-center space-x-1',
})``;

const Card = styled.div.attrs({
  className: 'flex-1 py-1.5 px-2 min-w-0 text-left bg-ui-0 rounded-xl',
})``;

const Label = styled.p.attrs({
  className: 'text-sm text-ui-500',
})``;

const Address = styled.p.attrs({
  className:
    'overflow-hidden font-bold text-ui-800 overflow-ellipsis whitespace-nowrap',
})``;
