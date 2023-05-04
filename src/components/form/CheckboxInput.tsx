import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import { useField } from 'react-final-form';

type Props = {
  id: string;
  label: string;
  disabled?: boolean;
  helperText?: boolean;
};

const CheckboxInput = (props: Props) => {
  const { id, label, disabled, helperText } = props;

  const { input, meta } = useField(id, {
    subscription: {
      value: true,
      error: true,
      submitError: true,
      touched: true,
    },
    type: 'checkbox',
    parse: (v) => !!v,
  });
  const { error, submitError, touched } = meta;
  const isError = (error || submitError) && touched;

  return (
    <FormControl error={isError} variant="standard">
      <FormControlLabel
        control={<Checkbox id={id} {...input} disabled={disabled} />}
        label={label}
      />
      <FormHelperText>
        {isError ? submitError ?? error : helperText}
      </FormHelperText>
    </FormControl>
  );
};

export default CheckboxInput;
