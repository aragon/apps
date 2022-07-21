import {ButtonText} from '@aragon/ui-components';
import {Trans, useTranslation} from 'react-i18next';
import {useFieldArray} from 'react-hook-form';
import React, {useEffect} from 'react';
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
  // const {control, setValue, clearErrors} = useFormContext();
  const {fields, append, remove} = useFieldArray({name: 'mintTokensToWallets'});

  useEffect(() => {
    if (fields.length === 0) {
      append({address: '', amount: '0'});
    }
  }, [append, fields.length]);

  const handleAddWallet = () => {
    append({address: '', amount: '0'});
  };

  return (
    <AccordionMethod
      type="action-builder"
      methodName={t('labels.mintTokens')}
      smartContractName={t('labels.aragonCore')}
      verified
      methodDescription={<MintTokenDescription />}
      additionalInfo={t('newProposal.mintTokens.additionalInfo')}
      duplicateActionCallback={() => duplicateAction(index)}
      removeActionCallback={() => removeAction(index)}
    >
      <Container>
        {fields.map((field, index) => {
          return (
            <AddressAndTokenRow
              key={field.id}
              index={index}
              onDelete={index => remove(index)}
            />
          );
        })}

        <ButtonContainer>
          <ButtonText
            label={t('labels.addWallet')}
            mode="secondary"
            size="large"
            bgWhite
            className="flex-1 tablet:flex-initial"
            onClick={handleAddWallet}
          />
          <ButtonText
            label={t('labels.whitelistWallets.uploadCSV')}
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

const MintTokenDescription: React.FC = () => (
  <Trans i18nKey="newProposal.mintTokens.methodDescription">
    Which wallet addresses should get tokens, and how much? Add the wallets you
    want here, and then choose the distribution. Upload a CSV with
    <button
      className="font-bold text-primary-500 hover:text-primary-700 rounded focus:ring-2 focus:ring-primary-500 focus:outline-none"
      onClick={() => alert('Download template')}
    >
      this template
    </button>{' '}
    if you want.
  </Trans>
);

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
