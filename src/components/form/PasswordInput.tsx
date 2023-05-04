import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from '@mui/material';
import { useState } from 'react';
import { useField } from 'react-final-form';

type Props = {
  id: string;
  label: string;
  helperText?: string;
} & TextFieldProps;

const PasswordInput = (props: Props) => {
  const { id, label, helperText, ...rest } = props;

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

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggle = () => setShowPassword((v) => !v);

  return (
    <TextField
      id={id}
      {...input}
      label={label}
      error={isError}
      helperText={isError ? submitError ?? error : helperText}
      type={showPassword ? 'text' : 'password'}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={toggle}
              onMouseDown={(e) => e.preventDefault()}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...rest}
    />
  );
};

export default PasswordInput;
