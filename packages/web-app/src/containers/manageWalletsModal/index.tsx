import React, {useState, useCallback, useMemo} from 'react';
import {
  VotersTable,
  SearchInput,
  CheckboxListItem,
  ButtonText,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {useWallet} from 'hooks/useWallet';
import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useGlobalModalContext} from 'context/globalModals';
import {shortenAddress} from '@aragon/ui-components/src/utils/addresses';
import {getUserFriendlyWalletLabel} from 'utils/library';

type ManageWalletsModalProps = {
  // tokenMembership: boolean;
};

const ManageWalletsModal: React.FC<ManageWalletsModalProps> = () => {
  const {address: connectedWalletAddress} = useWallet();
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const {isManageWalletOpen, close} = useGlobalModalContext();
  const {t} = useTranslation();
  // const {getValues} = useFormContext();
  // const {wallets, tokenSymbol, whitelistWallets} = getValues();

  // const filterValidator = useCallback(
  //   wallet => {
  //     if (searchValue !== '') {
  //       const re = new RegExp(searchValue, 'i');
  //       return wallet?.address?.match(re);
  //     }
  //     return true;
  //   },
  //   [searchValue]
  // );

  // const filteredAddressList = useMemo(() => {
  //   return (tokenMembership ? wallets : whitelistWallets)
  //     ?.filter(filterValidator)
  //     .map(({address, amount}: {address: string; amount: string}) => ({
  //       wallet: getUserFriendlyWalletLabel(
  //         address,
  //         connectedWalletAddress || '',
  //         t
  //       ),
  //       tokenAmount: `${amount} ${tokenSymbol}`,
  //     }));
  // }, [
  //   tokenMembership,
  //   wallets,
  //   whitelistWallets,
  //   filterValidator,
  //   connectedWalletAddress,
  //   t,
  //   tokenSymbol,
  // ]);

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <ModalBottomSheetSwitcher
      isOpen={isManageWalletOpen}
      onClose={() => close('manageWallet')}
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
        {/* {filteredAddressList && filteredAddressList.length !== 0 ? (
          <VotersTable
            voters={filteredAddressList.slice(0, page * 5)}
            {...(tokenMembership && {showAmount: true})}
            {...(page * 5 < filteredAddressList.length && {
              onLoadMore: () => setPage(prePage => prePage + 1),
            })}
          />
        ) : (
          // this view is temporary until designs arrive
          <span>{t('AddressModal.noAddresses')}</span>
        )} */}
        <div className="space-y-1.5">
          <CheckboxListItem label="web3rules.eth" multiSelect />
          <CheckboxListItem
            label={shortenAddress('0x10656c07e857B7f3338EA26ECD9A0936a24c0ae3')}
            multiSelect
          />
        </div>
      </Container>
      <div className="flex py-2 px-3 space-x-2 bg-white">
        <ButtonText label="Add 2 Wallets" size="large" />
        <ButtonText label="Cancel" mode="secondary" size="large" bgWhite />
      </div>
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
