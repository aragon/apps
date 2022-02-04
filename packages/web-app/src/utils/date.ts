import {i18n} from '../../i18n.config';
import {InputTime} from '@aragon/ui-components';

import {ProposalData, VotingData} from './types';
/**
 * Note: This function will return a list of timestamp that we can use to categorize transfers
 * @return a object with milliseconds params
 */
export function getDateSections(): {
  lastWeek: number;
  lastMonth: number;
  lastYear: number;
} {
  const date = new Date();
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const lastWeek: number = new Date(date.setDate(diff)).getTime();
  const lastMonth: number = new Date(
    date.getFullYear(),
    date.getMonth(),
    1
  ).getTime();
  const lastYear: number = new Date(date.getFullYear(), 0, 1).getTime();

  return {
    lastWeek,
    lastMonth,
    lastYear,
  };
}

/**
 * Returns the current date as a string with the following format:
 * "yyyy-mm-dd".
 *
 * This date format is necessary when working with html inputs of type "date".
 */
export function getCanonicalDate(): string {
  const currDate = new Date();
  const currMonth = currDate.getMonth() + 1;
  const formattedMonth = currMonth > 9 ? '' + currMonth : '0' + currMonth;
  const currDay = currDate.getDate();
  const formattedDay = currDay > 9 ? '' + currDay : '0' + currDay;
  const formattedDate =
    '' + currDate.getFullYear() + '-' + formattedMonth + '-' + formattedDay;
  return formattedDate;
}

/**
 * Returns the current time as a string with the following format:
 * "hh:mm".
 *
 * This time format is necessary when working with html inputs of type "time".
 */
export function getCanonicalTime(): string {
  const currDate = new Date();
  let currHours = currDate.getHours();
  let currMinutes = currDate.getMinutes();
  const formattedHours = currHours > 9 ? '' + currHours : '0' + currHours;
  const formattedMinutes =
    currMinutes > 9 ? '' + currMinutes : '0' + currMinutes;

  return '' + formattedHours + ':' + formattedMinutes;
}

export function get12HourTime(): InputTime {
  const currDate = new Date();
  let meridian = 'am';
  let currHours = currDate.getHours();
  if (currDate.getHours() > 12) {
    currHours = currDate.getHours() - 12;
    meridian = 'pm';
  } else {
    meridian = 'am';
  }
  const formattedHours = currHours > 9 ? '' + currHours : '0' + currHours;
  const currMinutes = currDate.getMinutes();
  const formattedTime = '' + formattedHours + '-' + currMinutes;
  return {time: formattedTime, midday: meridian};
}

/**
 * Note: This function will return the remaining time from input timestamp
 * to current time.
 * @param timestamp proposal creat/end timestamp must be greater than current timestamp
 * @returns remaining timestamp from now
 */
export function getRemainingTime(
  timestamp: number | string // in seconds
): number {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);
  return parseInt(`${timestamp}`) - currentTimestamp;
}

/**
 * Note: this function will convert the proposal's timestamp to proper string to show
 * as a alert message on proposals card
 * @param type return the message if the type was pending or active
 * @param voteData proposal's voting data, containing the timestamps (in UTC
 * seconds) of the start and end of vote.
 * @returns a message with i18 translation as proposal ends alert
 */
export function translateProposalDate(
  type: ProposalData['type'],
  voteData: VotingData
): string | null {
  let leftTimestamp;
  if (type === 'pending') {
    leftTimestamp = getRemainingTime(voteData.start);
  } else if (type === 'active') {
    leftTimestamp = getRemainingTime(voteData.end);
  } else {
    return null;
  }
  const days = Math.floor(leftTimestamp / 86400);
  const hours = Math.floor((leftTimestamp % 86400) / 3600);
  return i18n.t(`governance.proposals.${type}`, {days, hours}) as string;
}
