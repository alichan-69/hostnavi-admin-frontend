import { dayJs } from '../utils/day';

export const CURRENT_DATE = new Date(2023, 5, 14, 12);
export const CALENDER_DISPLAYED_MIN_YEAR = dayJs().year() - 1;
export const CALENDER_DISPLAYED_MAX_YEAR = dayJs().year() + 1;
export const CHART_DISPLAYED_MIN_YEAR = dayJs().year() - 2;
export const CHART_DISPLAYED_MIN_MONTH = Number(dayJs().startOf('year').format('M'));
export const YEAR_MONTH_DAY_HOUR_MINUTE_TIME_FORMAT = 'YYYY年M月D日HH時mm分';
export const YEAR_MONTH_DAY_TIME_FORMAT = 'YYYY年M月D日';
export const MONTH_DAY_HOUR_MINUTE_TIME_FORMAT = 'M月D日HH時mm分';
export const DAY_HOUR_MINUTE_TIME_FORMAT = 'D日HH時mm分';
