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
    <Button
      type="submit"
      variant="secondary"
      loading={submitting}
      fullWidth
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
