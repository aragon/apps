import React, {useEffect, useState, useMemo} from 'react';
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

type ManageWalletsModalProps = {
  addWalletCallback: (wallets: Array<string>) => void;
  resetOnClose?: boolean;
  wallets: Array<string>;
  initialSelections: Array<string>;
};

type SelectableWallets = Record<string, boolean>;

const ManageWalletsModal: React.FC<ManageWalletsModalProps> = ({
  addWalletCallback,
  resetOnClose = false,
  wallets,
  initialSelections,
}) => {
  const {t} = useTranslation();
  const {isManageWalletOpen, close} = useGlobalModalContext();
  const [searchValue, setSearchValue] = useState('');
  const [selectedWallets, setSelectedWallets] = useState<SelectableWallets>({});

  const selectedWalletsNum = Object.keys(selectedWallets).length;
  const selectAll = selectedWalletsNum === wallets.length;

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
  }, [searchValue, wallets]);

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/
  useEffect(() => {
    /**
     * Note: I very much dislike this pattern. That said, we need
     * to somehow both load initial selections and keep them in sync
     * with what the user has selected. Cancelling after changing the
     * initial state will not work otherwise.
     */
    // map initial selections to selectedWallets.
    if (initialSelections) {
      const temp: SelectableWallets = {};
      initialSelections.forEach(address => {
        temp[address] = true;
      });
      setSelectedWallets(temp);
    }
  }, [initialSelections]);

  // handles select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedWallets({} as SelectableWallets);
    } else {
      const tempSelectedWallets = {...selectedWallets};
      wallets.forEach(address => {
        tempSelectedWallets[address] = true;
      });
      setSelectedWallets(tempSelectedWallets);
    }
  };

  // handles checkbox selection for individual wallets
  const handleSelectWallet = (wallet: string) => {
    const tempSelectedWallets = {...selectedWallets};
    tempSelectedWallets[wallet]
      ? delete tempSelectedWallets[wallet]
      : (tempSelectedWallets[wallet] = true);
    setSelectedWallets(tempSelectedWallets);
  };

  // handles cleanup after modal is closed.
  // @RakeshUp considering the initialSelection state, is it
  // still necessary to include the resetOnclose logic?
  const handleClose = () => {
    setSearchValue('');
    setSelectedWallets({});
    close('manageWallet');
  };

  const labels = useMemo(() => {
    if (selectedWalletsNum === 0) {
      return {
        button: t('labels.selectWallets'),
        label: t('labels.noAddressSelected'),
      };
    } else if (selectedWalletsNum === 1) {
      return {
        button: t('labels.addSingleWallet'),
        label: t('labels.singleAddressSelected'),
      };
    } else {
      return {
        button: t('labels.addNWallets', {walletCount: selectedWalletsNum}),
        label: t('labels.nAddressesSelected', {
          walletCount: selectedWalletsNum,
        }),
      };
    }
  }, [selectedWalletsNum, t]);

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
          <p className="text-ui-400">{labels.label as string}</p>
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
          label={labels.button as string}
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
  className: 'p-3 bg-ui-0 rounded-xl sticky top-0',
})`
  box-shadow: 0px 4px 8px rgba(31, 41, 51, 0.04),
    0px 0px 2px rgba(31, 41, 51, 0.06), 0px 0px 1px rgba(31, 41, 51, 0.04);
`;

const Container = styled.div.attrs({
  className: 'p-3 max-h-96 overflow-auto',
})``;

const SelectAllContainer = styled.div.attrs({
  className: 'flex justify-between items-center mb-2.5 mr-2.25',
})``;

const ButtonContainer = styled.div.attrs({
  className: 'flex py-2 px-3 space-x-2 bg-white',
})``;
