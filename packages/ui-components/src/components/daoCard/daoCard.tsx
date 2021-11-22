import React from 'react';
import styled from 'styled-components';

import {Address, shortenAddress} from '../../utils/addresses';
import {Avatar, AvatarProps} from '../avatar';
import {StyledButton} from '../button/button';
import {FlexDiv} from '../button/iconButton';
import {IconSwitch} from '../icons';

export type DaoCardProps = {
  daoName: string;
  daoAddress: Address;
  onClick: () => void;
} & Pick<AvatarProps, 'src'>;

export const DaoCard: React.FC<DaoCardProps> = ({
  daoName,
  daoAddress,
  onClick,
  src,
}: DaoCardProps) => {
  return (
    <Card>
      <Avatar src={src} mode={'square'} size={'large'} />
      <TextContainer>
        <DaoName>{daoName}</DaoName>
        <DaoAddress>{shortenAddress(daoAddress)}</DaoAddress>
      </TextContainer>
      <StyledButton mode={'ghost'} size={'small'} onClick={onClick}>
        <FlexDiv side={'right'}>
          <IconSwitch />
          <p>{'Switch'}</p>
        </FlexDiv>
      </StyledButton>
    </Card>
  );
};

const Card = styled.div.attrs({className: 'inline-flex'})``;

const TextContainer = styled.div.attrs({
  className: 'pl-1.5 pr-2',
})``;

const DaoName = styled.p.attrs({
  className: 'text-ui-800 font-bold text-base',
})``;
const DaoAddress = styled.p.attrs({
  className: 'text-ui-400 font-normal text-sm',
})``;
