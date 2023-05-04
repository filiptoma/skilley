import { Box } from '@mui/material';
import { ComponentProps } from 'react';
import { useFormState } from 'react-final-form';

import Button from 'components/Button.tsx';

type Props = {
  noMargin?: boolean;
} & Omit<ComponentProps<typeof Button>, 'loading'>;

const SubmitButton = (props: Props) => {
  const { noMargin, children, ...rest } = props;

  const { submitting } = useFormState({
    subscription: { submitting: true },
  });

  return (
    <Box pt={noMargin ? 0 : 2}>
      <Button type="submit" loading={submitting} fullWidth {...rest}>
        {children}
      </Button>
    </Box>
  );
};

export default SubmitButton;
