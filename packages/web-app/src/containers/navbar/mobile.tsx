import {
  AvatarDao,
  ButtonIcon,
  ButtonText,
  ButtonWallet,
  IconMenu,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {useReactiveVar} from '@apollo/client';

import useScreen from 'hooks/useScreen';
import MobileMenu from './mobileMenu';
import {useWallet} from 'hooks/useWallet';
import {selectedDAO} from 'context/apolloClient';
import NetworkIndicator from './networkIndicator';
import {useGlobalModalContext} from 'context/globalModals';

type MobileNavProps = {
  isProcess?: boolean;
  onDaoSelect: () => void;
  onWalletClick: () => void;
};

const MobileNav: React.FC<MobileNavProps> = props => {
  const {t} = useTranslation();
  const {isMobile} = useScreen();
  const {open} = useGlobalModalContext();
  const selectedDao = useReactiveVar(selectedDAO);
  const {isConnected, address, ensName, ensAvatarUrl} = useWallet();

  // TEMPORARY
  const daoName = selectedDao.daoName || 'DAO Name';

  if (props.isProcess)
    return (
      <Container>
        <NetworkIndicator />
      </Container>
    );

  return (
    <>
      <Container data-testid="navbar">
        <Menu>
          <FlexOne>
            {isMobile ? (
              <ButtonIcon
                mode="secondary"
                size="large"
                icon={<IconMenu />}
                onClick={() => open('mobileMenu')}
              />
            ) : (
              <ButtonText
                size="large"
                mode="secondary"
                label={t('menu')}
                iconLeft={<IconMenu />}
                onClick={() => open('mobileMenu')}
              />
            )}
          </FlexOne>
          <FlexOne className="justify-center">
            <DaoContainer>
              <AvatarDao daoName={daoName} onClick={props.onDaoSelect} />
              <DaoName>{daoName}</DaoName>
            </DaoContainer>
          </FlexOne>
          <FlexOne className="justify-end">
            <ButtonWallet
              src={ensAvatarUrl || address}
              onClick={props.onWalletClick}
              isConnected={isConnected}
              label={
                isConnected ? ensName || address : t('navButtons.connectWallet')
              }
            />
          </FlexOne>
        </Menu>
        <NetworkIndicator />
      </Container>
      <MobileMenu
        daoName={daoName}
        daoAddress={
          selectedDao.daoAddress || '0x0ee165029b09d91a54687041adbc705f6376c67f'
        }
      />
    </>
  );
};

export default MobileNav;

const FlexOne = styled.div.attrs({
  className: 'flex flex-1' as string | undefined,
})``;

const Container = styled.div.attrs({
  className: 'flex flex-col fixed left-0 bottom-0 w-full',
})``;

const Menu = styled.nav.attrs({
  className: `flex justify-between items-center px-2 tablet:px-3 py-1
     tablet:py-1.5`,
})`
  background: linear-gradient(
    180deg,
    rgba(245, 247, 250, 0) 0%,
    rgba(245, 247, 250, 1) 100%
  );
  backdrop-filter: blur(24px);
`;

const DaoContainer = styled.div.attrs({
  className: 'flex flex-col gap-y-0.5 items-center rounded-xl',
})``;

const DaoName = styled.p.attrs({
  className: 'hidden tablet:block text-sm font-bold text-ui-800',
})``;
