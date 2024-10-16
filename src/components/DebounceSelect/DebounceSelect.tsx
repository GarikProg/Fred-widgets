import { useState, useCallback, FC, memo, useEffect } from 'react';
import { Select, SelectProps } from 'antd';
import debounce from 'lodash.debounce';
import { fetchFredSeriesData } from '../../api/fred';
import { LABELS } from '../../consts';

const { Option } = Select;

type Props = SelectProps;

const DebouncedSelect: FC<Props> = ({ value, onChange }) => {
  const [options, setOptions] = useState<SelectProps['options']>();
  const [error, setError] = useState<unknown>();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialValue = async () => {
      if (!options?.length && value) {
        await debouncedFetchOptions(value);
      }
    };

    fetchInitialValue();
  }, [value]);

  const fetchOptions = async (searchValue: string) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetchFredSeriesData(searchValue);
      setOptions(
        response.seriess.map((series) => ({
          label: series.title,
          value: series.id,
        })),
      );
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  const debouncedFetchOptions = useCallback(debounce(fetchOptions, 500), []);

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
      status={error ? 'error' : undefined}
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
