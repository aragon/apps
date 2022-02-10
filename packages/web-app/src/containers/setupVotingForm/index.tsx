import {
  AlertInline,
  CheckboxListItem,
  DateInput,
  DropdownInput,
  Label,
  NumberInput,
} from '@aragon/ui-components';
import {toDate} from 'date-fns-tz';
import {Controller, FieldError, useFormContext} from 'react-hook-form';
import styled from 'styled-components';
import {useTranslation} from 'react-i18next';
import React, {useEffect, useState} from 'react';

import {DateModeSwitch, EndDateType} from './dateModeSwitch';
import {SimplifiedTimeInput} from 'components/inputTime/inputTime';
import {useTransferModalContext} from 'context/transfersModal';
import UtcMenu from 'containers/utcMenu';
import {timezones} from 'containers/utcMenu/utcData';
import {
  daysToMils,
  getCanonicalUtcOffset,
  getFormattedUtcOffset,
} from 'utils/date';
import {DateTimeErrors} from './dateTimeErrors';

type UtcInstance = 'first' | 'second';

const SetupVotingForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {control, setValue, getValues, setError, formState} = useFormContext();

  /*************************************************
   *                    STATE & EFFECT             *
   *************************************************/

  const [endDateType, setEndDateType] = useState<EndDateType>('duration');
  const [utcInstance, setUtcInstance] = useState<UtcInstance>('first');
  const [utcStart, setUtcStart] = useState('');
  const [utcEnd, setUtcEnd] = useState('');

  useEffect(() => {
    const currTimezone = timezones.find(tz => tz === getFormattedUtcOffset());
    if (!currTimezone) {
      setUtcStart(timezones[13]);
      setUtcEnd(timezones[13]);
      setValue('startUtc', timezones[13]);
      setValue('endUtc', timezones[13]);
    } else {
      setUtcStart(currTimezone);
      setUtcEnd(currTimezone);
      setValue('startUtc', currTimezone);
      setValue('endUtc', currTimezone);
    }
  }, []);

  useEffect(() => {
    const fieldErrors: FieldError[] = Object.values(formState.errors);
    const hasEmptyFields = fieldErrors.some(
      e =>
        e.type === 'validate' &&
        (e.ref?.name === 'startDate' || e.ref?.name === 'startTime')
    );
    if (!hasEmptyFields) {
      const error = startDateTimeValidator('');
      if (error) {
        setError('startTime', {
          type: 'validate',
          message: t('errors.startPast'),
        });
      }
    }
  }, [utcStart]);

  useEffect(() => {
    const error = startDateTimeValidator('');
    if (error) {
      setError('endTime', {type: 'validate', message: t('errors.startPast')});
    }
  }, [utcEnd]);

  /*************************************************
   *                Field Validators               *
   *************************************************/

  const startDateTimeValidator = (input: string) => {
    //Build input date
    const sDate = getValues('startDate');
    const sTime = getValues('startTime');
    const sUtc = getValues('startUtc');
    const canonicalSUtc = getCanonicalUtcOffset(sUtc);
    const startDateTime = toDate(sDate + 'T' + sTime + canonicalSUtc);
    const startMills = startDateTime.valueOf();

    const currDateTime = new Date();
    const currMills = currDateTime.getTime();

    if (startMills < currMills) {
      return t('errors.startPast');
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
    const daysOffset = daysToMils(5);
    const minMidnight = todayMidnight + daysOffset;

    if (endDate.getTime() < minMidnight) {
      return t('errors.endDatePast');
    }
    return '';
  };

  const endTimeValidator = (time: string) => {
    const endDateTime = new Date(getValues('endDate') + ' ' + time);
    const daysOffset = daysToMils(5);
    const minEndDateTime = new Date().getTime() + daysOffset;

    if (endDateTime.getTime() < minEndDateTime) {
      return t('errors.endDatePast');
    }
    return '';
  };

  const tzSelector = (tz: string) => {
    if (utcInstance === 'first') {
      setUtcStart(tz);
      setValue('startUtc', tz);
    } else {
      setUtcEnd(tz);
      setValue('endUtc', tz);
    }
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
            state="active"
            multiSelect={false}
            onClick={() => {}}
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
              validate: startDateTimeValidator,
            }}
            render={({field: {name, value, onChange}, fieldState: {error}}) => (
              <div>
                <DateInput name={name} value={value} onChange={onChange} />
              </div>
            )}
          />
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: t('errors.required.time'),
              validate: startDateTimeValidator,
            }}
            render={({field: {name, value, onChange}, fieldState: {error}}) => (
              <div>
                <SimplifiedTimeInput
                  name={name}
                  value={value}
                  onChange={onChange}
                />
              </div>
            )}
          />
          <div>
            <DropdownInput
              value={utcStart}
              onClick={() => {
                setUtcInstance('first');
                open('utc');
              }}
            />
          </div>
        </HStack>
        <DateTimeErrors mode={'start'} />
      </FormSection>

      {/* End date */}
      <FormSection>
        <Label
          label={t('labels.end')}
          helpText={t('newWithdraw.setupVoting.endDescription')}
        />
        {endDateType === 'duration' ? (
          <HStack>
            <DateModeSwitch value={endDateType} setValue={setEndDateType} />
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
                    <AlertWrapper>
                      <AlertInline label={error.message} mode="critical" />
                    </AlertWrapper>
                  )}
                </div>
              )}
            />
          </HStack>
        ) : (
          <div className="block space-y-2">
            <div>
              <DateModeSwitch value={endDateType} setValue={setEndDateType} />
            </div>
            <HStack>
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: t('errors.required.date'),
                  validate: endDateValidator,
                }}
                render={({field: {name, value, onChange}}) => (
                  <div>
                    <DateInput name={name} value={value} onChange={onChange} />
                  </div>
                )}
              />
              <Controller
                name="endTime"
                control={control}
                rules={{
                  required: t('errors.required.time'),
                  validate: endTimeValidator,
                }}
                render={({field: {name, value, onChange}}) => (
                  <div>
                    <SimplifiedTimeInput
                      name={name}
                      value={value}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <div>
                <DropdownInput
                  value={utcEnd}
                  onClick={() => {
                    setUtcInstance('second');
                    open('utc');
                  }}
                />
              </div>
            </HStack>
          </div>
        )}
        <DateTimeErrors mode={'end'} />
        <AlertInline label={t('infos.voteDuration')} mode="neutral" />
      </FormSection>
      <UtcMenu onTimezoneSelect={tzSelector} />
    </>
  );
};

export default SetupVotingForm;

const FormSection = styled.div.attrs({
  className: 'space-y-1.5',
})``;

const HStack = styled.div.attrs({
  className: 'inline-flex space-x-1',
})``;

const AlertWrapper = styled.div.attrs({
  className: 'mt-1',
})``;
