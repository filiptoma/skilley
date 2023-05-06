import { Stack } from '@mui/material';
import { ValidationErrors } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { PropsWithChildren } from 'react';
import { Form as FinalForm, FormRenderProps } from 'react-final-form';
import { z } from 'zod';

import { zodToFinalFormError } from 'utils/index.ts';

type Props<T extends z.ZodSchema> = {
  schema: T;
  initialValues?: Partial<z.input<T>>;
  onSubmit: (values: z.infer<T>) => Promise<ValidationErrors> | Promise<void>;
  render?: (props: FormRenderProps) => React.ReactNode;
} & PropsWithChildren;

const Form = <T extends z.ZodSchema>(props: Props<T>) => {
  const { schema, initialValues = {}, onSubmit, render, children } = props;

  return (
    <FinalForm
      initialValues={initialValues}
      onSubmit={(v) => onSubmit(schema.parse(v))}
      validate={(v) =>
        schema?.safeParseAsync(v).then((r) => {
          if (r.success) return undefined;
          return zodToFinalFormError(r.error);
        })
      }
      subscription={{
        active: true,
        submitting: true,
      }}
      mutators={{
        insert: arrayMutators.insert,
        concat: arrayMutators.concat,
        move: arrayMutators.move,
        pop: arrayMutators.pop,
        push: arrayMutators.push,
        removeBatch: arrayMutators.removeBatch,
        remove: arrayMutators.remove,
        shift: arrayMutators.shift,
        swap: arrayMutators.swap,
        update: arrayMutators.update,
        unshift: arrayMutators.unshift,
        setFieldValue: (args, state, { changeValue }) => {
          const [fieldId, newValue] = args;
          changeValue(state, fieldId, () => newValue);
        },
      }}
      render={
        render ||
        (({ handleSubmit }) => (
          <Stack component="form" onSubmit={handleSubmit} spacing={4}>
            {children}
          </Stack>
        ))
      }
    />
  );
};

export default Form;
