import { FC, useCallback, useEffect } from 'react';
import { FredChartWidget, FredChartWidgetFormValue } from '../../types';
import { useForm } from 'antd/es/form/Form';
import { ColorPicker, DatePicker, Form, Input, Modal, Select } from 'antd';
import { DataFrequencyOptions, LABELS } from '../../consts';
import DebouncedSelect from '../DebounceSelect/DebounceSelect';
import dayjs from 'dayjs';
import { AggregationColor } from 'antd/es/color-picker/color';

type Props = {
  widgetConfig?: FredChartWidget;
  open?: boolean;
  onConfig: (widgetConfig: FredChartWidget) => void;
  onCancel: () => void;
};

export const ConfigWidget: FC<Props> = ({
  widgetConfig,
  open,
  onCancel,
  onConfig,
}) => {
  const [form] = useForm<FredChartWidgetFormValue>();

  useEffect(() => {
    if (widgetConfig) {
      form.setFieldsValue({
        ...widgetConfig,
        realtimeEnd: dayjs(widgetConfig.realtimeEnd),
        realtimeStart: dayjs(widgetConfig.realtimeStart),
      });
    } else {
      form.resetFields();
    }
  }, [widgetConfig]);

  const handleSubmit = useCallback(() => {
    const formValue = form.getFieldsValue();
    onConfig({
      ...formValue,
      realtimeEnd: formValue.realtimeEnd?.format('YYYY-MM-DD'),
      realtimeStart: formValue.realtimeStart?.format('YYYY-MM-DD'),
    });
  }, []);

  const handleColorChange = (_: AggregationColor, css: string) => {
    form.setFieldValue('chartColor', css);
  };

  return (
    <Modal
      onCancel={onCancel}
      onOk={handleSubmit}
      open={open}
      title={widgetConfig ? LABELS.EDIT_WIDGET : LABELS.ADD_WIDGET}
    >
      <Form<FredChartWidgetFormValue> form={form}>
        <Form.Item name="id" noStyle />
        <Form.Item name="title" label="Widget title">
          <Input />
        </Form.Item>
        <Form.Item name="seriesId" label="Chart series">
          <DebouncedSelect value={widgetConfig?.seriesId} />
        </Form.Item>
        <Form.Item name="chartColor" label="Chart color">
          <ColorPicker
            value={widgetConfig?.chartColor}
            showText
            onChange={handleColorChange}
          />
        </Form.Item>
        <Form.Item name="yAxisLabel" label="Y axis label">
          <Input />
        </Form.Item>
        <Form.Item name="realtimeStart" label="Real time start">
          <DatePicker />
        </Form.Item>
        <Form.Item name="realtimeEnd" label="Real time end">
          <DatePicker />
        </Form.Item>
        <Form.Item name="frequency" label="Series frequency">
          <Select options={DataFrequencyOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
