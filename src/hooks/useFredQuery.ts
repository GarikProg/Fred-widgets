import { useQuery } from '@tanstack/react-query';
import { fetchFredObservationsData } from '../api/fred';
import { FredRequestParams } from '../types';

export const useFredQuery = (params: FredRequestParams) => {
  return useQuery({
    queryKey: [JSON.stringify(params)],
    queryFn: () =>
      fetchFredObservationsData({
        series_id: params.seriesId,
        realtime_end: params.realtimeEnd,
        realtime_start: params.realtimeStart,
        frequency: params.frequency,
      }),
  });
};
