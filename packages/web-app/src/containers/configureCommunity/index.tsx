import {
  AlertInline,
  InputImageSingle,
  Label,
  TextareaSimple,
  NumberInput,
} from '@aragon/ui-components';
import React from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext, useFormState} from 'react-hook-form';

const ConfigureCommunity: React.FC = () => {
  const {t} = useTranslation();
  const {errors} = useFormState();
  const {control, clearErrors, setError, setValue} = useFormContext();

  const handleImageError = (error: {code: string; message: string}) => {
    setError('daoLogo', {type: 'manual', message: error.message});
  };
  const handleImageChange = (value: File | null) => {
    setValue('daoLogo', value);
    clearErrors('daoLogo');
  };

  return (
    <>
      {/* Minimum approval */}
      <FormItem>
        <Label
          label={t('labels.minimumApproval')}
          helpText={t('createDAO.step4.minimumApprovalSubtitle')}
        />

        <Controller
          name="daoName"
          control={control}
          defaultValue=""
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
                placeholder={t('placeHolders.daoName')}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
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
          name="daoName"
          control={control}
          defaultValue=""
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
                placeholder={t('placeHolders.daoName')}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
          )}
        />
      </FormItem>

      {/* Duration */}
      <FormItem>
        <Label
          label={t('labels.duration')}
          helpText={t('createDAO.step4.durationSubtitle')}
        />

        <Controller
          name="daoName"
          control={control}
          defaultValue=""
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
                placeholder={t('placeHolders.daoName')}
              />
              {error?.message && (
                <AlertInline label={error.message} mode="critical" />
              )}
            </>
          )}
        />
      </FormItem>
    </>
  );
};

export default ConfigureCommunity;

const FormItem = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const LogoContainer = styled.div.attrs({
  className: 'pt-0.5',
})``;
