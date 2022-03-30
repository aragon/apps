import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useMemo, useState} from 'react';
import {withTransaction} from '@elastic/apm-rum-react';
import {Option, ButtonGroup, SearchInput} from '@aragon/ui-components';

import TransferList from 'components/transferList';
import {PageWrapper} from 'components/wrappers';
import useCategorizedTransfers from 'hooks/useCategorizedTransfers';
import {TransferSectionWrapper} from 'components/wrappers';
import {useGlobalModalContext} from 'context/globalModals';
import {Transfer} from 'utils/types';

const Transfers: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const [filterValue, setFilterValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const {data: categorizedTransfers, totalTransfers} =
    useCategorizedTransfers();

  const handleButtonGroupChange = (selected: string) => {
    const val = selected === 'all' ? '' : selected;
    setFilterValue(val);
  };

  const filterValidator = useCallback(
    (transfer: Transfer) => {
      let returnValue = true;
      if (filterValue !== '') {
        returnValue = Boolean(transfer.transferType === filterValue);
      }
      if (searchValue !== '') {
        const re = new RegExp(searchValue, 'i');
        returnValue = Boolean(transfer?.title.match(re));
      }
      return returnValue;
    },
    [searchValue, filterValue]
  );

  const displayedTransfers = useMemo(
    () => ({
      week: categorizedTransfers.week.filter(filterValidator),
      month: categorizedTransfers.month.filter(filterValidator),
      year: categorizedTransfers.year.filter(filterValidator),
    }),
    [
      categorizedTransfers.week,
      categorizedTransfers.month,
      categorizedTransfers.year,
      filterValidator,
    ]
  );
  /**
   * Note: We can add a nested iterator for both sections and transfer cards
   */

  return (
    <PageWrapper
      title={t('TransferModal.allTransfers') as string}
      buttonLabel={t('TransferModal.newTransfer') as string}
      subtitle={`${totalTransfers} Total Volume`}
      onClick={open}
    >
      <div className="mt-3 desktop:mt-8">
        <div className="space-y-1.5">
          <SearchInput
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
            placeholder={t('placeHolders.searchTransfers')}
          />
          <div className="flex">
            <ButtonGroup
              bgWhite
              defaultValue="all"
              onChange={handleButtonGroupChange}
            >
              <Option value="all" label="All" />
              <Option value="VaultDeposit" label="Deposit" />
              <Option value="VaultWithdraw" label="Withdraw" />
              <Option value="externalContract" label="External Contract" />
            </ButtonGroup>
          </div>
        </div>
        <SectionContainer>
          <TransferSectionWrapper title={t('allTransfer.thisWeek') as string}>
            <div className="my-2 space-y-1.5 border-solid">
              <TransferList transfers={displayedTransfers.week} />
            </div>
          </TransferSectionWrapper>
        </SectionContainer>
        {displayedTransfers.month.length !== 0 && (
          <SectionContainer>
            <TransferSectionWrapper title={'December'}>
              <div className="my-2 space-y-1.5 border-solid">
                <TransferList transfers={displayedTransfers.month} />
              </div>
            </TransferSectionWrapper>
          </SectionContainer>
        )}
        {displayedTransfers.year.length !== 0 && (
          <SectionContainer>
            <TransferSectionWrapper title={'2021'}>
              <div className="my-2 space-y-1.5 border-solid">
                <TransferList transfers={displayedTransfers.year} />
              </div>
            </TransferSectionWrapper>
          </SectionContainer>
        )}
      </div>
    </PageWrapper>
  );
};

const SectionContainer = styled.div.attrs({className: 'my-3 desktop:my-5'})``;

export default withTransaction('Transfers', 'component')(Transfers);
