export type FredApiParams = {
  series_id: string;
  realtime_start?: string;
  realtime_end?: string;
  frequency?: DataFrequency;
};

export type FredObservationItem = {
  realtime_start: string;
  realtime_end: string;
  date: string;
  value: string;
  frequency: DataFrequency;
};

export type FredSeriesItem = {
  id: string;
  realtime_start: string;
  realtime_end: string;
  title: string;
  observation_start: string;
  observation_end: string;
  frequency: string;
  frequency_short: string;
  units: string;
  units_short: string;
  seasonal_adjustment: string;
  seasonal_adjustment_short: string;
  last_updated: string;
  popularity: number;
  group_popularity: number;
  notes: string;
};

export type FredObservationsResponse = {
  realtime_start: string;
  realtime_end: string;
  observation_start: string;
  observation_end: string;
  units: string;
  output_type: number;
  file_type: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  observations: FredObservationItem[];
};

export type FredSeriesResponse = {
  realtime_start: string;
  realtime_end: string;
  order_by: string;
  sort_order: string;
  count: number;
  offset: number;
  limit: number;
  seriess: FredSeriesItem[];
};

export enum DataFrequency {
  d = 'd',
  w = 'w',
  bw = 'bw',
  m = 'm',
  q = 'q',
  sa = 'sa',
  a = 'a',
  wef = 'wef',
  weth = 'weth',
  wew = 'wew',
  wetu = 'wetu',
  wem = 'wem',
  wesu = 'wesu',
  wesa = 'wesa',
  bwew = 'bwew',
  bwem = 'bwem',
}

export type ApiError = {
  error_code?: number;
  error_message?: string;
};
