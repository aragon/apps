import React, {useState, useCallback, useEffect} from 'react';
import {VotersTable, SearchInput} from '@aragon/ui-components';
import styled from 'styled-components';
import {useFormContext} from 'react-hook-form';

import ModalBottomSheetSwitcher from 'components/modalBottomSheetSwitcher';
import {useGlobalModalContext} from 'context/globalModals';
import {VoterType} from '@aragon/ui-components/dist/components/table/votersTable';

const CommunityAddressesModal: React.FC = () => {
  const [addressList, setAddressList] = useState<VoterType[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState<number>(1);
  const {getValues} = useFormContext();
  const {isAddressesOpen, close} = useGlobalModalContext();
  const {wallets, tokenSymbol} = getValues();

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

  useEffect(() => {
    const list = wallets
      .filter(filterValidator)
      .map(({address, amount}: {address: string; amount: string}) => ({
        wallet: address,
        tokenAmount: `${amount} ${tokenSymbol}`,
      }));
    setAddressList(list);
  }, [wallets, setAddressList, filterValidator, tokenSymbol]);

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
        <VotersTable
          voters={addressList.slice(0, page * 5)}
          showAmount
          {...(page * 5 < addressList.length && {
            onLoadMore: () => setPage(prePage => prePage + 1),
          })}
        />
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
