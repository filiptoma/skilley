import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { isEqual } from 'lodash-es';
import { useField } from 'react-final-form';

type Props<T> = {
  id: string;
  label: string;
  options: { key: string; label: string; value: T }[];
  helperText?: string;
};

const SelectInput = <T,>(props: Props<T>) => {
  const { id, label, options, helperText, ...rest } = props;

  const { input, meta } = useField(id, {
    subscription: {
      value: true,
      error: true,
      submitError: true,
      touched: true,
    },
    format: (v) => options.findIndex((o) => isEqual(o.value, v)) ?? '',
    parse: (v) => options[v]?.value ?? '',
  });

  const { error, submitError, touched } = meta;
  const isError = (error || submitError) && touched;

  return (
    <FormControl error={isError} variant="outlined">
      <InputLabel id={`${id}--label`}>{label}</InputLabel>
      <Select
        id={id}
        labelId={`${id}--label`}
        label={label}
        variant="outlined"
        {...input}
        {...rest}
      >
        <MenuItem value="-1" disabled>
          Vyberte možnost
        </MenuItem>
        {options.map((o, i) => (
          <MenuItem key={o.key} value={i}>
            {o.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        {isError ? submitError ?? error : helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectInput;
