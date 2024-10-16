import { AxiosError } from 'axios';
import { frequencyLabels, LABELS } from '../consts';
import { ApiError } from '../api/fred/types';

export function getErrorMessage(error: AxiosError<ApiError>) {
  const apiErrorMessage = error.response?.data.error_message;
  const defaultAxiosErrorMessage = error.message;

  if (apiErrorMessage?.includes('Value of frequency is not one of:')) {
    const errorMessageArr = apiErrorMessage.split(':');
    const periods = errorMessageArr[1]
      .split(',')
      .map((period) => frequencyLabels[period.replace(/['\s.]/g, '')]);
    return `${errorMessageArr[0]}: ${periods.join(', ')}.`;
  }

  return apiErrorMessage || defaultAxiosErrorMessage || LABELS.DEFAULT_ERROR;
}
