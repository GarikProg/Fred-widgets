import { FC, useCallback, useState } from 'react';
import { FredChartWidget } from '../../types';
import { Button, Flex } from 'antd';
import WidgetView from '../WidgetView/WidgetView';
import { ConfigWidget } from '../ConfigWidget/ConfigWidget';
import { PlusCircleOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';

const DEFAULT_WIDGET: FredChartWidget = {
  id: 'sdfsdfsd',
  seriesLabel: 'Inflation',
  title: 'Тест',
  seriesId: 'GNPCA',
  realtimeStart: '1776-07-04',
  realtimeEnd: '9999-12-31',
};

export const WidgetsList: FC = () => {
  const [list, setList] = useState<FredChartWidget[]>([DEFAULT_WIDGET]);

  const [currentWidget, setCurrentWidget] = useState<FredChartWidget>();
  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false);

  const handleConfig = (widget: FredChartWidget) => {
    if (widget?.id) {
      setList((prev) =>
        prev.map((item) => (item.id === widget.id ? { ...widget } : item)),
      );
    } else {
      setList((prev) => [...prev, { ...widget, id: widget.id || uuidv4() }]);
    }

    setConfigModalOpen(false);
    setCurrentWidget(undefined);
  };

  const onConfig = (widget: FredChartWidget) => {
    setCurrentWidget({ ...widget });
    setConfigModalOpen(true);
  };

  const handleAdd = useCallback(() => {
    setConfigModalOpen(true);
  }, []);

  const handleCancel = useCallback(() => {
    setConfigModalOpen(false);
    setCurrentWidget(undefined);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return (
    <>
      <Flex gap={16} wrap>
        {list.map((widget) => (
          <WidgetView
            widget={widget}
            key={widget.id}
            onConfig={onConfig}
            onDelete={handleDelete}
          />
        ))}

        <Button icon={<PlusCircleOutlined />} onClick={handleAdd} />
      </Flex>
      <ConfigWidget
        widgetConfig={currentWidget}
        onConfig={handleConfig}
        onCancel={handleCancel}
        open={configModalOpen}
      />
    </>
  );
};
