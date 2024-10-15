import { Dayjs } from 'dayjs';
import { DataFrequency } from '../api/fred/types';

type Widget = {
  title: string;
  id: string;
};

export type FredRequestParams = {
  seriesId: string;
  realtimeStart?: string;
  realtimeEnd?: string;
  frequency?: DataFrequency;
};

export type FredChartWidget = Widget &
  FredRequestParams & {
    chartColor?: string;
    yAxisLabel?: string;
    seriesLabel?: string;
  };

export type FredChartWidgetFormValue = Omit<
  FredChartWidget,
  'realtimeStart' | 'realtimeEnd'
> & {
  realtimeStart?: Dayjs;
  realtimeEnd?: Dayjs;
};
