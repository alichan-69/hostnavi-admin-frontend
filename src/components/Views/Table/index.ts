import type { FilterFn } from '@tanstack/react-table';
import { dayJs } from '../../../utils/day';
import { MONTH_DAY_HOUR_MINUTE_TIME_FORMAT } from '../../../const/date';

declare module '@tanstack/table-core' {
  interface FilterFns {
    numberFilter: FilterFn<unknown>;
    timeFilter: FilterFn<unknown>;
  }
}

export const FUZZY_FILTER = 'fuzzy';
export const NUMBER_FILTER = 'numberFilter';
export const TIME_FILTER = 'timeFilter';
export const SELECTED_ROWS = [
  {
    label: 5,
    value: 5,
  },
  {
    label: 10,
    value: 10,
  },
  {
    label: 20,
    value: 20,
  },
];

const fuzzy: FilterFn<any> = (row, columnId, value) => {
  const column = row.getValue(columnId);

  return String(column).includes(value);
};

const numberFilter: FilterFn<any> = (row, columnId, value) => {
  // 列に格納されている値を文字列化して入力された値と比較する様に設定する
  const column = row.getValue(columnId);

  return String(column).includes(value);
};

const timeFilter: FilterFn<any> = (row, columnId, value) => {
  // 列に格納されている値を文字列化して入力された値と比較する様に設定する
  const time = row.getValue(columnId);
  const stringTime = String(dayJs(time as Date).format(MONTH_DAY_HOUR_MINUTE_TIME_FORMAT));

  return stringTime.includes(value);
};

export const filterFns = {
  fuzzy,
  numberFilter,
  timeFilter,
};

export { default as InnTable } from './InnTable';
export { default as MessageTable } from './MessageTable';
export { default as ReservationTable } from './ReservationTable';
export { default as ReviewTable } from './ReviewTable';
export { default as TodayReservationTable } from './TodayReservationTable';
