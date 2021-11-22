import React from 'react';
import styled from 'styled-components';

import {Avatar, AvatarProps} from '../avatar';
import {Button} from '../button';
import {StyledButton} from '../button/button';
import {IconSwitch} from '../icons';

export type DaoCardProps = {
  daoName: string;
  daoAddress: string;
  onClick: () => void;
} & Omit<AvatarProps, 'size'>;

//ts-ignore
export const DaoCard: React.FC<DaoCardProps> = ({
  daoName,
  daoAddress,
  onClick,
  src,
}: DaoCardProps) => {
  return (
    <Card>
      <Avatar src={src} size={'default'} />
      <TextContainer></TextContainer>
      <Button mode={'ghost'} label={'Switch'} onClick={onClick}>
        <StyledButton mode={'ghost'} size={'small'}>
          {'Switch'}
          <IconSwitch />
        </StyledButton>
      </Button>
    </Card>
  );
};

const Card = styled.div``;

const TextContainer = styled.div``;

// TODO refactor this once typography is fleshed out in design tokens [VR 22-11-2021]
const DaoName = styled.p``;
const DaoAddress = styled.p``;
