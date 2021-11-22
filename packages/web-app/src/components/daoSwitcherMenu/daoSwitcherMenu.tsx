import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {ActionListItem} from '@aragon/ui-components';

type DaoSwitcherMenuProps = {
  daos?: {name: string; ens: string; icon: string}[];
};

const DaoSwitcherMenu: React.FC<DaoSwitcherMenuProps> = ({daos = []}) => {
  const {t} = useTranslation();

  return (
    <Container>
      <DaoListContainer>
        {daos.map(({name, ens, icon}) => (
          <div tabIndex={0} key={name} className="flex space-x-1 border">
            <p>{name}</p>
            <p>{ens}</p>
            <p>{icon}</p>
          </div>
        ))}
      </DaoListContainer>
      <ActionListItem
        title={t('daoSwitcher.title')}
        subtitle={t('daoSwitcher.subtitle')}
        wide
      />
    </Container>
  );
};

export default DaoSwitcherMenu;

const Container = styled.div.attrs({className: 'space-y-3'})`
  padding: 20px 16px;
`;
const DaoListContainer = styled.div.attrs({className: 'space-y-2'})``;
