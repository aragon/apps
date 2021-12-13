import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {TransferSectionWrapper} from 'components/sectionWrapper';
import useCategorizedTransfers, {
  TransferSectionsType,
} from 'hooks/useCategorizedTransfers';

const Transfers: React.FC = () => {
  const {t} = useTranslation();
  const transfersList: TransferSectionsType = useCategorizedTransfers();

  /**
   * Note: We can add a nested iterator for both sections and transfer cards
   */

  return (
    <div className={'m-auto mt-4 w-8/12'}>
      <SectionContainer>
        <TransferSectionWrapper title={t('allTransfer.thisWeek') as string}>
          <div className="my-2 space-y-2 border-solid">
            {transfersList.week.map((data, index) => (
              <ColoredDiv key={index} />
            ))}
          </div>
        </TransferSectionWrapper>
      </SectionContainer>
      <SectionContainer>
        <TransferSectionWrapper title={'December'}>
          <div className="my-2 space-y-2 border-solid">
            {transfersList.month.map((data, index) => (
              <ColoredDiv key={index} />
            ))}
          </div>
        </TransferSectionWrapper>
      </SectionContainer>
      <SectionContainer>
        <TransferSectionWrapper title={'2021'}>
          <div className="my-2 space-y-2 border-solid">
            {transfersList.year.map((data, index) => (
              <ColoredDiv key={index} />
            ))}
          </div>
        </TransferSectionWrapper>
      </SectionContainer>
    </div>
  );
};

export default Transfers;

const ColoredDiv = styled.div.attrs({className: 'h-6 w-full bg-blue-100'})``;

const SectionContainer = styled.div.attrs({className: 'my-5'})``;
