import {AlertInline, DateInput, DropdownInput} from '@aragon/ui-components';
import {SimplifiedTimeInput} from 'components/inputTime/inputTime';
import {useTransferModalContext} from 'context/transfersModal';
import React from 'react';
import {Controller, useFormContext, useWatch} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';
import {daysToMils} from 'utils/date';

type DateSectionProps = {
  isStartDate: boolean;
};

const DateSection: React.FC<DateSectionProps> = ({isStartDate}) => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {control} = useFormContext();
  const [startDate, endDate] = useWatch({
    name: ['startDate', 'endDate', 'duration'],
  });

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

  const dateInputName = isStartDate ? 'startDate' : 'endDate';
  const timeInputName = isStartDate ? 'startTime' : 'endTime';
  const dateInputValidator = isStartDate
    ? startDateValidator
    : endDateValidator;
  const timeInputValidator = isStartDate
    ? startTimeValidator
    : endTimeValidator;

  return (
    <HStack>
      <Controller
        name={dateInputName}
        control={control}
        rules={{
          required: t('errors.required.time'),
          validate: dateInputValidator,
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
        name={timeInputName}
        control={control}
        rules={{
          required: t('errors.required.date'),
          validate: timeInputValidator,
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
        <DropdownInput value={utc} onClick={() => open('utc')} />
      </div>
    </HStack>
  );
};

const HStack = styled.div.attrs({
  className: 'inline-flex space-x-1',
})``;

const AlertWrapper = styled.div.attrs({
  className: 'mt-1',
})``;
