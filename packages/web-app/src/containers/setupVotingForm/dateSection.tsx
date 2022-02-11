import {AlertInline, DateInput, DropdownInput} from '@aragon/ui-components';
import {toDate} from 'date-fns-tz';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components';

import {SimplifiedTimeInput} from 'components/inputTime/inputTime';
import {useTransferModalContext} from 'context/transfersModal';
import {daysToMills, getCanonicalUtcOffset} from 'utils/date';

type DateSectionProps = {
  isStartDate: boolean;
};

const DateSection: React.FC<DateSectionProps> = ({isStartDate}) => {
  const {t} = useTranslation();
  const {open} = useTransferModalContext();
  const {control, getValues} = useFormContext();

  /*************************************************
   *                Field Validators               *
   *************************************************/

  const startDateTimeValidator = (input: string) => {
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

  const endDateTimeValidator = (input: string) => {
    const eDate = getValues('endDate');
    const eTime = getValues('endTime');
    const eUtc = getValues('endUtc');
    const canonicalEUtc = getCanonicalUtcOffset(eUtc);
    const endDateTime = toDate(eDate + 'T' + eTime + canonicalEUtc);
    const endMills = endDateTime.valueOf();

    const sDate = getValues('startDate');
    const sTime = getValues('startTime');
    const sUtc = getValues('startUtc');
    const canonicalSUtc = getCanonicalUtcOffset(sUtc);
    const startDateTime = toDate(sDate + 'T' + sTime + canonicalSUtc);
    const startMills = startDateTime.valueOf();
    const minEndDateTimeMills = startMills + daysToMills(5);

    if (endMills < minEndDateTimeMills) {
      console.log('TRACING end < start + 5 days');
      return t('errors.endPast');
    }
    return '';
  };

  const dateInputName = isStartDate ? 'startDate' : 'endDate';
  const timeInputName = isStartDate ? 'startTime' : 'endTime';
  const dateTimeInputValidator = isStartDate
    ? startDateTimeValidator
    : endDateTimeValidator;

  return (
    <HStack>
      <Controller
        name={dateInputName}
        control={control}
        rules={{
          required: t('errors.required.time'),
          validate: dateTimeInputValidator,
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
          validate: dateTimeInputValidator,
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
        <DropdownInput value={'utc'} onClick={() => open('utc')} />
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
