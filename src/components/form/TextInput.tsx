import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'react-final-form';

type Props = {
  id: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
} & TextFieldProps;

const TextInput = (props: Props) => {
  const { id, label, helperText, disabled, type, ...rest } = props;

  const { input, meta } = useField(id, {
    subscription: {
      value: true,
      error: true,
      submitError: true,
      touched: true,
    },
    parse: (v) => v,
  });

  const { error, submitError, touched } = meta;
  const isError = (error || submitError) && touched;

  return (
    <TextField
      id={id}
      {...input}
      label={label}
      error={isError}
      helperText={isError ? submitError ?? error : helperText}
      disabled={disabled}
      type={type}
      variant="outlined"
      {...rest}
    />
  );
};

export default TextInput;
