import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';

import {
  TokenSectionWrapper,
  TransferSectionWrapper,
} from 'components/sectionWrapper';

const Finance: React.FC = () => {
  const {t} = useTranslation();

  return (
    <div className={'m-auto w-8/12 mt-4 space-y-3'}>
      <h1 className={'text-2xl font-bold text-center '}>Finance Page</h1>
      <TokenSectionWrapper title={t('finance.tokenSection')}>
        <div className="my-2 border-1 border-solid space-y-2">
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
        </div>
      </TokenSectionWrapper>
      <TransferSectionWrapper title={t('finance.transferSection')}>
        <div className="my-2 border-1 border-solid space-y-2">
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
          <ColoredDiv />
        </div>
      </TransferSectionWrapper>
    </div>
  );
};

export default Finance;

const ColoredDiv = styled.div.attrs({className: 'h-6 w-full bg-blue-100'})``;
