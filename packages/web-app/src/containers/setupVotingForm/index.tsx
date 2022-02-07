import {
  AlertInline,
  CheckboxListItem,
  DateInput,
  DropdownInput,
  IconRadioSelected,
  Label,
  NumberInput,
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

import {DateModeSwitch, EndDateType} from './dateModeSwitch';
import {SimplifiedTimeInput} from 'components/inputTime/inputTime';
import {useTransferModalContext} from 'context/transfersModal';
import UtcMenu from 'containers/utcMenu';
import {timezones} from 'containers/utcMenu/utcData';
import {daysToMils, getCanonicalUtcOffset} from 'utils/date';

type UtcInstance = 'first' | 'second';

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

  const [utcStart, setUtcStart] = useState('');
  const [utcEnd, setUtcEnd] = useState('');
  const [utcInstance, setUtcInstance] = useState<UtcInstance>('first');
  const [endDateType, setEndDateType] = useState<EndDateType>('duration');

  useEffect(() => {
    const currTimezone = timezones.find(tz => tz === getCanonicalUtcOffset());
    if (!currTimezone) {
      setUtcStart(timezones[13]);
      setUtcEnd(timezones[13]);
    } else {
      setUtcStart(currTimezone);
      setUtcEnd(currTimezone);
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
    const daysOffset = daysToMils(5);
    const minMidnight = todayMidnight + daysOffset;

    if (endDate.getTime() < minMidnight) {
      return t('errors.endDatePast');
    }
    return '';
  };

  const endTimeValidator = (time: string) => {
    const endDateTime = new Date(endDate + ' ' + time);
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
    } else {
      setUtcEnd(tz);
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
                  <AlertWrapper>
                    <AlertInline label={error.message} mode="critical" />
                  </AlertWrapper>
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
                  <AlertWrapper>
                    <AlertInline label={error.message} mode="critical" />
                  </AlertWrapper>
                )}
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
                      <AlertWrapper>
                        <AlertInline label={error.message} mode="critical" />
                      </AlertWrapper>
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
                      <AlertWrapper>
                        <AlertInline label={error.message} mode="critical" />
                      </AlertWrapper>
                    )}
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
