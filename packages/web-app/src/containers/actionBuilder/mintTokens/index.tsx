import {ButtonText} from '@aragon/ui-components';
import {useTranslation} from 'react-i18next';
import {useFormContext} from 'react-hook-form';
import React from 'react';
import styled from 'styled-components';

import {useActionsContext} from 'context/actions';
import {AccordionMethod} from 'components/accordionMethod';
import {AddressAndTokenRow} from './addressTokenRow';

type Props = {
  index: number;
};

const MintTokens: React.FC<Props> = ({index}) => {
  const {t} = useTranslation();
  const {removeAction, duplicateAction} = useActionsContext();
  const {setValue, clearErrors} = useFormContext();

  return (
    <AccordionMethod
      type="action-builder"
      methodName="Mint Tokens"
      smartContractName="Aragon Core"
      verified
      methodDescription="Which wallet addresses should get tokens, and how much?  Add the wallets you want here, and then choose the distribution. Upload a CSV with this template if you want."
      additionalInfo="The total token supply is inclusive of the already distributed tokens of the existing holders."
      duplicateActionCallback={() => duplicateAction(index)}
      removeActionCallback={() => removeAction(index)}
    >
      <Container>
        <AddressAndTokenRow />

        <ButtonContainer>
          <ButtonText
            label="Add Wallet"
            mode="secondary"
            size="large"
            bgWhite
            className="flex-1 tablet:flex-initial"
          />
          <ButtonText
            label="Upload CSV"
            mode="ghost"
            size="large"
            bgWhite
            className="flex-1 tablet:flex-initial"
          />
        </ButtonContainer>

        <SummaryContainer>
          <p>Summary</p>
          <HStack>
            <SummaryLabel>New Tokens</SummaryLabel>
            <p>+8000 LRX</p>
          </HStack>
          <HStack>
            <SummaryLabel>New Holders</SummaryLabel>
            <p>+2</p>
          </HStack>
          <HStack>
            <SummaryLabel>Total Tokens</SummaryLabel>
            <p>100,000 LRX</p>
          </HStack>
          <HStack>
            <SummaryLabel>Total Holders</SummaryLabel>
            <p>1000</p>
          </HStack>
        </SummaryContainer>
      </Container>
    </AccordionMethod>
  );
};

export default MintTokens;

const Container = styled.div.attrs({
  className:
    'bg-white rounded-b-xl border border-t-0 divide-y border-ui-100 divide-ui-100',
})``;

const ButtonContainer = styled.div.attrs({
  className:
    'flex justify-between tablet:justify-start p-2 tablet:p-3 space-x-2',
})``;

const SummaryContainer = styled.div.attrs({
  className: 'p-2 tablet:p-3 space-y-1.5 font-bold text-ui-800',
})``;

const HStack = styled.div.attrs({
  className: 'flex justify-between',
})``;

const SummaryLabel = styled.p.attrs({
  className: 'font-normal text-ui-500',
})``;
