import {
  AlertInline,
  CheckboxListItem,
  DateInput,
  DropdownInput,
  IconRadioSelected,
  InputTime,
  Label,
  NumberInput,
  TimeInput,
  ButtonText,
} from '@aragon/ui-components';
import {
  Controller,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {utils} from 'ethers';
import React, {useEffect, useState} from 'react';

import {useWallet} from 'context/augmentedWallet';
import {fetchTokenData} from 'services/prices';
import {useTransferModalContext} from 'context/transfersModal';
import {fetchBalance, getTokenInfo, isETH} from 'utils/tokens';
import {timezones} from 'containers/utcMenu/utcData';

const SetupVotingForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {account, balance: walletBalance, provider} = useWallet();
  const {control, resetField, setValue, setFocus, trigger, getValues} =
    useFormContext();
  const {errors, dirtyFields} = useFormState({control});
  const [tokenAddress, isCustomToken, tokenBalance, tokenSymbol] = useWatch({
    name: ['tokenAddress', 'isCustomToken', 'tokenBalance', 'tokenSymbol'],
  });
  const [time, setTime] = useState<InputTime>();
  const [date, setDate] = useState('');
  const [utc, setUtc] = useState(timezones[15]);
  type EndDateType = 'duration' | 'date';
  const [endDateType, setEndDateType] = useState<EndDateType>('duration');

  /*************************************************
   *                    Hooks                      *
   *************************************************/
  useEffect(() => {
    if (isCustomToken) setFocus('tokenAddress');
  }, [isCustomToken, setFocus]);

  useEffect(() => {
    if (!account || !isCustomToken || !tokenAddress) return;

    const fetchTokenInfo = async () => {
      if (errors.tokenAddress !== undefined) {
        if (dirtyFields.amount) trigger(['amount', 'tokenSymbol']);
        return;
      }

      try {
        // fetch token balance and token metadata
        const allTokenInfoPromise = Promise.all([
          isETH(tokenAddress)
            ? utils.formatEther(walletBalance)
            : fetchBalance(tokenAddress, account, provider),
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
        console.error(error);
      }
      if (dirtyFields.amount) trigger(['amount', 'tokenSymbol']);
    };

    fetchTokenInfo();
  }, [
    account,
    dirtyFields.amount,
    errors.tokenAddress,
    isCustomToken,
    provider,
    setValue,
    tokenAddress,
    trigger,
    walletBalance,
  ]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (data: InputTime) => {
    setTime(data);
  };

  /*************************************************
   *                Field Validators               *
   *************************************************/
  const startDateValidator = date => {
    //TODO
  };
  const durationValidator = duration => {
    //TODO
  };
  const endDateValidator = date => {
    //TODO
  };

  /*************************************************
   *                    Render                     *
   *************************************************/
  return (
    <>
      {/* Voting Type Selection */}
      <FormSection>
        <Label
          label={t('newWithdraw.setupVoting.optionLabel.title')}
          helpText={t('newWithdraw.setupVoting.optionLabel.helptext')}
        />
        <>
          <CheckboxListItem
            label={t('newWithdraw.setupVoting.yesNoLabel.title')}
            helptext={t('newWithdraw.setupVoting.yesNoLabel.helptext')}
            iconRight={<IconRadioSelected />}
            mode="active"
            multiSelect={false}
          />
          <AlertInline label={t('infos.voteDuration')} mode="neutral" />
        </>
      </FormSection>

      {/* Start Date */}
      <FormSection>
        <Label label={t('labels.start')} />
        <HStack>
          <Controller
            name="utcTimezone"
            control={control}
            rules={{required: t('errors.required.time')}}
            render={({field: {name, value}, fieldState: {error}}) => (
              <>
                <DateInput onChange={handleDateChange} />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />
          <Controller
            name="utcTimezone"
            control={control}
            rules={{required: t('errors.required.date')}}
            render={({field: {name, value}, fieldState: {error}}) => (
              <>
                <TimeInput min={'00:00'} getTime={handleTimeChange} />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />
          <Controller
            name="utcTimezone"
            control={control}
            rules={{required: t('errors.required.timezone')}}
            render={({field: {name, value}, fieldState: {error}}) => (
              <>
                <DropdownInput
                  name={name}
                  value={utc}
                  onClick={() => open('utc')}
                />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />
        </HStack>
      </FormSection>

      {/* End date */}
      <FormSection>
        <Label
          label={t('labels.end')}
          helpText={t('newWithdraw.setupVoting.endDescription')}
        />
        {endDateType === 'duration' ? (
          <HStackEnd>
            <NetworkTypeSwitcher>
              <ButtonText
                mode="secondary"
                label={t('labels.days')}
                isActive={endDateType === 'duration'}
                onClick={() => setEndDateType('duration')}
                size="large"
              />
              <ButtonText
                mode="secondary"
                label={t('labels.dateTime')}
                isActive={endDateType === 'date'}
                onClick={() => setEndDateType('date')}
                size="large"
              />
            </NetworkTypeSwitcher>
            <Controller
              name="tokenAddress"
              control={control}
              rules={{
                required: t('errors.required.address'),
                validate: durationValidator,
              }}
              render={({
                field: {name, onBlur, onChange, value},
                fieldState: {error},
              }) => (
                <>
                  <NumberInput
                    mode={error ? 'critical' : 'default'}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    width={144}
                  />
                  {error?.message && (
                    <AlertInline label={error.message} mode="critical" />
                  )}
                </>
              )}
            />
          </HStackEnd>
        ) : (
          <>
            <NetworkTypeSwitcher>
              <ButtonText
                mode="secondary"
                label={t('labels.days')}
                isActive={endDateType === 'duration'}
                onClick={() => setEndDateType('duration')}
                size="large"
              />
              <ButtonText
                mode="secondary"
                label={t('labels.dateTime')}
                isActive={endDateType === 'date'}
                onClick={() => setEndDateType('date')}
                size="large"
              />
            </NetworkTypeSwitcher>
            <HStack>
              <Controller
                name="utcTimezone"
                control={control}
                rules={{required: t('errors.required.time')}}
                render={({field: {name, value}, fieldState: {error}}) => (
                  <>
                    <DateInput onChange={handleDateChange} />
                    {error?.message && (
                      <AlertInline label={error.message} mode="critical" />
                    )}
                  </>
                )}
              />
              <Controller
                name="utcTimezone"
                control={control}
                rules={{required: t('errors.required.date')}}
                render={({field: {name, value}, fieldState: {error}}) => (
                  <>
                    <TimeInput min={'00:00'} getTime={handleTimeChange} />
                    {error?.message && (
                      <AlertInline label={error.message} mode="critical" />
                    )}
                  </>
                )}
              />
              <Controller
                name="utcTimezone"
                control={control}
                rules={{required: t('errors.required.timezone')}}
                render={({field: {name, value}, fieldState: {error}}) => (
                  <>
                    <DropdownInput
                      name={name}
                      value={utc}
                      onClick={() => open('utc')}
                    />
                    {error?.message && (
                      <AlertInline label={error.message} mode="critical" />
                    )}
                  </>
                )}
              />
            </HStack>
          </>
        )}
      </FormSection>
    </>
  );
};

export default SetupVotingForm;

const FormSection = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const HStack = styled.div.attrs({
  className: 'flex space-x-1',
})``;

const NetworkTypeSwitcher = styled.div.attrs({
  className: 'inline-flex p-0.5 space-x-0.25 bg-ui-0 rounded-xl',
})``;

const HStackEnd = styled.div.attrs({
  className: 'inline-block space-x-1',
})``;
