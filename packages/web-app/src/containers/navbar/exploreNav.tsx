import React from 'react';
import styled from 'styled-components';
import {ButtonWallet, SearchInput, IconSearch} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';

import {useWallet} from 'hooks/useWallet';
import Logo from 'public/logo.svg';
import useScreen from 'hooks/useScreen';
import {useGlobalModalContext} from 'context/globalModals';

const ExploreNav: React.FC = () => {
  const {t} = useTranslation();
  const {address, ensName, ensAvatarUrl, isConnected, methods} = useWallet();
  const {isDesktop} = useScreen();
  const {open} = useGlobalModalContext();

  const handleWalletButtonClick = () => {
    if (isConnected) {
      open('wallet');
      return;
    }
    methods.selectWallet().catch((err: Error) => {
      // To be implemented: maybe add an error message when
      // the error is different from closing the window
      console.error(err);
    });
  };

  return (
    <Container data-testid="navbar">
      <Menu>
        <LogoContainer src={Logo} />
        <ActionsWrapper>
          {isDesktop ? (
            <SearchInput
              placeholder={t('placeHolders.searchTokens')}
              value=""
            />
          ) : (
            <SearchIcon />
          )}
          <ButtonWallet
            src={ensAvatarUrl || address}
            onClick={handleWalletButtonClick}
            isConnected={isConnected}
            label={
              isConnected ? ensName || address : t('navButtons.connectWallet')
            }
          />
        </ActionsWrapper>
      </Menu>
    </Container>
  );
};

const Container = styled.header.attrs({
  className: 'top-0 w-full',
})``;

const Menu = styled.nav.attrs({
  className: `flex mx-auto justify-between items-center
     px-2 desktop:px-5 py-3 bg-primary-400`,
})``;

const LogoContainer = styled.img.attrs({
  className: 'h-4',
})``;

const ActionsWrapper = styled.div.attrs({
  className: 'flex space-x-3 items-center',
})``;

const SearchIcon = styled(IconSearch).attrs({
  className: 'text-ui-0 h-2',
})``;

export default ExploreNav;
