import { FC, useCallback, useEffect } from 'react';
import { FredChartWidget, FredChartWidgetFormValue } from '../../types';
import { useForm } from 'antd/es/form/Form';
import { ColorPicker, DatePicker, Form, Input, Modal, Select } from 'antd';
import { DataFrequencyOptions, DATE_FORMAT, LABELS } from '../../consts';
import DebouncedSelect from '../DebounceSelect/DebounceSelect';
import dayjs from 'dayjs';
import type { AggregationColor } from 'antd/es/color-picker/color';
import type { DefaultOptionType } from 'antd/es/select';

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
      realtimeEnd: formValue.realtimeEnd?.format(DATE_FORMAT),
      realtimeStart: formValue.realtimeStart?.format(DATE_FORMAT),
    });
    form.resetFields();
  }, []);

  const handleColorChange = (color: AggregationColor) => {
    form.setFieldValue('chartColor', color.toHexString());
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
        <Form.Item name="seriesLabel" noStyle />
        <Form.Item name="title" label={LABELS.WIDGET_TITLE}>
          <Input />
        </Form.Item>
        <Form.Item name="seriesId" label={LABELS.CHART_SERIES}>
          <DebouncedSelect value={widgetConfig?.seriesId} />
        </Form.Item>
        <Form.Item name="chartColor" label={LABELS.CHART_COLOR}>
          <ColorPicker
            value={widgetConfig?.chartColor}
            showText
            onChange={handleColorChange}
          />
        </Form.Item>
        <Form.Item name="yAxisLabel" label={LABELS.Y_AXIS_LABEL}>
          <Input />
        </Form.Item>
        <Form.Item name="realtimeStart" label={LABELS.REALTIME_START}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="realtimeEnd" label={LABELS.REALTIME_END}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="frequency" label={LABELS.SERIES_FREQUENCY}>
          <Select options={DataFrequencyOptions} />
        </Form.Item>
      </Form>
    </Modal>
  );
};
