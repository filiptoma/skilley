import { TextField, TextFieldProps } from '@mui/material';
import { useField } from 'react-final-form';

type Props = {
  id: string;
  label: string;
  helperText?: string;
  disabled?: boolean;
} & TextFieldProps;

const TextAreaInput = (props: Props) => {
  const { id, label, helperText, disabled, ...rest } = props;

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
      {...rest}
      label={label}
      error={isError}
      helperText={isError ? submitError ?? error : helperText}
      multiline
      maxRows={5}
      disabled={disabled}
      variant="outlined"
    />
  );
};

export default TextAreaInput;
