import {AlertInline, Label, NumberInput} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext, useFormState} from 'react-hook-form';

const ConfigureCommunity: React.FC = () => {
  const {t} = useTranslation();
  const {errors} = useFormState();
  const {control, clearErrors, setError, setValue} = useFormContext();

  return (
    <>
      {/* Minimum approval */}
      <FormItem>
        <Label
          label={t('labels.minimumApproval')}
          helpText={t('createDAO.step4.minimumApprovalSubtitle')}
        />

        <Controller
          name="minimumApproval"
          control={control}
          defaultValue="15"
          render={({
            field: {onBlur, onChange, value, name},
            fieldState: {error},
          }) => (
            <FormWrapper>
              <NumberInput
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={t('placeHolders.daoName')}
                percentage={true}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </FormWrapper>
          )}
        />
      </FormItem>

      {/* Support */}
      <FormItem>
        <Label
          label={t('labels.support')}
          helpText={t('createDAO.step4.supportSubtitle')}
        />

        <Controller
          name="support"
          control={control}
          defaultValue="50"
          render={({
            field: {onBlur, onChange, value, name},
            fieldState: {error},
          }) => (
            <FormWrapper>
              <NumberInput
                name={name}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                placeholder={t('placeHolders.daoName')}
                percentage
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </FormWrapper>
          )}
        />
      </FormItem>

      {/* Duration */}
      <FormItem>
        <Label
          label={t('labels.duration')}
          helpText={t('createDAO.step4.durationSubtitle')}
        />
        <DurationContainer>
          <Controller
            name="days"
            control={control}
            defaultValue="1"
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <>
                <NumberInput
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder={'0'}
                  min="0"
                />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />

          <Controller
            name="hours"
            control={control}
            defaultValue="0"
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <>
                <NumberInput
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder={'0'}
                  min="0"
                  max="23"
                />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />

          <Controller
            name="minutes"
            control={control}
            defaultValue="0"
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <>
                <NumberInput
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder={'0'}
                  min="0"
                  max="59"
                />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />
        </DurationContainer>
        <AlertInline
          label={t('alert.durationAlert') as string}
          mode="neutral"
        />
      </FormItem>
    </>
  );
};

export default ConfigureCommunity;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const FormWrapper = styled.div.attrs({
  className: 'w-1/3 pr-1.5',
})``;

const DurationContainer = styled.div.attrs({
  className: 'flex space-x-1.5',
})``;
