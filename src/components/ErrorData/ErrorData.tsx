import { AxiosError } from 'axios';
import { FC, memo } from 'react';
import { ApiError } from '../../api/fred/types';
import { getErrorMessage } from '../../lib/getErrorMessage';
import { Typography } from 'antd';

import classes from './ErrorData.module.css';

type Props = {
  error: AxiosError<ApiError>;
};

const ErrorData: FC<Props> = ({ error }) => {
  const errorMessage = getErrorMessage(error);

  return (
    <Typography.Text className={classes.ErrorMessage}>
      {errorMessage}
    </Typography.Text>
  );
};

export default memo(ErrorData);
