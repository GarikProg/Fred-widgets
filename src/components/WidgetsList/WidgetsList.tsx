import { FC, useCallback, useEffect, useState } from 'react';
import { FredChartWidget } from '../../types';
import { Button, Empty, Flex, Space, Typography } from 'antd';
import WidgetView from '../WidgetView/WidgetView';
import { ConfigWidget } from '../ConfigWidget/ConfigWidget';
import { PlusCircleOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';
import { LABELS } from '../../consts';

import classes from './WidgetsList.module.css';

export const WidgetsList: FC = () => {
  const [list, setList] = useState<FredChartWidget[]>(
    JSON.parse(localStorage.getItem('fred_widgets') || '[]'),
  );

  const [currentWidget, setCurrentWidget] = useState<FredChartWidget>();
  const [configModalOpen, setConfigModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('fred_widgets', JSON.stringify(list));
  }, [list]);

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
      {list.length === 0 ? (
        <Empty
          description={<Typography.Text>{LABELS.NO_WIDGETS}</Typography.Text>}
        >
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={handleAdd}
          >
            {LABELS.ADD}
          </Button>
        </Empty>
      ) : (
        <>
          <Flex gap={16} wrap justify="center">
            {list.map((widget) => (
              <WidgetView
                widget={widget}
                key={widget.id}
                onConfig={onConfig}
                onDelete={handleDelete}
              />
            ))}
          </Flex>
          <div className={classes.AddButton}>
            <Button
              icon={<PlusCircleOutlined />}
              onClick={handleAdd}
              size="large"
              type="primary"
            >
              {LABELS.ADD}
            </Button>
          </div>
        </>
      )}

      <ConfigWidget
        widgetConfig={currentWidget}
        onConfig={handleConfig}
        onCancel={handleCancel}
        open={configModalOpen}
      />
    </>
  );
};
