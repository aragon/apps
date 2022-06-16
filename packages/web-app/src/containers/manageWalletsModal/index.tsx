import React, {useState, useMemo} from 'react';
import {
  SearchInput,
  CheckboxListItem,
  ButtonText,
  CheckboxSimple,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useGlobalModalContext} from 'context/globalModals';
import {shortenAddress} from '@aragon/ui-components/src/utils/addresses';

const wallets = [
  'web3rules.eth',
  '0x10656c07e857B7f3338EA26ECD9A0936a24c0ae3',
  '0x13456c07e857B7f3338EA26ECD9A0936a24c0fd1',
  'dao.eth',
];

type ManageWalletsModalProps = {
  addWalletCallback: (wallets: Array<string>) => void;
  resetOnClose?: boolean;
};

const ManageWalletsModal: React.FC<ManageWalletsModalProps> = ({
  addWalletCallback,
  resetOnClose = false,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedWallets, setSelectedWallets] = useState<
    Record<string, boolean>
  >({});
  const [selectAll, setSelectAll] = useState(false);
  const {isManageWalletOpen, close} = useGlobalModalContext();
  const {t} = useTranslation();

  const filteredWallets = useMemo(() => {
    if (searchValue !== '') {
      const re = new RegExp(searchValue, 'i');
      return wallets.reduce((tempSelectedWallets, wallet) => {
        wallet.match(re) && tempSelectedWallets.push(wallet);
        return tempSelectedWallets;
      }, [] as Array<string>);
    } else {
      return wallets;
    }
  }, [searchValue]);

  const handleSelectWallet = (wallet: string) => {
    const tempSelectedWallets = {...selectedWallets};
    tempSelectedWallets[wallet]
      ? delete tempSelectedWallets[wallet]
      : (tempSelectedWallets[wallet] = true);
    setSelectedWallets(tempSelectedWallets);

    if (Object.keys(tempSelectedWallets).length !== wallets.length) {
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    setSelectedWallets(
      wallets.reduce((tempSelectedWallets, wallet) => {
        tempSelectedWallets[wallet] = true;
        return tempSelectedWallets;
      }, {} as Record<string, boolean>)
    );
    setSelectAll(true);
  };

  const handleClose = () => {
    setSearchValue('');
    setSelectedWallets({});
    setSelectAll(false);
    close('manageWallet');
  };

  return (
    <ModalBottomSheetSwitcher
      isOpen={isManageWalletOpen}
      onClose={handleClose}
      data-testid="manageWalletModal"
    >
      <ModalHeader>
        <SearchInput
          value={searchValue}
          placeholder={t('placeHolders.searchTokens')}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </ModalHeader>
      <Container>
        <SelectAllContainer>
          <CheckboxSimple
            label="Select All"
            multiSelect
            iconLeft={false}
            state={selectAll ? 'active' : 'default'}
            onClick={handleSelectAll}
          />
        </SelectAllContainer>

        <div className="space-y-1.5">
          {filteredWallets.map(wallet => (
            <CheckboxListItem
              key={wallet}
              label={shortenAddress(wallet)}
              multiSelect
              state={selectedWallets[wallet] ? 'active' : 'default'}
              onClick={() => handleSelectWallet(wallet)}
            />
          ))}
        </div>
      </Container>

      <ButtonContainer>
        <ButtonText
          label={
            Object.keys(selectedWallets).length === 0
              ? t('labels.selectWallets')
              : t('labels.addNWallets', {
                  walletCount: Object.keys(selectedWallets).length,
                })
          }
          size="large"
          onClick={() => {
            addWalletCallback(Object.keys(selectedWallets));
            resetOnClose ? handleClose() : close('manageWallet');
          }}
        />
        <ButtonText
          label={t('labels.cancel')}
          mode="secondary"
          size="large"
          bgWhite
          onClick={handleClose}
        />
      </ButtonContainer>
    </ModalBottomSheetSwitcher>
  );
};

export default ManageWalletsModal;

const ModalHeader = styled.div.attrs({
  className: 'p-3 bg-ui-0 rounded-xl',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
  border-radius: 12px;
`;

const Container = styled.div.attrs({
  className: 'p-3 max-h-96 overflow-auto',
})``;

const SelectAllContainer = styled.div.attrs({
  className: 'flex flex-row-reverse mb-2.5 mr-2.25',
})``;

const ButtonContainer = styled.div.attrs({
  className: 'flex py-2 px-3 space-x-2 bg-white',
})``;
