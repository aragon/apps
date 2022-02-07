import {
  AlertInline,
  CheckboxListItem,
  DateInput,
  DropdownInput,
  IconRadioSelected,
  Label,
  NumberInput,
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
import React, {useEffect, useState} from 'react';

import {useTransferModalContext} from 'context/transfersModal';
import {timezones} from 'containers/utcMenu/utcData';
import {getCanonicalUtcOffset} from 'utils/date';
import {SimplifiedTimeInput} from 'components/inputTime/inputTime';
import UtcMenu from 'containers/utcMenu';

type EndDateType = 'duration' | 'date';

const SetupVotingForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {control} = useFormContext();
  const {errors} = useFormState({control});
  const [startDate, endDate, duration] = useWatch({
    name: ['startDate', 'endDate', 'duration'],
  });

  /*************************************************
   *                    STATE & EFFECT             *
   *************************************************/

  const [utc, setUtc] = useState('');
  const [endDateType, setEndDateType] = useState<EndDateType>('date');

  useEffect(() => {
    const currTimezone = timezones.find(tz => tz === getCanonicalUtcOffset());
    if (!currTimezone) {
      setUtc(timezones[13]);
    } else {
      setUtc(currTimezone);
    }
  }, []);

  useEffect(() => {
    if (errors.duration && duration > 4) errors.duration = undefined;
  }, [duration]);

  /*************************************************
   *                Field Validators               *
   *************************************************/

  const startDateValidator = (date: string) => {
    const startDate = new Date(date);
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    // TODO remove
    const currDay = new Date(todayMidnight);

    if (startDate.getTime() < currDay.getTime()) {
      return t('errors.startDatePast');
    }
    return '';
  };

  const startTimeValidator = (time: string) => {
    const startDateTime = new Date(startDate + ' ' + time);
    const currDate = new Date();

    if (startDateTime.getTime() < currDate.getTime()) {
      return t('errors.startTimePast');
    }
    return '';
  };

  const durationValidator = (duration: number) => {
    if (duration < 5) {
      return t('errors.durationTooShort');
    }
    return '';
  };

  const endDateValidator = (date: string) => {
    const endDate = new Date(date);
    const todayMidnight = new Date().setHours(0, 0, 0, 0);
    const minMidnight = todayMidnight + 432000000;

    if (endDate.getTime() < minMidnight) {
      return t('errors.endDatePast');
    }
    return '';
  };

  const endTimeValidator = (time: string) => {
    const endDateTime = new Date(endDate + ' ' + time);
    const minEndDateTime = new Date().getTime() + 432000000;

    if (endDateTime.getTime() < minEndDateTime) {
      return t('errors.endDatePast');
    }
    return '';
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
            name="startDate"
            control={control}
            rules={{
              required: t('errors.required.date'),
              validate: startDateValidator,
            }}
            render={({field: {name, value, onChange}, fieldState: {error}}) => (
              <div>
                <DateInput name={name} value={value} onChange={onChange} />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </div>
            )}
          />
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: t('errors.required.time'),
              validate: startTimeValidator,
            }}
            render={({field: {name, value, onChange}, fieldState: {error}}) => (
              <div>
                <SimplifiedTimeInput
                  name={name}
                  value={value}
                  onChange={onChange}
                />
                {error?.message && (
                  <AlertInline label={error.message} mode="critical" />
                )}
              </div>
            )}
          />
          <DropdownInput value={utc} onClick={() => open('utc')} />
        </HStack>
      </FormSection>

      {/* End date */}
      <FormSection>
        <Label
          label={t('labels.end')}
          helpText={t('newWithdraw.setupVoting.endDescription')}
        />
        {endDateType === 'duration' ? (
          <HStack>
            <NetworkSwitch value={endDateType} setValue={setEndDateType} />
            <Controller
              name="duration"
              control={control}
              rules={{
                required: t('errors.required.duration'),
                validate: durationValidator,
              }}
              render={({
                field: {name, onChange, value},
                fieldState: {error},
              }) => (
                <div>
                  {/* FIXME: this is currently not working properly, because
                  we're mixing controlled and uncontrolled components. The
                  buttons inside the numeric input are handled with a ref, which
                  does not trigger onchange events. This means that we can
                  detect changes in the input when typing them, but not when
                  using the buttons. This is an issue when typing 0. This
                  correctly triggers the error state, but then does not trigger
                  it again when using the buttons afterwards. */}
                  <NumberInput
                    mode={error?.message ? 'critical' : 'default'}
                    name={name}
                    value={value}
                    min={5}
                    onChange={onChange}
                    width={144}
                  />
                  {error?.message && (
                    <AlertInline label={error.message} mode="critical" />
                  )}
                </div>
              )}
            />
          </HStack>
        ) : (
          <div className="block space-y-2">
            <div>
              <NetworkSwitch value={endDateType} setValue={setEndDateType} />
            </div>
            <HStack>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: t('errors.required.time'),
                  validate: endDateValidator,
                }}
                render={({
                  field: {name, value, onChange},
                  fieldState: {error},
                }) => (
                  <div>
                    <DateInput name={name} value={value} onChange={onChange} />
                    {error?.message && (
                      <AlertInline label={error.message} mode="critical" />
                    )}
                  </div>
                )}
              />
              <Controller
                name="endTime"
                control={control}
                rules={{
                  required: t('errors.required.date'),
                  validate: endTimeValidator,
                }}
                render={({
                  field: {name, value, onChange},
                  fieldState: {error},
                }) => (
                  <div>
                    <SimplifiedTimeInput
                      name={name}
                      value={value}
                      onChange={onChange}
                    />
                    {error?.message && (
                      <AlertInline label={error.message} mode="critical" />
                    )}
                  </div>
                )}
              />
              <DropdownInput value={utc} onClick={() => open('utc')} />
            </HStack>
          </div>
        )}
        <AlertInline label={t('infos.voteDuration')} mode="neutral" />
      </FormSection>
      <UtcMenu onTimezoneSelect={setUtc} />
    </>
  );
};

export default SetupVotingForm;

type NetworkSwitchProps = {
  value: EndDateType;
  setValue: (value: EndDateType) => void;
};

const NetworkSwitch = ({value, setValue}: NetworkSwitchProps) => {
  const {t} = useTranslation();

  return (
    <SwitchContainer>
      <ButtonText
        mode="secondary"
        label={t('labels.days')}
        isActive={value === 'duration'}
        onClick={() => setValue('duration')}
        size="large"
      />
      <ButtonText
        mode="secondary"
        label={t('labels.dateTime')}
        isActive={value === 'date'}
        onClick={() => setValue('date')}
        size="large"
      />
    </SwitchContainer>
  );
};

const FormSection = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const HStack = styled.div.attrs({
  className: 'inline-flex space-x-1',
})``;

const SwitchContainer = styled.div.attrs({
  className: 'inline-flex p-0.5 space-x-0.5 bg-ui-0 rounded-xl',
})`
  height: fit-content;
`;
