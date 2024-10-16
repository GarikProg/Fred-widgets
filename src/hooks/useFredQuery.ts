import { useQuery } from '@tanstack/react-query';
import { fetchFredObservationsData } from '../api/fred';
import { FredRequestParams } from '../types';
import { ApiError, FredObservationsResponse } from '../api/fred/types';
import { AxiosError } from 'axios';
import { MAX_RETRIES } from '../consts';

export const useFredQuery = (params: FredRequestParams) => {
  return useQuery<FredObservationsResponse, AxiosError<ApiError>>({
    queryKey: [JSON.stringify(params)],
    queryFn: () =>
      fetchFredObservationsData({
        series_id: params.seriesId,
        realtime_end: params.realtimeEnd,
        realtime_start: params.realtimeStart,
        frequency: params.frequency,
      }),
    retry(failureCount, { status }) {
      if (status && status >= 400 && status < 500 && status !== 429) {
        return false;
      }

      return failureCount < MAX_RETRIES;
    },
  });
};
