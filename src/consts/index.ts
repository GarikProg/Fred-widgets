import { DataFrequency } from '../api/fred/types';

export const LABELS = {
  MAIN_PAGE_TITLE: 'FRED widgets',
  ADD_WIDGET: 'Add FRED widget',
  EDIT_WIDGET: 'Edit fred widget',
  INPUT_SEARCH_SERIES: 'Input search series',
  DELETE_CONFIRM: 'Are you sure want to delete widget?',
  DEFAULT_ERROR: 'Something went wrong',
  NO_WIDGETS: 'Your dashboard is waiting for your widgets.',
  ADD: 'Add widget',
  WIDGET_TITLE: 'Widget title',
  CHART_SERIES: 'Chart series',
  CHART_COLOR: 'Chart color',
  Y_AXIS_LABEL: 'Y axis label',
  REALTIME_START: 'Real time start',
  REALTIME_END: 'Real time end',
  SERIES_FREQUENCY: 'Series frequency',
};

export const BASE_FRED_URL = '/api';

export const FRED_API_KEY = import.meta.env.VITE_API_FRED_KEY;

export const DataFrequencyOptions = [
  {
    value: DataFrequency.d,
    label: 'Daily',
  },
  {
    value: DataFrequency.w,
    label: 'Weekly',
  },
  {
    value: DataFrequency.bw,
    label: 'Biweekly',
  },
  {
    value: DataFrequency.m,
    label: 'Monthly',
  },
  {
    value: DataFrequency.q,
    label: 'Quarterly',
  },
  {
    value: DataFrequency.sa,
    label: 'Semiannual',
  },
  {
    value: DataFrequency.a,
    label: 'Annual',
  },
  {
    value: DataFrequency.wef,
    label: 'Weekly, Ending Friday',
  },
  {
    value: DataFrequency.weth,
    label: 'Weekly, Ending Thursday',
  },
  {
    value: DataFrequency.wew,
    label: 'Weekly, Ending Wednesday',
  },
  {
    value: DataFrequency.wetu,
    label: 'Weekly, Ending Tuesday',
  },
  {
    value: DataFrequency.wem,
    label: 'Weekly, Ending Monday',
  },
  {
    value: DataFrequency.wesu,
    label: 'Weekly, Ending Sunday',
  },
  {
    value: DataFrequency.wesa,
    label: 'Weekly, Ending Saturday',
  },
  {
    value: DataFrequency.bwew,
    label: 'Biweekly, Ending Wednesday',
  },
  {
    value: DataFrequency.bwem,
    label: 'Biweekly, Ending Monday',
  },
];

export const frequencyLabels = DataFrequencyOptions.reduce<
  Record<string, string>
>(
  (acc, cur) => {
    acc[cur.value] = cur.label;
    return acc;
  },
  {} as Record<DataFrequency, string>,
);

export const MAX_RETRIES = 3;
export const DATE_FORMAT = 'YYYY-MM-DD';
