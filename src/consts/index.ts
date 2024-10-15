import { DataFrequency } from '../api/fred/types';

export const LABELS = {
  MAIN_PAGE_TITLE: 'Fred widgets',
  ADD_WIDGET: 'Add fred widget',
  EDIT_WIDGET: 'Edit fred widget',
  INPUT_SEARCH_SERIES: 'Input search series',
  DELETE_CONFIRM: 'Are you sure want to delete widget?',
  DEFAULT_ERROR: 'Something went wrong',
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
