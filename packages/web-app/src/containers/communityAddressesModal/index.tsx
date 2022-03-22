import React, {useState, useCallback, useMemo} from 'react';
import {VotersTable, SearchInput} from '@aragon/ui-components';
import styled from 'styled-components';
import {useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useGlobalModalContext} from 'context/globalModals';

const CommunityAddressesModal: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const {getValues} = useFormContext();
  const {isAddressesOpen, close} = useGlobalModalContext();
  const {wallets, tokenSymbol} = getValues();
  const {t} = useTranslation();

  const filterValidator = useCallback(
    wallets => {
      if (searchValue !== '') {
        const re = new RegExp(searchValue, 'i');
        return wallets?.address?.match(re);
      }
      return true;
    },
    [searchValue]
  );

  const filteredAddressList = useMemo(
    () =>
      wallets
        .filter(filterValidator)
        .map(({address, amount}: {address: string; amount: string}) => ({
          wallet: address,
          tokenAmount: `${amount} ${tokenSymbol}`,
        })),
    [wallets, filterValidator, tokenSymbol]
  );

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <ModalBottomSheetSwitcher
      isOpen={isAddressesOpen}
      onClose={() => close('addresses')}
      data-testid="communityModal"
    >
      <ModalHeader>
        <SearchInput
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </ModalHeader>
      <Container>
        {filteredAddressList.length !== 0 ? (
          <VotersTable
            voters={filteredAddressList.slice(0, page * 5)}
            showAmount
            {...(page * 5 < filteredAddressList.length && {
              onLoadMore: () => setPage(prePage => prePage + 1),
            })}
          />
        ) : (
          // this view is temporary until designs arrive
          <span>{t('AddressModal.noAddresses')}</span>
        )}
      </Container>
    </ModalBottomSheetSwitcher>
  );
};

export default CommunityAddressesModal;

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
