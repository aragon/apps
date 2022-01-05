import React, {useCallback} from 'react';
import styled from 'styled-components';
import {constants} from 'ethers';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import {
  ButtonWallet,
  DropdownInput,
  Label,
  TextareaSimple,
  ValueInput,
} from '@aragon/ui-components';

import {useTransferModalContext} from 'context/transfersModal';

// TODO: Form validation for enabling continue button
// TODO: Trigger get balance on contract address copy validating, token metadata fetch
const DepositForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {control} = useFormContext();
  const [isCustomToken, tokenBalance, tokenSymbol] = useWatch({
    name: ['isCustomToken', 'tokenBalance', 'tokenSymbol'],
  });

  const handleClipboardActions = useCallback(
    async (currentValue: string, onChange: (value: string) => void) => {
      if (currentValue) {
        await navigator.clipboard.writeText(currentValue);

        // TODO: change to proper mechanism
        alert('Copied');
      } else {
        const textFromClipboard = await navigator.clipboard.readText();
        onChange(textFromClipboard);
      }
    },
    []
  );

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
        <Controller
          name="tokenSymbol"
          control={control}
          render={({field: {name, value}, fieldState: {error}}) => (
            <DropdownInput
              name={name}
              mode={error ? 'critical' : 'default'}
              value={value}
              onClick={() => open('token')}
              placeholder={t('labels.selectToken')}
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
            render={({
              field: {name, onBlur, onChange, value},
              fieldState: {error},
            }) => (
              <ValueInput
                mode={error ? 'critical' : 'default'}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                adornmentText={value ? 'Copy' : 'Paste'}
                onAdornmentClick={() => handleClipboardActions(value, onChange)}
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
          render={({
            field: {name, onBlur, onChange, value},
            fieldState: {error},
          }) => (
            <ValueInput
              mode={error ? 'critical' : 'default'}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
              adornmentText="Max"
              onAdornmentClick={() => onChange(tokenBalance)}
            />
          )}
        />
        {tokenBalance && (
          <div className="px-1 text-xs text-right text-ui-600">
            {`Max Balance: ${tokenBalance} ${tokenSymbol}`}
          </div>
        )}
      </FormItem>

      {/* Token reference */}
      <FormItem>
        <Label
          label={t('labels.reference')}
          helpText={t('newDeposit.referenceSubtitle')}
          isOptional={true}
        />
        <Controller
          name="reference"
          control={control}
          render={({field: {name, onBlur, onChange, value}}) => (
            <TextareaSimple
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
          )}
        />
      </FormItem>
    </>
  );
};

export default DepositForm;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;
