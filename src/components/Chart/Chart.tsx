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
      grid: { top: 32, right: 8, bottom: 24, left: 48 },
      xAxis: {
        type: 'category',
        data: data.map(({ date }) => date),
      },
      toolbox: {
        show: true,
        feature: {
          magicType: { type: ['line', 'bar'] },
        },
      },
      yAxis: {
        type: 'value',
        name: yAxisLabel,
        nameGap: 20,
        nameTextStyle: {
          align: 'start',
        },
      },
      series: [
        {
          data: data.map(({ value }) => value),
          type: 'line',
          itemStyle: {
            color,
          },
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
