import { FC, useMemo } from 'react';
import { FredObservationItem } from '../../api/fred/types';

import ReactECharts from 'echarts-for-react';

type Props = {
  data: FredObservationItem[];
  color?: string;
  yAxisLabel?: string;
};

export const Chart: FC<Props> = ({ data, yAxisLabel, color }) => {
  const options = useMemo(
    () => ({
      grid: { top: 8, right: 8, bottom: 24, left: 8 },
      xAxis: {
        type: 'category',
        data: data.map(({ date }) => date),
      },
      yAxis: {
        type: 'value',
        label: yAxisLabel,
      },
      series: [
        {
          data: data.map(({ value }) => value),
          type: 'line',
          lineStyle: {
            color,
          },
          smooth: true,
        },
      ],
      tooltip: {
        trigger: 'axis',
      },
    }),
    [data, yAxisLabel, color],
  );

  return <ReactECharts option={options} />;
};
