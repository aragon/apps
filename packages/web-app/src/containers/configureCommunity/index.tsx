import {AlertInline, Label, NumberInput} from '@aragon/ui-components';
import React, {useMemo} from 'react';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import {Controller, useFormContext, useWatch} from 'react-hook-form';

const ConfigureCommunity: React.FC = () => {
  const {t} = useTranslation();
  const {control} = useFormContext();
  const defaultMinimumParticipation = 51;
  const [
    tokenTotalSupply,
    tokenSymbol,
    membership,
    whitelistWallets,
    minimumParticipation,
  ] = useWatch({
    name: [
      'tokenTotalSupply',
      'tokenSymbol',
      'membership',
      'whitelistWallets',
      'minimumParticipation',
    ],
  });

  const percentageInputValidator = (value: string | number) => {
    return value <= 100 && value >= 0 ? true : t('errors.percentage');
  };

  const minimumParticipationPercent = useMemo(() => {
    return (
      Math.round(
        ((100 *
          Math.ceil(
            ((minimumParticipation || defaultMinimumParticipation) *
              whitelistWallets.length) /
              100
          )) /
          whitelistWallets.length) *
          100
      ) / 100
    );
  }, [minimumParticipation, whitelistWallets.length]);

  return (
    <>
      {/* Minimum approval */}
      {membership === 'token' && (
        <FormItem>
          <Label
            label={t('labels.minimumApproval')}
            helpText={t('createDAO.step4.minimumApprovalSubtitle')}
          />
          <Controller
            name="minimumApproval"
            control={control}
            defaultValue="15"
            rules={{
              validate: value => percentageInputValidator(value),
            }}
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <>
                <ApprovalWrapper>
                  <FormWrapper>
                    <NumberInput
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder={t('placeHolders.daoName')}
                      percentage={true}
                    />
                  </FormWrapper>
                  <AlertInline
                    label={t('createDAO.step4.alerts.minimumApprovalAlert', {
                      amount: Math.round(tokenTotalSupply * (value / 100)),
                      symbol: tokenSymbol?.toUpperCase(),
                    })}
                    mode="neutral"
                  />
                </ApprovalWrapper>
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />
        </FormItem>
      )}
      {membership === 'wallet' && (
        <FormItem>
          <Label
            label={t('labels.minimumParticipation')}
            helpText={t('createDAO.step4.minimumParticipationSubtitle')}
          />
          <Controller
            name="minimumParticipation"
            control={control}
            defaultValue={defaultMinimumParticipation}
            rules={{
              validate: value => percentageInputValidator(value),
            }}
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <>
                <ApprovalWrapper>
                  <FormWrapper>
                    <NumberInput
                      name={name}
                      value={value}
                      onBlur={onBlur}
                      onChange={onChange}
                      placeholder={t('placeHolders.daoName')}
                      percentage={true}
                    />
                  </FormWrapper>
                  <AlertInline
                    label={t(
                      'createDAO.step4.alerts.minimumParticipationAlert',
                      {
                        percentage: minimumParticipationPercent,
                        walletCount: Math.ceil(
                          (value * whitelistWallets.length) / 100
                        ),
                      }
                    )}
                    mode="neutral"
                  />
                </ApprovalWrapper>
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </>
            )}
          />
        </FormItem>
      )}

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
          rules={{
            validate: value => percentageInputValidator(value),
          }}
          render={({
            field: {onBlur, onChange, value, name},
            fieldState: {error},
          }) => (
            <>
              <FormWrapper>
                <NumberInput
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  placeholder={t('placeHolders.daoName')}
                  percentage
                />
              </FormWrapper>
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
        <DurationContainer>
          <Controller
            name="durationDays"
            control={control}
            defaultValue="1"
            rules={{
              required: t('errors.emptyDistributionDays') as string,
              validate: value =>
                value >= 0 ? true : t('errors.distributionDays'),
            }}
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <TimeLabelWrapper>
                <TimeLabel>{t('createDAO.step4.days')}</TimeLabel>
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
              </TimeLabelWrapper>
            )}
          />

          <Controller
            name="durationHours"
            control={control}
            defaultValue="0"
            rules={{
              required: t('errors.emptyDistributionHours') as string,
              validate: value =>
                value <= 23 && value >= 0
                  ? true
                  : t('errors.distributionHours'),
            }}
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <TimeLabelWrapper>
                <TimeLabel>{t('createDAO.step4.hours')}</TimeLabel>
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
              </TimeLabelWrapper>
            )}
          />

          <Controller
            name="durationMinutes"
            control={control}
            defaultValue="0"
            rules={{
              required: t('errors.emptyDistributionMinutes') as string,
              validate: value =>
                value <= 59 && value >= 0
                  ? true
                  : t('errors.distributionMinutes'),
            }}
            render={({
              field: {onBlur, onChange, value, name},
              fieldState: {error},
            }) => (
              <TimeLabelWrapper>
                <TimeLabel>{t('createDAO.step4.minutes')}</TimeLabel>
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
              </TimeLabelWrapper>
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
  className: 'w-1/2 tablet:w-1/3 pr-1.5',
})``;

const ApprovalWrapper = styled.div.attrs({
  className:
    'flex flex-col tablet:flex-row space-y-1.5 tablet:space-y-0 tablet:space-x-2',
})``;

const DurationContainer = styled.div.attrs({
  className:
    'flex flex-col tablet:flex-row space-y-1.5 tablet:space-y-0 tablet:space-x-1.5',
})``;

const TimeLabelWrapper = styled.div.attrs({
  className: 'w-1/2 tablet:w-full space-y-0.5',
})``;

const TimeLabel = styled.span.attrs({
  className: 'text-sm font-bold text-ui-800',
})``;
