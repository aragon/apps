import {
  AlertInline,
  ButtonWallet,
  DropdownInput,
  Label,
  TextareaSimple,
  ValueInput,
} from '@aragon/ui-components';
import styled from 'styled-components';
import {constants} from 'ethers';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useEffect} from 'react';
import {Controller, useFormContext, useWatch} from 'react-hook-form';

import {useWallet} from 'context/augmentedWallet';
import {fetchTokenData} from 'services/prices';
import {validateTokenAmount} from 'utils/validators';
import {useTransferModalContext} from 'context/transfersModal';
import {fetchBalance, getTokenInfo} from 'utils/tokens';

// TODO: Add form validation errors to locale strings
// TODO: Change valueInput to type number and hide steppers
// TODO: Form validation for enabling continue button
// TODO: Trigger validation on contract address change
// TODO: Very important, check for Ether through the whole flow
const DepositForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {account, provider} = useWallet();
  const {control, formState, getValues, setValue} = useFormContext();
  const [isCustomToken, tokenBalance, tokenSymbol, tokenAddress] = useWatch({
    name: ['isCustomToken', 'tokenBalance', 'tokenSymbol', 'tokenAddress'],
  });

  /*************************************************
   *                    Hooks                      *
   *************************************************/
  useEffect(() => {
    if (!account) return;

    // TODO: check if token is ETHER
    const fetchTokenInfo = async () => {
      if (isCustomToken && tokenAddress && !formState?.errors?.tokenAddress) {
        try {
          // fetch token balance and token metadata
          const allTokenInfoPromise = Promise.all([
            fetchBalance(tokenAddress, account, provider),
            fetchTokenData(tokenAddress),
          ]);

          // use blockchain if api data unavailable
          const [balance, data] = await allTokenInfoPromise;
          if (data) {
            setValue('tokenName', data.name);
            setValue('tokenSymbol', data.symbol);
            setValue('tokenImgUrl', data.imgUrl);
          } else {
            const {name, symbol} = await getTokenInfo(tokenAddress, provider);
            setValue('tokenName', name);
            setValue('tokenSymbol', symbol);
          }
          setValue('tokenBalance', balance);
        } catch (error) {
          /**
           * Error is intentionally swallowed. Passing invalid address will
           * return error, but should not be thrown.
           * Also, double safeguard. Should not actually fall into here since
           * tokenAddress should be valid in the first place for balance to be fetched.
           */
        }
      }
    };

    fetchTokenInfo();
  }, [
    account,
    formState?.errors?.tokenAddress,
    isCustomToken,
    provider,
    setValue,
    tokenAddress,
  ]);

  /*************************************************
   *             Callbacks and Handlers            *
   *************************************************/
  const amountValidator = useCallback(
    async (amount: string) => {
      // check if a token is selected using it's address
      const [tokenAddress, tokenBalance] = getValues([
        'tokenAddress',
        'tokenBalance',
      ]);
      if (tokenAddress === '') return 'A token must be selected';

      // check if token selected is valid
      if (formState?.errors?.tokenAddress)
        return 'Cannot validate amount with invalid token address';

      // run number rules
      try {
        // TODO: check if address is ETHER
        const {decimals} = await getTokenInfo(tokenAddress, provider);

        return validateTokenAmount(amount, decimals, tokenBalance);
      } catch (error) {
        // catches miscellaneous cases such as not being able to get token decimal
        console.error('Error validating amount', error);
        return 'Error validating amount';
      }
    },
    [formState?.errors?.tokenAddress, getValues, provider]
  );

  const handleMaxClicked = useCallback(
    (onChange: (event: unknown[]) => void) => {
      if (tokenBalance) {
        onChange(tokenBalance);
      }
    },
    [tokenBalance]
  );

  // TODO: This should probably come with the input ui-component
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
              placeholder={t('placeHolders.selectToken')}
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
          rules={{
            required: 'Token amount is required',
            validate: amountValidator,
          }}
          render={({
            field: {name, onBlur, onChange, value},
            fieldState: {error},
          }) => (
            <>
              <ValueInput
                mode={error ? 'critical' : 'default'}
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                adornmentText="Max"
                onAdornmentClick={() => handleMaxClicked(onChange)}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
          )}
        />

        {tokenBalance && (
          <div className="px-1 text-xs text-right text-ui-600">
            {`${t('labels.maxBalance')}: ${tokenBalance} ${tokenSymbol}`}
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
