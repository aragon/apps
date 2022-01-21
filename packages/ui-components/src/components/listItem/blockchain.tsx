import React, {useState} from 'react';
import styled from 'styled-components';

import {Badge} from '../badge';
import {IconRadioDefault, IconSuccess} from '../icons';

export type ListItemBlockchainProps = {
  selected?: boolean;
  domain: string;
  logo: string;
  name: string;
  tag?: string;
  onClick?: (selectedState: boolean) => void;
};

export const ListItemBlockchain: React.FC<ListItemBlockchainProps> = ({
  onClick,
  ...props
}) => {
  const [selected, setSelected] = useState(props.selected || false);

  const handleOnClick = () => {
    const newState = !selected;
    setSelected(newState);
    onClick?.(newState);
  };

  return (
    <Container onClick={handleOnClick} selected={selected} {...props}>
      <Logo src={props.logo} alt="logo" />
      <Content>
        <Domain selected={selected}>{props.name}</Domain>
        <Name>{props.domain}</Name>
      </Content>
      {props.tag && <Badge label={props.tag} colorScheme="info" />}
      {selected ? (
        <IconSuccess width={20} height={20} className="text-primary-500" />
      ) : (
        <IconRadioDefault width={20} height={20} className="text-ui-400" />
      )}
    </Container>
  );
};

type SelectedProps = {
  selected: boolean;
};
const Container = styled.div.attrs(({selected}: SelectedProps) => {
  const className = `${
    selected ? 'bg-ui-0' : 'bg-ui-50'
  } flex items-center p-2 space-x-2 cursor-pointer`;
  return {className};
})<SelectedProps>``;

const Domain = styled.p.attrs(({selected}: SelectedProps) => ({
  className: `${selected ? 'text-primary-500' : 'text-ui-600'} font-bold`,
}))<SelectedProps>``;

const Name = styled.p.attrs({className: 'text-sm text-ui-500'})``;

const Logo = styled.img.attrs({className: 'w-6 h-6'})``;

const Content = styled.div.attrs({className: 'flex-1'})``;
