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
import UtcMenu from 'containers/utcMenu';
import {timezones} from 'containers/utcMenu/utcData';
import {
  daysToMills,
  getCanonicalDate,
  getCanonicalTime,
  getCanonicalUtcOffset,
  getFormattedUtcOffset,
} from 'utils/date';
import {DateTimeErrors} from './dateTimeErrors';
import {useGlobalModalContext} from 'context/globalModals';

type UtcInstance = 'first' | 'second';

const SetupVotingForm: React.FC = () => {
  const {t} = useTranslation();
  const {open} = useGlobalModalContext();
  const {control, setValue, getValues, setError, formState, clearErrors} =
    useFormContext();

  /*************************************************
   *                    STATE & EFFECT             *
   *************************************************/

  const [endDateType, setEndDateType] = useState<EndDateType>('duration');
  const [utcInstance, setUtcInstance] = useState<UtcInstance>('first');
  const [utcStart, setUtcStart] = useState('');
  const [utcEnd, setUtcEnd] = useState('');

  // Initializes values for the form
  // This is done here rather than in the defaulValues object as time can
  // ellapse between the creation of the form context and this stage of the form.
  useEffect(() => {
    if (!getValues('startTime'))
      setValue('startTime', getCanonicalTime({minutes: 10}));
    if (!getValues('startDate'))
      setValue('startDate', getCanonicalDate({minutes: 10}));
    if (!getValues('endTime'))
      setValue('endTime', getCanonicalTime({days: 5, minutes: 10}));
    if (!getValues('endDate'))
      setValue('endDate', getCanonicalDate({days: 5, minutes: 10}));

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
  }, []); //eslint-disable-line

  // validate start time on UTC changes
  // (Doing this in a separate hook is necessary since the UTC selector is
  // currently not controllable using the the form conroller)
  useEffect(() => {
    const fieldErrors: FieldError[] = Object.values(formState.errors);
    const hasEmptyFields = fieldErrors.some(
      e =>
        e.type === 'validate' &&
        (e.ref?.name === 'startDate' || e.ref?.name === 'startTime')
    );

    if (!hasEmptyFields) {
      const error = startDateTimeValidator();
      if (error) {
        setError('startTime', {
          type: 'validate',
          message: t('errors.startPast'),
        });
      }
    }
  }, [utcStart]); //eslint-disable-line

  // validate end time on UTC changes
  // (Doing this in a separate hook is necessary since the UTC selector is
  // currently not controllable using the the form conroller)
  useEffect(() => {
    const fieldErrors: FieldError[] = Object.values(formState.errors);
    const hasEmptyFields = fieldErrors.some(
      e =>
        e.type === 'validate' &&
        (e.ref?.name === 'endDate' || e.ref?.name === 'endTime')
    );

    if (!hasEmptyFields) {
      const error = endDateTimeValidator();
      if (error) {
        setError('endTime', {
          type: 'validate',
          message: t('errors.endPast'),
        });
      }
    }
  }, [utcEnd]); //eslint-disable-line

  /*************************************************
   *                Field Validators               *
   *************************************************/

  // computes start time in UTC milliseconds from available inputs
  function buildStartDateTime(): number {
    const sDate = getValues('startDate');
    const sTime = getValues('startTime');
    const sUtc = getValues('startUtc');

    const canonicalSUtc = getCanonicalUtcOffset(sUtc);
    const startDateTime = toDate(sDate + 'T' + sTime + canonicalSUtc);
    return startDateTime.valueOf();
  }

  // validates the start time and date. Does not take and argument, as it is not
  // tied to a single input.
  const startDateTimeValidator = () => {
    const startMills = buildStartDateTime();

    const currDateTime = new Date();
    const currMills = currDateTime.getTime();

    if (startMills < currMills) {
      return t('errors.startPast');
    } else {
      clearErrors('startDate');
      clearErrors('startTime');
      return '';
    }
  };

  // validates the end time and date. Does not take and argument, as it is not
  // tied to a single input.
  const endDateTimeValidator = () => {
    const eDate = getValues('endDate');
    const eTime = getValues('endTime');
    const eUtc = getValues('endUtc');
    const canonicalEUtc = getCanonicalUtcOffset(eUtc);
    const endDateTime = toDate(eDate + 'T' + eTime + canonicalEUtc);
    const endMills = endDateTime.valueOf();

    const startMills = buildStartDateTime();
    const minEndDateTimeMills = startMills + daysToMills(5);

    if (endMills < minEndDateTimeMills) {
      return t('errors.endPast');
    } else {
      clearErrors('endDate');
      clearErrors('endTime');
      return '';
    }
  };

  // sets the UTC values for the start and end date/time
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
            render={({field: {name, value, onChange, onBlur}}) => (
              <div>
                <DateInput
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </div>
            )}
          />
          <Controller
            name="startTime"
            control={control}
            rules={{
              required: t('errors.required.time'),
              // FIXME this triggers the validators, but for some reason they do
              // not assign the error to the correct field
              validate: {
                endTime: endDateTimeValidator,
                endDate: endDateTimeValidator,
                startTime: startDateTimeValidator,
                startDate: startDateTimeValidator,
              },
            }}
            render={({field: {name, value, onChange, onBlur}}) => (
              <div>
                <SimplifiedTimeInput
                  name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
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
          <>
            <HStack>
              <DateModeSwitch value={endDateType} setValue={setEndDateType} />
              <Controller
                name="duration"
                control={control}
                rules={{
                  min: {
                    value: 5,
                    message: t('errors.durationTooShort'),
                  },
                  required: t('errors.required.duration'),
                }}
                render={({field: {name, onChange, value}}) => {
                  return (
                    <NumberInput
                      name={name}
                      value={value}
                      min={5}
                      onChange={onChange}
                      width={144}
                    />
                  );
                }}
              />
            </HStack>
            {formState.errors?.duration?.message && (
              <AlertInline
                label={formState.errors.duration.message}
                mode="critical"
              />
            )}
          </>
        ) : (
          <>
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
                    validate: endDateTimeValidator,
                  }}
                  render={({field: {name, value, onChange, onBlur}}) => (
                    <div>
                      <DateInput
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="endTime"
                  control={control}
                  rules={{
                    required: t('errors.required.time'),
                    validate: endDateTimeValidator,
                  }}
                  render={({field: {name, value, onChange, onBlur}}) => (
                    <div>
                      <SimplifiedTimeInput
                        name={name}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
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
            <DateTimeErrors mode={'end'} />
          </>
        )}
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
