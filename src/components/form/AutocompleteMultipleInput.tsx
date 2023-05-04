import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Autocomplete, Checkbox } from '@mui/material';
import { useField } from 'react-final-form';

import { inputOptionsMapper } from 'utils/index.ts';

import TextInput from './TextInput.tsx';

type Props = {
  id: string;
  label: string;
  helperText?: string;
  data: Record<symbol, string>;
};

const AutocompleteMultipleInput = (props: Props) => {
  const { id, label, helperText, data } = props;

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
      options={inputOptionsMapper(data)}
      value={
        value === ''
          ? []
          : value.map((v: keyof typeof data) => ({
              key: v,
              value: v,
              label: data[v],
            }))
      }
      onChange={(_, options) => input.onChange(options.map((o) => o.value))}
      disableCloseOnSelect
      isOptionEqualToValue={(o, v) => o.value === v.value}
      getOptionLabel={(o) => o.label}
      renderOption={(renderProps, option, { selected }) => (
        <li {...renderProps}>
          <Checkbox
            icon={<CheckBoxOutlineBlank fontSize="small" />}
            checkedIcon={<CheckBox fontSize="small" />}
            style={{ marginRight: 4 }}
            checked={selected}
          />
          {option.label}
        </li>
      )}
      renderInput={(inputProps) => (
        <TextInput
          {...inputProps}
          id={id}
          label={label}
          helperText={helperText}
          onChange={(e) => {
            if (typeof e.target.value === 'string') {
              // eslint-disable-next-line no-useless-return
              return;
            }
          }}
        />
      )}
    />
  );
};

export default AutocompleteMultipleInput;
