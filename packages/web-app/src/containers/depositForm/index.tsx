import React from 'react';
import styled from 'styled-components';
import {constants} from 'ethers';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import {
  ButtonWallet,
  DropdownInput,
  Label,
  ValueInput,
} from '@aragon/ui-components';

import {useTransferModalContext} from 'context/transfersModal';

const DepositForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {control} = useFormContext();
  const isCustomToken = useWatch({name: 'isCustomToken'});

  return (
    <>
      <FormItem>
        <Label label={t('labels.to')} helpText={t('newDeposit.toSubtitle')} />

        {/* TODO: Proper DAO address */}
        <ButtonWallet
          label="patito.dao.eth"
          src={constants.AddressZero}
          isConnected
          disabled
        />
      </FormItem>

      {/* Select token */}
      <FormItem>
        <Label
          label={t('labels.token')}
          helpText={t('newDeposit.tokenSubtitle')}
        />
        {/* TODO: Translation for placeholder */}
        <Controller
          name="tokenSymbol"
          control={control}
          render={({field: {name, value}}) => (
            <DropdownInput
              name={name}
              value={value}
              onClick={() => open('token')}
              placeholder="Select a Token..."
            />
          )}
        />
      </FormItem>

      {/* Custom token address */}
      {isCustomToken && (
        <FormItem>
          <Label
            label={t('labels.address')}
            helpText={t('newDeposit.contractAddressSubtitle')}
          />
          <Controller
            name="tokenAddress"
            control={control}
            render={({field: {name, onBlur, onChange, value}}) => (
              <ValueInput
                adornmentText="Paste"
                onAdornmentClick={() => alert('Paste clicked')}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
              />
            )}
          />
        </FormItem>
      )}

      {/* Token amount */}
      <FormItem>
        <Label
          label={t('labels.amount')}
          helpText={t('newDeposit.amountSubtitle')}
        />
        <Controller
          name="amount"
          control={control}
          render={({field: {name, onBlur, onChange, value}}) => (
            <ValueInput
              adornmentText="Max"
              onAdornmentClick={() => alert('Max clicked')}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
      </FormItem>

      {/* Token reference */}
      <FormItem>
        <Label
          label={t('labels.reference')}
          helpText={t('newDeposit.referenceSubtitle')}
          isOptional={true}
        />
      </FormItem>
    </>
  );
};

export default DepositForm;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
