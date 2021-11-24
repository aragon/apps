import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {ActionListItem, DaoCard, IconLinkExternal} from '@aragon/ui-components';

type DaoSwitcherMenuProps = {
  daos?: {name: string; ens: string; icon: string}[];

  // Note: This onClick function must be called to close the popover
  onClick: () => void;
};

const DaoSwitcherMenu: React.FC<DaoSwitcherMenuProps> = ({
  daos = [],
  onClick,
}) => {
  const {t} = useTranslation();

  return (
    <Container>
      <DaoListContainer tabIndex={0}>
        {daos.map(({name, ens, icon}) => (
          <div key={name}>
            <DaoCard
              daoAddress={ens}
              daoName={name}
              includeSwitch={false}
              onClick={onClick}
              src={icon}
              switchLabel={t('daoCard.switchLabel')}
              wide
            />
          </div>
        ))}
      </DaoListContainer>
      <ActionListItem
        icon={<IconLinkExternal />}
        onClick={onClick}
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
