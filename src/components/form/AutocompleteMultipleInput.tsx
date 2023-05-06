import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Autocomplete, Checkbox } from '@mui/material';
import { useField } from 'react-final-form';

import TextInput from './TextInput.tsx';

type Props<T> = {
  id: string;
  label: string;
  helperText?: string;
  options: T[];
  getOptionLabel: (value: T) => string;
};

const AutocompleteMultipleInput = <T,>(props: Props<T>) => {
  const { id, label, helperText, options, getOptionLabel } = props;

  const {
    input: { value, ...input },
  } = useField(id, {
    subscription: {
      value: true,
      error: true,
      submitError: true,
      touched: true,
    },
  });

  return (
    <Autocomplete
      multiple
      options={options}
      value={value === '' ? [] : value}
      onChange={(_, o) => input.onChange(o)}
      disableCloseOnSelect
      isOptionEqualToValue={(o, v) => getOptionLabel(o) === getOptionLabel(v)}
      getOptionLabel={(o) => getOptionLabel(o)}
      renderOption={(renderProps, o, { selected }) => (
        <li {...renderProps}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 4 }}
            checked={selected}
          />
          {getOptionLabel(o)}
        </li>
      )}
      renderInput={(inputProps) => (
        <TextInput
          {...inputProps}
          id={id}
          label={label}
          helperText={helperText}
        />
      )}
    />
  );
};

export default AutocompleteMultipleInput;
