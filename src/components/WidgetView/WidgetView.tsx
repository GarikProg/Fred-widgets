import { FC, memo, useCallback } from 'react';
import { FredChartWidget } from '../../types';
import { Button, Card, Flex, Popconfirm, Space, Spin } from 'antd';
import { Chart } from '../Chart/Chart';
import { useFredQuery } from '../../hooks/useFredQuery';

import classes from './WidgetView.module.css';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { LABELS } from '../../consts';

type Props = {
  widget: FredChartWidget;
  onConfig: (widget: FredChartWidget) => void;
  onDelete: (id: string) => void;
};

const WidgetView: FC<Props> = ({ widget, onConfig, onDelete }) => {
  const { seriesId, realtimeEnd, realtimeStart, title, frequency } = widget;

  const { isLoading, data, error } = useFredQuery({
    seriesId,
    realtimeEnd,
    realtimeStart,
    frequency,
  });

  const handleConfig = useCallback(() => {
    console.log(widget);

    onConfig(widget);
  }, [widget]);

  const handleDelete = useCallback(() => {
    onDelete(widget.id);
  }, []);

  return (
    <Card
      className={classes.Widget}
      title={
        <Flex align="center" justify="space-between">
          <p>{title}</p>
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={handleConfig}
              type="text"
              size="small"
            />
            <Popconfirm title={LABELS.DELETE_CONFIRM} onConfirm={handleDelete}>
              <Button icon={<DeleteOutlined />} type="text" size="small" />
            </Popconfirm>
          </Space>
        </Flex>
      }
    >
      {isLoading && <Spin />}

      {error ? (
        <Space>
          <p>{LABELS.DEFAULT_ERROR}</p>
        </Space>
      ) : null}

      {data && <Chart data={data.observations} color={widget.yAxisLabel} />}
    </Card>
  );
};

export default memo(WidgetView);
