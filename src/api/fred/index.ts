import axios from 'axios';
import { BASE_FRED_URL, FRED_API_KEY } from '../../consts';
import {
  FredApiParams,
  FredObservationsResponse,
  FredSeriesResponse,
} from './types';

const axiosInstance = axios.create({
  baseURL: BASE_FRED_URL,
});

const BASE_PARAMS = {
  file_type: 'json',
  api_key: FRED_API_KEY,
};

export const fetchFredObservationsData = async (
  params: FredApiParams,
): Promise<FredObservationsResponse> => {
  const { data } = await axiosInstance.get('/fred/series/observations', {
    params: { ...BASE_PARAMS, ...params },
  });
  return data;
};

export const fetchFredSeriesData = async (
  searchText: string,
): Promise<FredSeriesResponse> => {
  const { data } = await axiosInstance.get('/fred/series/search', {
    params: { ...BASE_PARAMS, search_text: searchText },
  });
  return data;
};
