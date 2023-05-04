import { DesktopDatePicker as MuiDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { useField } from 'react-final-form';

import TextInput from './TextInput.tsx';

type Props = {
  id: string;
  label: string;
  helperText?: string;
};

const DatePicker = (props: Props) => {
  const { id, label, helperText } = props;

  const {
    input: { value, ...input },
    meta,
  } = useField<Date | undefined, HTMLElement, Dayjs | undefined>(id, {
    subscription: {
      value: true,
      error: true,
      submitError: true,
      touched: true,
    },
    parse: (v) => v?.toDate(),
    format: (v) => (!v ? undefined : dayjs(v)),
  });

  const { error, submitError, touched } = meta;
  const isError = (error || submitError) && touched;

  return (
    <MuiDatePicker
      value={value ?? null}
      renderInput={(inputProps) => (
        <TextInput
          {...inputProps}
          id={id}
          label={label}
          error={isError}
          helperText={isError ? submitError ?? error : helperText}
          onChange={(e) =>
            e.target.value === '' &&
            input.onChange({ target: { value: undefined } })
          }
          autoComplete="off"
        />
      )}
      {...input}
    />
  );
};

export default DatePicker;
