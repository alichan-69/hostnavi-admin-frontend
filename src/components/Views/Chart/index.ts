import { CHART_DISPLAYED_MIN_MONTH, CHART_DISPLAYED_MIN_YEAR, CURRENT_DATE } from '../../../const/date';
import { dayJs } from '../../../utils/day';

export const BORDER_COLOR = 'rgb(246, 149, 2)';
export const CHART_OPTIONS = {
  scales: {
    y: {
      beginAtZero: false,
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};
export const CHART_SELECTED_MONTHS = [...Array(12)].map((_, i) => {
  const formatedMonth = Number(
    dayJs(CURRENT_DATE.setMonth(CHART_DISPLAYED_MIN_MONTH))
      .add(i - 1, 'month')
      .format('M'),
  );

  return {
    label: `${formatedMonth}月`,
    value: formatedMonth,
  };
});
export const CHART_SELECTED_YEARS = [...Array(3)].map((_, i) => {
  const formatedMonth = CHART_DISPLAYED_MIN_YEAR + i;

  return {
    label: `${formatedMonth}年`,
    value: formatedMonth,
  };
});
export const COMPLETED_PAYMENT_STATUS_IDS = [2, 3, 4];

export { default as MonthlyIncomeChart } from './MonthlyIncomeChart';
export { default as MonthlyViewChart } from './MonthlyViewChart';
export { default as YearlyIncomeChart } from './YearlyIncomeChart';
export { default as YearlyViewChart } from './YearlyViewChart';
