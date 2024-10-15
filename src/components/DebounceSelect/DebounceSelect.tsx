import { useState, useCallback, FC, memo } from 'react';
import { Select, SelectProps } from 'antd';
import debounce from 'lodash.debounce';
import { fetchFredSeriesData } from '../../api/fred';
import { LABELS } from '../../consts';

const { Option } = Select;

const DebouncedSelect: FC<SelectProps> = ({ value, onChange }) => {
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOptions = async (searchValue: string) => {
    setIsLoading(true);
    const response = await fetchFredSeriesData(searchValue);

    setOptions(
      response.seriess.map((series) => ({
        label: series.title,
        value: series.id,
      })),
    );

    setIsLoading(false);
  };

  const debouncedFetchOptions = useCallback(debounce(fetchOptions, 1500), []);

  const handleSearch = (searchValue: string) => {
    if (searchValue) {
      debouncedFetchOptions(searchValue);
    } else {
      setOptions([]);
    }
  };

  return (
    <Select
      filterOption={false}
      onSearch={handleSearch}
      placeholder={LABELS.INPUT_SEARCH_SERIES}
      showSearch
      loading={isLoading}
      value={value}
      onChange={onChange}
    >
      {options?.map((option) => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default memo(DebouncedSelect);
