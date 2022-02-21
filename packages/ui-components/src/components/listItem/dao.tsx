import React from 'react';
import styled from 'styled-components';
import {Address} from '../../utils/addresses';
import {AvatarDao} from '../avatar';

import {IconCheckboxDefault, IconCheckboxSelected} from '../icons';

export type ListItemDaoProps = {
  daoAddress: Address;
  daoLogo?: string;
  daoName: string;
  value?: string | Address;
  selected?: boolean;
  onClick: (value: string) => void;
};

export const ListItemDao: React.FC<ListItemDaoProps> = ({...props}) => {
  return (
    <button className="flex items-center p-2 space-x-2 rounded-xl border">
      <AvatarDao daoName={props.daoName} src={props.daoLogo} />
    </button>
  );
};

const Container = styled.button.attrs({
  className: 'w-full',
})``;
