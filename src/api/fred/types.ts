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
  units: string; // ENUM
  output_type: number; // ENUM
  file_type: string; // ENUM
  order_by: string; // ENUM
  sort_order: string; // ENUM
  count: number;
  offset: number;
  limit: number;
  observations: FredObservationItem[];
};

export type FredSeriesResponse = {
  realtime_start: string;
  realtime_end: string;
  order_by: string; // ENUM
  sort_order: string; // ENUM
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
